import amqp from 'amqplib'
import { IdentifyLocationsServiceMessage } from '../domain/schemas/request'

const QUEUE_NAME = 'identify.locations.request'

export async function sendMessage(message: IdentifyLocationsServiceMessage) {
    try {
        const connection = await amqp.connect("amqp://guest:guest@rabbitmq/")
        const channel = await connection.createChannel()

        await channel.assertQueue(QUEUE_NAME, {
            durable: true
        });

        channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)), {
            persistent: true
        })

        console.log(`Sent: ${JSON.stringify(message)}`)

        setTimeout(() => {
            channel.close()
            connection.close()
        }, 500);
        return message
    } catch (error) {
        console.error('Error sending message:', error)
        throw new Error(`Error sending message: ${error}`)
        
    }
}