from datetime import date, timedelta

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.models.water import WaterLog
from app.schemas.water import WaterCreate, WaterDayTotal, WaterResponse, WaterToday
from app.utils.dependencies import get_current_user

router = APIRouter(prefix="/api/water", tags=["Water"])


@router.post("", response_model=WaterResponse, status_code=status.HTTP_201_CREATED)
def add_water(
    water_in: WaterCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Log an amount of water (ml) for the logged-in user."""
    data = water_in.model_dump(exclude_none=True)  # no date sent -> today
    entry = WaterLog(**data, user_id=current_user.id)
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry


@router.get("/today", response_model=WaterToday)
def water_today(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Today's entries and total for the logged-in user."""
    today = date.today()
    entries = (
        db.query(WaterLog)
        .filter(WaterLog.user_id == current_user.id, WaterLog.date == today)
        .order_by(WaterLog.created_at)
        .all()
    )
    return WaterToday(
        date=today,
        total_ml=sum(e.amount_ml for e in entries),
        entries=[WaterResponse.model_validate(e) for e in entries],
    )


@router.get("/history", response_model=list[WaterDayTotal])
def water_history(
    days: int = Query(default=7, ge=1, le=90),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Total water per day for the last `days` days (newest first)."""
    start = date.today() - timedelta(days=days - 1)
    rows = (
        db.query(WaterLog.date, func.sum(WaterLog.amount_ml).label("total_ml"))
        .filter(WaterLog.user_id == current_user.id, WaterLog.date >= start)
        .group_by(WaterLog.date)
        .order_by(WaterLog.date.desc())
        .all()
    )
    return [WaterDayTotal(date=r.date, total_ml=r.total_ml) for r in rows]
