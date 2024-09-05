import uuid

from datetime import datetime
from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel


# Shared properties
class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    is_superuser: bool = False
    full_name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40)


class UserRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=40)
    full_name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on update, all are optional
class UserUpdate(UserBase):
    email: EmailStr | None = Field(default=None, max_length=255)  # type: ignore
    password: str | None = Field(default=None, min_length=8, max_length=40)


class UserUpdateMe(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)


class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)


# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str


# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: uuid.UUID


class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int


class PostBase(SQLModel):
    title: str
    description: str | None = Field(default=None)
    content: str | None = Field(default=None)
    image: str | None = Field(default=None)
    is_visible: bool | None = Field(default=True)

class PostCreate(PostBase):
    pass

class PostUpdate(PostBase):
    pass

class PostPublic(PostBase):
    id: int

class PostsPublic(SQLModel):
    posts: list[PostPublic]
    count: int

class Post(PostBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    created_at: datetime
    created_by: uuid.UUID = Field(foreign_key="user.id", nullable=True, ondelete="SET NULL")
    last_updated: datetime = Field(default_factory=datetime.now)
    updated_by: uuid.UUID = Field(foreign_key="user.id", nullable=True)

class EventBase(PostBase):
    start: datetime
    end: datetime
    location: str


class EventCreate(EventBase):
    pass

class EventUpdate(EventBase):
    pass

class Event(EventBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.now)
    created_by: uuid.UUID = Field(foreign_key="user.id", nullable=True, ondelete="SET NULL")
    last_updated: datetime = Field(default_factory=datetime.now)
    updated_by: uuid.UUID = Field(foreign_key="user.id", nullable=True)

class EventPublic(EventBase):
    id: int

class EventsPublic(SQLModel):
    events: list[EventPublic]
    count: int


# Generic message
class Message(SQLModel):
    message: str


# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenPayload(SQLModel):
    sub: str | None = None


class NewPassword(SQLModel):
    token: str
    new_password: str = Field(min_length=8, max_length=40)
