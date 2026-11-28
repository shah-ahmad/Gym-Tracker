from pydantic import BaseModel, ConfigDict, Field


class ExerciseCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    muscle_group: str = Field(min_length=1, max_length=50)


class ExerciseResponse(BaseModel):
    id: int
    name: str
    muscle_group: str

    model_config = ConfigDict(from_attributes=True)
