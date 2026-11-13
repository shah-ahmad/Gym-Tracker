import datetime as dt

from pydantic import BaseModel, ConfigDict, Field


class WaterCreate(BaseModel):
    amount_ml: int = Field(gt=0, le=5000)
    date: dt.date | None = None  # empty -> today


class WaterResponse(BaseModel):
    id: int
    amount_ml: int
    date: dt.date
    created_at: dt.datetime

    model_config = ConfigDict(from_attributes=True)