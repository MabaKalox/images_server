from pydantic import BaseSettings, validator
from typing import List, Union

from functools import lru_cache


class Settings(BaseSettings):
    app_name: str = "Images Server"
    database_url: str
    secret_key: str = "super-secret-key"
    algorithm: str = "HS256"
    allowed_image_formats: Union[str, List[str]] = ['png', 'jpeg']

    @validator('allowed_image_formats', pre=True)
    def assemble_allowed_image_formats(cls, val):
        if isinstance(val, str):
            return [item.strip() for item in val.split(",")]
        return val

    class Config:
        env_file = ".env"


@lru_cache
def get_settings():
    s = Settings()
    return s
