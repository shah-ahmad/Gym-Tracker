from pydantic import BaseModel, EmailStr
from datetime import datetime

# Schema for incoming registration requests
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str

# Schema for outgoing responses (no password included!)
class UserResponse(BaseModel):
    id: int
    email: EmailStr
    first_name: str
    last_name: str
    created_at: datetime

    class Config:
        from_attributes = True