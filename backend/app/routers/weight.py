from datetime import date, timedelta

from fastapi import APIRouter, Depends, Query, Response, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.models.weight import WeightLog
from app.schemas.weight import WeightCreate, WeightResponse
from app.utils.dependencies import get_current_user

router = APIRouter(prefix="/api/weight", tags=["Weight"])


@router.post("", response_model=WeightResponse, status_code=status.HTTP_201_CREATED)
def log_weight(
    weight_in: WeightCreate,
    response: Response,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Log the user's weight for a day (no date -> today).

    Only one entry per day: logging again on the same day updates it (200).
    """
    day = weight_in.date or date.today()
    entry = (
        db.query(WeightLog)
        .filter(WeightLog.user_id == current_user.id, WeightLog.date == day)
        .first()
    )
    if entry:
        entry.weight_kg = weight_in.weight_kg
        response.status_code = status.HTTP_200_OK
    else:
        entry = WeightLog(user_id=current_user.id, weight_kg=weight_in.weight_kg, date=day)
        db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry


@router.get("/history", response_model=list[WeightResponse])
def weight_history(
    days: int = Query(default=30, ge=1, le=365),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """The user's weight entries for the last `days` days (newest first)."""
    start = date.today() - timedelta(days=days - 1)
    return (
        db.query(WeightLog)
        .filter(WeightLog.user_id == current_user.id, WeightLog.date >= start)
        .order_by(WeightLog.date.desc())
        .all()
    )
