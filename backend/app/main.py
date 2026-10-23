from fastapi import FastAPI
from app.database import engine, Base
from app.models import user


app = FastAPI(title="Gym Tracker API")


@app.get("/")
def health_check():
    return {"status": "ok"}

# This line tells SQLAlchemy to create all tables that don't exist yet
Base.metadata.create_all(bind=engine)