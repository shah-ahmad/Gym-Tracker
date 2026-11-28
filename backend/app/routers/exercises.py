from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.exercise import Exercise
from app.models.user import User
from app.schemas.exercise import ExerciseCreate, ExerciseResponse
from app.utils.dependencies import get_current_user

router = APIRouter(prefix="/api/exercises", tags=["Exercises"])


@router.get("", response_model=list[ExerciseResponse])
def list_exercises(
    muscle_group: str | None = Query(default=None, description="e.g. chest, back, legs"),
    search: str | None = Query(default=None, description="part of the exercise name"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """All exercises in the library, optionally filtered."""
    query = db.query(Exercise)
    if muscle_group:
        query = query.filter(func.lower(Exercise.muscle_group) == muscle_group.strip().lower())
    if search:
        query = query.filter(Exercise.name.ilike(f"%{search.strip()}%"))
    return query.order_by(Exercise.muscle_group, Exercise.name).all()


@router.post("", response_model=ExerciseResponse, status_code=status.HTTP_201_CREATED)
def create_exercise(
    exercise_in: ExerciseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Add a new exercise to the shared library."""
    name = exercise_in.name.strip()
    duplicate = db.query(Exercise).filter(func.lower(Exercise.name) == name.lower()).first()
    if duplicate:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Exercise already exists")

    exercise = Exercise(name=name, muscle_group=exercise_in.muscle_group.strip().lower())
    db.add(exercise)
    db.commit()
    db.refresh(exercise)
    return exercise
