import datetime as dt

from pydantic import BaseModel, ConfigDict


class GymSessionResponse(BaseModel):
    id: int
    user_id: int
    check_in: dt.datetime
    check_out: dt.datetime | None
    duration: int | None  # minutes, null while still checked in

    model_config = ConfigDict(from_attributes=True)


class GymWeeklyStats(BaseModel):
    week_start: dt.date
    sessions: int
    total_minutes: int
