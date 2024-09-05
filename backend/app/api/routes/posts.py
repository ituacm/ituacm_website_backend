import uuid
import logging
from typing import Any
from datetime import datetime

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import Post, PostCreate, PostUpdate, PostPublic, PostsPublic, Message

router = APIRouter()


@router.get("/", response_model=PostsPublic)
def read_posts(
    session: SessionDep, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve posts.
    """

    count_statement = select(func.count()).select_from(Post).where(Post.is_visible == True)
    count = session.exec(count_statement).one()
    statement = select(Post).where(Post.is_visible == True).offset(skip).limit(limit)
    posts = session.exec(statement).all()
    

    return PostsPublic(posts=posts, count=count)


@router.get("/{id}", response_model=PostPublic)
def read_post(session: SessionDep, id: int) -> Any:
    """
    Get post by ID.
    """
    post = session.get(Post, id)
    if not post or not post.is_visible:
        raise HTTPException(status_code=404, detail="Post not found")
    return PostPublic(post)


@router.post("/", response_model=Post)
def create_post(
    *, session: SessionDep, current_user: CurrentUser, post_in: PostCreate
) -> Any:
    """
    Create new post.
    """
    post = Post.model_validate(post_in, update={
        "created_by": current_user.id,
        "created_at": datetime.now(),
        "updated_by": current_user.id,
        "last_updated": datetime.now()
    })
    session.add(post)
    session.commit()
    session.refresh(post)
    return post


@router.put("/{id}", response_model=Post)
def update_post(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: int,
    post_in: PostUpdate,
) -> Any:
    """
    Update a post.
    """
    post = session.get(Post, id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    update_dict = post_in.model_dump(exclude_unset=True)
    post.sqlmodel_update(update_dict, update={"updated_by": current_user.id, "last_updated": datetime.now()})
    session.add(post)
    session.commit()
    session.refresh(post)
    return post


@router.delete("/{id}")
def delete_post(
    session: SessionDep, current_user: CurrentUser, id: int
) -> Message:
    """
    Delete a post.
    """
    post = session.get(Post, id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    session.delete(post)
    session.commit()
    logging.info(f"Post {id} deleted by {current_user.email}")
    return Message(message="Post deleted successfully")
