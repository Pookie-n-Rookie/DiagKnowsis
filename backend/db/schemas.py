from pydantic import BaseModel

class UserBase(BaseModel):
    id: int
    username: str
    password: str