import uuid
import logging
from typing import Any
from datetime import datetime

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select, column

from app.api.deps import CurrentUser, CurrentUserOptional, SessionDep
from app.models import Group, LectureCreate, LectureUpdate, Lectures, LecturesCreate, Post, Lecture, LecturePublic, LecturesPublic, Message

router = APIRouter() 


@router.get("/", response_model=LecturesPublic)
def read_lectures(
    session: SessionDep, currentUser: CurrentUserOptional, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve lectures.
    """

    count_statement = select(func.count()).select_from(Lecture)
    statement = select(Lecture)
    if currentUser == None:
        count_statement = count_statement.where(Lecture.is_visible == True)
        statement = statement.where(Lecture.is_visible == True)

    statement = statement.offset(skip).limit(limit)
    count = session.exec(count_statement).one()
    lectures = session.exec(statement).all()
    
    return LecturesPublic(lectures=lectures, count=count)


@router.get("/{id}", response_model=LecturePublic)
def read_lecture(session: SessionDep, currentUser: CurrentUserOptional, id:int) -> Any:
    """
    Get lecture by ID.
    """
    lecture = session.get(Lecture, id)
    if not lecture or (currentUser == None and not lecture.is_visible):
        raise HTTPException(status_code=404, detail="Lecture not found")
    return lecture


@router.post("/multiple/", response_model=Lectures)
def create_lectures(
    *, session: SessionDep, current_user: CurrentUser, lectures_in: LecturesCreate
) -> Any:
    """
    Creates new lectures with a post.
    """
    
    # Get the course group (automatically saves as course)
    group_id = session.exec(select(column('id')).select_from(Group).where(Group.name == 'Course')).one()
    # Create the post
    post = Post.model_validate(lectures_in.post, update={
        "group_id": group_id,
        "created_by": current_user.id,
        "created_at": datetime.now(),
        "updated_by": current_user.id,
        "last_updated": datetime.now()
    })
    for lecture_in in lectures_in.lectures:
        lecture_in = Lecture.model_validate(lecture_in, update={
            "post": post,
            "created_by": current_user.id,
            "created_at": datetime.now(),
            "updated_by": current_user.id,
            "last_updated": datetime.now()
        })
        session.add(lecture_in)
    session.commit()
    session.refresh(post)
    statement = select(Lecture).where(Lecture.post_id == post.id)
    lectures = session.exec(statement).all()
    
    return Lectures(
        lectures=lectures,
        post=post
    )

@router.post("/", response_model=Lecture)
def create_lecture(
    *, session: SessionDep, current_user: CurrentUser, lecture_in: LectureCreate
) -> Any:
    """
    Creates a single lecture
    """
    lecture = Lecture.model_validate(lecture_in, update={
        "created_by": current_user.id,
        "created_at": datetime.now(),
        "updated_by": current_user.id,
        "last_updated": datetime.now()
    })
    
    session.add(lecture)
    session.commit()
    session.refresh(lecture)
    
    return lecture


@router.put("/{id}", response_model=Lecture)
def update_lecture(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: int,
    lecture_in: LectureUpdate,
) -> Any:
    """
    Update a lecture.
    """
    lecture = session.get(Lecture, id)
    if not lecture:
        raise HTTPException(status_code=404, detail="Lecture not found")
    update_dict = lecture_in.model_dump(exclude_unset=True)
    lecture.sqlmodel_update(update_dict, update={"updated_by": current_user.id, "last_updated": datetime.now()})
    session.add(lecture)
    session.commit()
    session.refresh(lecture)
    return lecture


@router.delete("/{id}")
def delete_lecture(
    session: SessionDep, current_user: CurrentUser, id: int
) -> Message:
    """
    Delete a lecture.
    """
    lecture = session.get(Lecture, id)
    if not lecture:
        raise HTTPException(status_code=404, detail="Lecture not found")
    session.delete(lecture)
    session.commit()
    logging.info(f"Lecture {id} deleted by {current_user.email}")
    return Message(message="Lecture deleted successfully")
