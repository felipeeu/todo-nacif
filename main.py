from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import uuid

app = FastAPI()


# fake data
todos = [
    {"id": "f8b3e4c0-5d7e-4a1b-8c9d-0e1f2a3b4c5d", "title": "Buy groceries", "description": "Milk, Bread, Eggs", "completed": False},
    {"id": "2a1b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d", "title": "Read a book", "description": "Finish reading '1984'", "completed": False},
    {"id": "d0c1b2a3-e4f5-6a7b-8c9d-0e1f2a3b4c5d", "title": "Workout", "description": "30 minutes of cardio", "completed": True},
]

class Todo(BaseModel):
    id:str 
    title: str
    description: Optional[str] = None
    completed: bool = False

@app.get("/")
async def root():
    return {"message": "Hello, Todo API !"}

@app.get("/todos", response_model=List[Todo])
async def get_todos():
    return todos

@app.get("/todos/{todo_id}", response_model=Todo)
async def get_todo(todo_id: str ):
    todo = next(filter(lambda t: t["id"] == todo_id, todos), None)
    if todo:
        return todo
    raise HTTPException(status_code=404, detail="Todo not found")

@app.post("/todos", response_model=Todo, status_code=201)
async def create_todo(todo: Todo):
    todo.id = str(uuid.uuid4()) 
    todos.append(todo.dict())
    return todo

@app.put("/todos/{todo_id}", response_model=Todo)
async def update_todo(todo_id: str , updated_todo: Todo):
    todo = next(filter(lambda t: t["id"] == todo_id, todos), None)
    if todo:
        idx = todos.index(todo)
        updated = updated_todo.dict()
        updated["id"] = todo_id
        todos[idx] = updated
        return updated
    raise HTTPException(status_code=404, detail="Todo not found")

@app.delete("/todos/{todo_id}", status_code=204)
async def delete_todo(todo_id:str ):
    todo = next(filter(lambda t: t["id"] == todo_id, todos), None)
    if todo:
        todos.remove(todo)
        return
    raise HTTPException(status_code=404, detail="Todo not found")
