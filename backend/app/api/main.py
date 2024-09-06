from fastapi import APIRouter

from app.api.routes import groups, lectures, login, users, utils, posts, events

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
api_router.include_router(posts.router, prefix="/posts", tags=["posts", "courses"])
api_router.include_router(events.router, prefix="/events", tags=["events"])
api_router.include_router(lectures.router, prefix="/lectures", tags=["lectures"])
api_router.include_router(groups.router, prefix="/groups", tags=["groups"])
