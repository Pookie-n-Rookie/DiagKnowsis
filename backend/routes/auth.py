from fastapi import APIRouter, HTTPException, status, Depends
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from pydantic import BaseModel
from db.database import db_dependency
from db.models import User
from typing import Annotated
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

AUTH_SECRET = os.getenv("AUTH_SECRET") or "change-me-in-production"
ALGORITHM = "HS256"

bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
oauth2_bearer = OAuth2PasswordBearer(tokenUrl='api/auth/login')

class CreateUserRequest(BaseModel):
    username: str
    password: str
    
class Token(BaseModel):
    access_token: str
    token_type: str

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(db: db_dependency, create_user_request: CreateUserRequest):
    existing_user = db.query(User).filter(User.username == create_user_request.username).first()
    if(existing_user):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already taken")
    hashed_password = bcrypt_context.hash(create_user_request.password)
    create_user_model = User(username = create_user_request.username, password = hashed_password)
    
    db.add(create_user_model)
    db.commit()
    
@router.post("/login", response_model=Token, status_code=status.HTTP_200_OK)
async def login(login_request: LoginRequest, db: db_dependency):
    user = db.query(User).filter(User.username == login_request.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Username not found")
    if not bcrypt_context.verify(login_request.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect password")
    
    token = create_access_token(user.username, user.id, timedelta(minutes=20))
    
    return {'access_token': token, 'token_type': 'bearer'}

@router.get("/getUser/{token}", status_code=status.HTTP_200_OK)
async def get_user(token: str):
    user = await get_current_user(token)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
    return {"user": user}

async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
    try:
        payload = jwt.decode(token, AUTH_SECRET, algorithms=[ALGORITHM])
        username: str = payload.get('sub')
        user_id: int = payload.get('id')
        if username is None or user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not validate user')
        return {'username': username, 'id': user_id}
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate user")

def create_access_token(username: str, user_id: int, expires_delta: timedelta):
    encode = {'sub': username, 'id': user_id}
    expires = datetime.utcnow() + expires_delta
    encode.update({'exp': expires})
    return jwt.encode(encode, AUTH_SECRET, algorithm=ALGORITHM)
    