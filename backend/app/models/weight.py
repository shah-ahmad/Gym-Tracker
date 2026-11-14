from datetime import date

from sqlalchemy import Column, Date, Float, ForeignKey, Integer, UniqueConstraint
from app.database import Base


class WeightLog(Base):
    __tablename__ = "weight_logs"
    # one weight entry per user per day
    __table_args__ = (UniqueConstraint("user_id", "date", name="uq_weight_user_date"),)

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    weight_kg = Column(Float, nullable=False)
    date = Column(Date, nullable=False, default=date.today)
