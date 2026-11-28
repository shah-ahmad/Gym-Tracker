from datetime import date, datetime, timezone

from sqlalchemy import Column, Date, DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from app.database import Base

# Allowed values for Workout.status
STATUS_PLANNED = "planned"
STATUS_COMPLETED = "completed"


def utc_now():
    return datetime.now(timezone.utc)


class Workout(Base):
    """One training session planned or done by a user."""

    __tablename__ = "workouts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(100), nullable=False)
    date = Column(Date, nullable=False, default=date.today, index=True)
    duration = Column(Integer, nullable=True)  # minutes
    status = Column(String(20), nullable=False, default=STATUS_PLANNED, index=True)
    created_at = Column(DateTime(timezone=True), nullable=False, default=utc_now)
    completed_at = Column(DateTime(timezone=True), nullable=True)

    # Deleting a workout also deletes its exercise rows
    exercises = relationship(
        "WorkoutExercise",
        back_populates="workout",
        cascade="all, delete-orphan",
        order_by="WorkoutExercise.id",
    )


class WorkoutExercise(Base):
    """An exercise inside a workout, with sets, reps and weight."""

    __tablename__ = "workout_exercises"

    id = Column(Integer, primary_key=True, index=True)
    workout_id = Column(Integer, ForeignKey("workouts.id", ondelete="CASCADE"), nullable=False, index=True)
    exercise_id = Column(Integer, ForeignKey("exercises.id"), nullable=False, index=True)
    sets = Column(Integer, nullable=False)
    reps = Column(Integer, nullable=False)
    weight = Column(Float, nullable=False, default=0)  # kg, 0 = bodyweight

    workout = relationship("Workout", back_populates="exercises")
    exercise = relationship("Exercise", lazy="joined")
