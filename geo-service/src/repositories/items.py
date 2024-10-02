from bson import ObjectId

from ..config.db import collection
from ..models.models import Item

async def create_item(item: Item) -> dict:
    new_item = await collection.insert_one(item.dict())
    created_item = await collection.find_one({"_id": new_item.inserted_id})
    return created_item

async def retrieve_items():
    items = []
    async for item in collection.find():
        items.append(item)
    return items

async def retrieve_item(id: str) -> dict:
    item = await collection.find_one({"_id": ObjectId(id)})
    if item:
        return item

async def update_item(id: str, data: dict):
    if len(data) < 1:
        return False

    item = await collection.find_one({"_id": ObjectId(id)})
    if item:
        updated_item = await collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        if updated_item:
            return True
    return False