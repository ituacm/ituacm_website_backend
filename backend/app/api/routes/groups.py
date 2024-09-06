from typing import Any

from fastapi import APIRouter, HTTPException

from app.constants import Group



router = APIRouter()


@router.get("/", response_model=Group)
def read_posts() -> Any:
    """
    Retrieve groups.
    """

    return {group.value: group.name for group in Group}

