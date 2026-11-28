import datetime as dt
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.exercise import ExerciseResponse

WorkoutStatus = Literal["planned", "completed"]


# ---------- Workout exercises (sets / reps / weight) ----------

class WorkoutExerciseCreate(BaseModel):
    exercise_id: int
    sets: int = Field(gt=0, le=100)
    reps: int = Field(gt=0, le=1000)
    weight: float = Field(default=0, ge=0, le=1000)  # kg, 0 = bodyweight


class WorkoutExerciseUpdate(BaseModel):
    sets: int | None = Field(default=None, gt=0, le=100)
    reps: int | None = Field(default=None, gt=0, le=1000)
    weight: float | None = Field(default=None, ge=0, le=1000)


class WorkoutExerciseResponse(BaseModel):
    id: int
    workout_id: int
    exercise_id: int
    sets: int
    reps: int
    weight: float
    exercise: ExerciseResponse

    model_config = ConfigDict(from_attributes=True)


# ---------- Workouts ----------

class WorkoutCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    date: dt.date | None = None  # empty -> today
    duration: int | None = Field(default=None, ge=0, le=1440)  # minutes
    exercises: list[WorkoutExerciseCreate] = []  # optional, can be added later


class WorkoutUpdate(BaseModel):
    """Every field is optional: only the fields sent are changed."""

    name: str | None = Field(default=None, min_length=1, max_length=100)
    date: dt.date | None = None
    duration: int | None = Field(default=None, ge=0, le=1440)
    status: WorkoutStatus | None = None


class WorkoutComplete(BaseModel):
    duration: int | None = Field(default=None, ge=0, le=1440)  # minutes


class WorkoutResponse(BaseModel):
    id: int
    user_id: int
    name: str
    date: dt.date
    duration: int | None
    status: WorkoutStatus
    created_at: dt.datetime
    completed_at: dt.datetime | None
    exercises: list[WorkoutExerciseResponse]

    model_config = ConfigDict(from_attributes=True)


class WorkoutSummary(BaseModel):
    """Short version for lists and history (no exercise details)."""

    id: int
    name: str
    date: dt.date
    duration: int | None
    status: WorkoutStatus
    exercise_count: int
    total_volume: float  # sum of sets * reps * weight (kg)
