from datetime import date, datetime, timezone

from sqlalchemy import Column, Date, DateTime, ForeignKey, Integer
from app.database import Base


def utc_now():
    return datetime.now(timezone.utc)


class WaterLog(Base):
    __tablename__ = "water_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    amount_ml = Column(Integer, nullable=False)
    date = Column(Date, nullable=False, default=date.today, index=True)
    created_at = Column(DateTime(timezone=True), nullable=False, default=utc_now)