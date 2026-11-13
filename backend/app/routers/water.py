from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.models.water import WaterLog
from app.schemas.water import WaterCreate, WaterResponse
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