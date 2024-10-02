import datetime
import json
import aio_pika
from pydantic import BaseModel
from ..ner.identifier import identify_locations
from ..repositories.items import create_item, retrieve_item, update_item

class IdentifyLocationMessage(BaseModel):
    messageUUID: str
    title: str
    body: str
    status: str

async def consume_locations_request_message():
    RABBITMQ_URL = "amqp://guest:guest@localhost/"
    QUEUE_NAME = "identify.locations.request"
    NEW_QUEUE_NAME = "identify.locations.process"
    connection = await aio_pika.connect_robust(RABBITMQ_URL)
    channel = await connection.channel() 
    queue = await channel.declare_queue(QUEUE_NAME, durable=True)

    async def on_message(message: aio_pika.IncomingMessage):
        async with message.process():
            message_body = message.body.decode()
            data = json.loads(message_body)
            message_to_process = IdentifyLocationMessage(
                messageUUID = data.get('messageUUID'),
                title = data.get('title'),
                body = data.get('body'),
                status = "PROCESSING"
            )

            try:
                db_post = await create_item(message_to_process)

                print(f"[{datetime.datetime.now()}] Received new post to process: {db_post}")

                await channel.default_exchange.publish(
                    aio_pika.Message(body=json.dumps({ "id": str(db_post.get("_id")) }).encode()),
                    routing_key=NEW_QUEUE_NAME
                )

            except Exception as e:
                print(f"An error occurred: {str(e)}")
            finally:
                pass

    await queue.consume(on_message)
    print(f"Listening for messages in queue '{QUEUE_NAME}'...")

async def consume_locations_identifier_message():
    RABBITMQ_URL = "amqp://guest:guest@localhost/"
    NEW_QUEUE_NAME = "identify.locations.process"
    connection = await aio_pika.connect_robust(RABBITMQ_URL)
    channel = await connection.channel()

    queue = await channel.declare_queue(NEW_QUEUE_NAME, durable=True)

    async def on_message(message: aio_pika.IncomingMessage):
        async with message.process():
            message_body = message.body.decode()
            data = json.loads(message_body)

            try:
                print(data)
                id = data.get('id')
                db_post = await retrieve_item(id)
                
                cities = identify_locations(db_post.get("body"))

                db_post["result"] = cities

                db_post = await update_item(id, db_post)

                print(f"[{datetime.datetime.now()}] Finished processing the post of id: {db_post}")

            except Exception as e:
                print(f"An error occurred: {str(e)}")
            finally:
                pass

    await queue.consume(on_message)
    print(f"Listening for messages in queue '{NEW_QUEUE_NAME}'...")