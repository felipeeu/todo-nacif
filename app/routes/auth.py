from fastapi import APIRouter, Depends
from app.auth import authenticate

router = APIRouter()

@router.get("/")
async def root(user: str = Depends(authenticate)):
    return {"message": f"Hello, {user}! Bem-vindo à Todo API autenticada."}