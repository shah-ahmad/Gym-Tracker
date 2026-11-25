from datetime import date, datetime, timezone

from sqlalchemy import Column, Date, DateTime, ForeignKey, Integer, String
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
