import datetime as dt

from pydantic import BaseModel, ConfigDict, Field


class WeightCreate(BaseModel):
    weight_kg: float = Field(gt=0, le=500)
    date: dt.date | None = None  # empty -> today


class WeightResponse(BaseModel):
    id: int
    weight_kg: float
    date: dt.date

    model_config = ConfigDict(from_attributes=True)
