# db.py
import motor.motor_asyncio

# MongoDB configuration
MONGO_DETAILS = "mongodb://geogttr:geogttr@localhost:27017"  # Replace with your MongoDB URL

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)
database = client.geogettr  # Use your database name

# Example collection
collection = database.items