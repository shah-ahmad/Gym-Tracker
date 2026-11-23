from sqlalchemy.orm import Session

from app.models.exercise import Exercise

# Small starter library: (name, muscle_group)
DEFAULT_EXERCISES = [
    ("Bench Press", "chest"),
    ("Incline Dumbbell Press", "chest"),
    ("Push-Up", "chest"),
    ("Pull-Up", "back"),
    ("Barbell Row", "back"),
    ("Lat Pulldown", "back"),
    ("Deadlift", "back"),
    ("Squat", "legs"),
    ("Leg Press", "legs"),
    ("Lunge", "legs"),
    ("Romanian Deadlift", "legs"),
    ("Calf Raise", "legs"),
    ("Overhead Press", "shoulders"),
    ("Lateral Raise", "shoulders"),
    ("Bicep Curl", "arms"),
    ("Hammer Curl", "arms"),
    ("Tricep Pushdown", "arms"),
    ("Dips", "arms"),
    ("Plank", "core"),
    ("Crunch", "core"),
    ("Running", "cardio"),
    ("Cycling", "cardio"),
]


def seed_exercises(db: Session) -> int:
    """Insert the default exercises that are missing. Returns how many were added."""
    existing = {name for (name,) in db.query(Exercise.name).all()}
    new_rows = [
        Exercise(name=name, muscle_group=group)
        for name, group in DEFAULT_EXERCISES
        if name not in existing
    ]
    db.add_all(new_rows)
    db.commit()
    return len(new_rows)
