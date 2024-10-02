import asyncio
from pydantic import BaseModel
from fastapi import FastAPI
from bson import ObjectId

from .rabbitmq.consumer import consume_locations_identifier_message, consume_locations_request_message

RABBITMQ_URL = "amqp://guest:guest@localhost/"
QUEUE_NAME = "identify.locations.request"
NEW_QUEUE_NAME = "identify.locations.process"

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(consume_locations_request_message())
    asyncio.create_task(consume_locations_identifier_message())

@app.get("/")
def read_root():
    return {"message": "GEOGTTR - GEO SERVICE"}

@app.get("/identify/locations/{uuid}")
def identifyLocations(uuid: str):
    pass

