import logging
from typing import Any
from datetime import datetime

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select, update

from app.api.deps import CurrentUser, CurrentUserOptional, SessionDep
from app.models import Group, GroupBase, GroupPublic, GroupsPublic, Message


router = APIRouter()


@router.get("/", response_model=GroupsPublic)
def read_groups(
    session: SessionDep, currentUser: CurrentUserOptional
) -> Any:
    """
    Retrieve groups.
    """
    
    count_statement = select(func.count()).select_from(Group)
    statement = select(Group)
    count = session.exec(count_statement).one()
    groups = session.exec(statement).all()
    
    return GroupsPublic(groups=groups, count=count)


@router.get("/{id}", response_model=GroupPublic)
def read_group(session: SessionDep, currentUser: CurrentUserOptional, id:int) -> Any:
    """
    Get group by ID.
    """
    group = session.get(Group, id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    return group


@router.post("/", response_model=Group)
def create_group(
    *, session: SessionDep, current_user: CurrentUser, group_in: GroupBase
) -> Any:
    """
    Create new group.
    """
    group = Group.model_validate(group_in)
    session.add(group)
    session.commit()
    session.refresh(group)
    return group


@router.put("/{id}", response_model=Group)
def update_group(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: int,
    group_in: GroupBase,
) -> Any:
    """
    Update a group.
    """
    group = session.get(Group, id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    update_dict = group_in.model_dump(exclude_unset=True)
    group.sqlmodel_update(update_dict)

        
    session.add(group)
    session.commit()
    session.refresh(group)
    return group


@router.delete("/{id}")
def delete_group(
    session: SessionDep, current_user: CurrentUser, id: int
) -> Message:
    """
    Delete a group.
    """
    group = session.get(Group, id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    session.delete(group)
    session.commit()
    logging.info(f"Group {id} deleted by {current_user.email}")
    return Message(message="Group deleted successfully")
