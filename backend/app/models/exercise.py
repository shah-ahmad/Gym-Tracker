from sqlalchemy import Column, Integer, String
from app.database import Base


class Exercise(Base):
    """A movement from the shared exercise library (e.g. Bench Press)."""

    __tablename__ = "exercises"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True, nullable=False)
    muscle_group = Column(String(50), index=True, nullable=False)
