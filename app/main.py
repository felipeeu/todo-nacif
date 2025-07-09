from fastapi import FastAPI
from app.routes import todos, auth

app = FastAPI()

app.include_router(auth.router)
app.include_router(todos.router)