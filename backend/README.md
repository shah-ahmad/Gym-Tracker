# Gym Tracker – Backend (FastAPI)

Backend API for Gym Tracker: user registration, login with JWT, and profile.

## Tech stack
- Python <version>, FastAPI, SQLAlchemy, PostgreSQL
- Password hashing: <library>
- Auth: JWT (<algorithm>)

## Requirements
- Python 3.12+
- PostgreSQL running locally, with a database called `<name>`

## Setup
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env      # then edit .env with your own values
```

## Run
```powershell
uvicorn app.main:app --reload
```
Open <URL of Swagger>.
Tables are created automatically on first start.

## Environment variables (`backend/.env`)
| Variable | Example | Meaning |
|---|---|---|
| DATABASE_URL | postgresql+psycopg2://postgres:YOUR_PASSWORD@localhost:5432/gymtracker | <what is it?> |
| SECRET_KEY | <how to generate one?> | <what is it used for?> |
| ALGORITHM | HS256 | <...> |
| ACCESS_TOKEN_EXPIRE_MINUTES | 60 | <...> |

⚠️ Never commit `.env`. Only `.env.example` (with fake values) is in Git.

## Authentication endpoints
| Method | Path | Auth | Body | Success | Errors |
|---|---|---|---|---|---|
| POST | /api/auth/register | – | email, password, first_name, last_name | 201 + user (no password) | 400 email taken, 422 invalid input |
| POST | /api/auth/login | – | <...> | <...> | <...> |
| GET | /api/users/me | Bearer token | – | <...> | <...> |
| PUT | /api/users/me | Bearer token | <...> | <...> | <...> |

## Using the token
1. <how do you get a token?>
2. <how do you use it in Swagger?>
3. From the frontend: send the header `Authorization: Bearer <token>`.

## For other backend developers
To protect a route, add the dependency:
```python
from app.utils.dependencies import get_current_user
current_user: User = Depends(get_current_user)
```