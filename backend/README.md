# Gym Tracker – Backend (FastAPI)

Backend API for Gym Tracker: user registration, login with JWT, and profile.

## Tech stack
- Python 3.12, FastAPI, SQLAlchemy, PostgreSQL
- Password hashing: passlib with bcrypt
- Auth: JWT (HS256)

## Requirements
- Python 3.12+
- PostgreSQL running locally, with a database called `gymtracker`

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
Open http://127.0.0.1:8000/docs (Swagger UI).
Tables are created automatically on first start.

## Environment variables (`backend/.env`)
| Variable | Example | Meaning |
|---|---|---|
| DATABASE_URL | postgresql+psycopg2://postgres:YOUR_PASSWORD@localhost:5432/gymtracker | How to connect to PostgreSQL: user, password, host, port, database |
| SECRET_KEY | output of `python -c "import secrets; print(secrets.token_hex(32))"` | Signs the JWT tokens. Keep it secret; anyone with it can forge tokens |
| ALGORITHM | HS256 | Algorithm used to sign the tokens |
| ACCESS_TOKEN_EXPIRE_MINUTES | 60 | How long a login token stays valid |

⚠️ Never commit `.env`. Only `.env.example` (with fake values) is in Git.

## Authentication endpoints
| Method | Path | Auth | Body | Success | Errors |
|---|---|---|---|---|---|
| POST | /api/auth/register | – | email, password, first_name, last_name | 201 + user (no password) | 400 email taken, 422 invalid input |
| POST | /api/auth/login | – | email, password | 200 + `access_token` | 401 wrong email or password, 422 invalid input |
| GET | /api/users/me | Bearer token | – | 200 + your profile | 401/403 missing, invalid or expired token |
| PUT | /api/users/me | Bearer token | first_name and/or last_name (both optional) | 200 + updated profile | 401/403 no valid token, 422 empty name |

## Using the token
1. Call `POST /api/auth/login` and copy `access_token` from the response.
2. In Swagger, click **Authorize** 🔓, paste the token, click Authorize. Locked 🔒 endpoints now work.
3. From the frontend: send the header `Authorization: Bearer <token>`.

## For other backend developers
To protect a route, add the dependency:
```python
from app.utils.dependencies import get_current_user
current_user: User = Depends(get_current_user)
```