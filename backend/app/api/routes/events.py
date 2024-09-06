import uuid
import logging
from typing import Any
from datetime import datetime

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import Event, EventCreate, EventUpdate, EventPublic, EventsPublic, Message

router = APIRouter()


@router.get("/", response_model=EventsPublic)
def read_events(
    session: SessionDep, currentUser: CurrentUser | None, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve events.
    """

    count_statement = select(func.count()).select_from(Event)
    statement = select(Event)
    if currentUser == None:
        count_statement = count_statement.where(Event.is_visible == True)
        statement = statement.where(Event.is_visible == True)
    
    statement = statement.offset(skip).limit(limit)
    count = session.exec(count_statement).one()
    events = session.exec(statement).all()
    

    return EventsPublic(events=events, count=count)


@router.get("/{id}", response_model=EventPublic)
def read_event(session: SessionDep, currentUser: CurrentUser | None, id: int) -> Any:
    """
    Get event by ID.
    """
    event = session.get(Event, id)
    if not event or (currentUser == None and not event.post.is_visible):
        raise HTTPException(status_code=404, detail="Event not found")
    return EventPublic(event)


@router.post("/", response_model=Event)
def create_event(
    *, session: SessionDep, current_user: CurrentUser, event: EventCreate
) -> Any:
    """
    Create new event.
    """
    event = Event.model_validate(event, update={
        "created_by": current_user.id,
        "created_at": datetime.now(),
        "updated_by": current_user.id,
        "last_updated": datetime.now()
    })
    
    session.add(event)
    session.commit()
    session.refresh(event)
    return event


@router.put("/{id}", response_model=Event)
def update_event(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: int,
    event_in: EventUpdate,
) -> Any:
    """
    Update an event.
    """
    event = session.get(Event, id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    update_dict = event_in.model_dump(exclude_unset=True)
    event.sqlmodel_update(update_dict, update={"updated_by": current_user.id, "last_updated": datetime.now()})
    session.add(event)
    session.commit()
    session.refresh(event)
    return event


@router.delete("/{id}")
def delete_event(
    session: SessionDep, current_user: CurrentUser, id: int
) -> Message:
    """
    Delete an event.
    """
    event = session.get(Event, id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    session.delete(event)
    session.commit()
    logging.info(f"Event {id} deleted by {current_user.email}")
    return Message(message="Event deleted successfully")
