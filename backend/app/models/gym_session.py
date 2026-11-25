from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, ForeignKey, Integer
from app.database import Base


def utc_now():
    return datetime.now(timezone.utc)


class GymSession(Base):
    """One visit to the gym: check-in, check-out and total minutes."""

    __tablename__ = "gym_sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    check_in = Column(DateTime(timezone=True), nullable=False, default=utc_now, index=True)
    check_out = Column(DateTime(timezone=True), nullable=True)  # empty = still at the gym
    duration = Column(Integer, nullable=True)  # minutes, set on check-out
