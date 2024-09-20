import logging
from typing import Any
from datetime import datetime

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select, update

from app.api.deps import CurrentUser, CurrentUserOptional, SessionDep
from app.models import Lecture, Post, PostCreate, PostUpdate, PostPublic, PostsPublic, Message


router = APIRouter()


@router.get("/", response_model=PostsPublic)
def read_posts(
    session: SessionDep, currentUser: CurrentUserOptional, group: int = 2, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve posts.
    """
    print(group, type(group))
    count_statement = select(func.count()).select_from(Post).where(Post.group_id == group)
    statement = select(Post).where(Post.group_id == group)
        
    if currentUser == None:
        # If public
        count_statement = count_statement.where(Post.is_visible == True)
        statement = statement.where(Post.is_visible == True)
        
    statement = statement.offset(skip).limit(limit)
    count = session.exec(count_statement).one()
    posts = session.exec(statement).all()
    

    return PostsPublic(posts=posts, count=count)


@router.get("/{id}", response_model=PostPublic)
def read_post(session: SessionDep, currentUser: CurrentUserOptional, id:int) -> Any:
    """
    Get post by ID.
    """
    post = session.get(Post, id)
    if not post or (currentUser == None and not post.is_visible):
        raise HTTPException(status_code=404, detail="Post not found")
    return post


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
    
    assert not (post.lectures and update_dict.get('group_id', None) == 1), "You can not convert to 'Post' type if the entry contains lectures"
    post.sqlmodel_update(update_dict, update={"updated_by": current_user.id, "last_updated": datetime.now()})
    
    if post.group.name == 'Course':
        # Change visibility of all lectures of this post
        update(Lecture).where(Lecture.post_id == post.id).values(
            is_visible=post.is_visible,
            updated_by=current_user.id,
            last_updated=datetime.now()
        )
        
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
