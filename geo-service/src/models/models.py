from pydantic import BaseModel

class Item(BaseModel):
    identifier: str
    title: str
    body: str
    status: str

class ItemResults(BaseModel):
    cities: str

class UpdateItem(BaseModel):
    name: str | None = None
    description: str | None = None
