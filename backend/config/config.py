from pydantic import BaseSettings

from functools import lru_cache


class Settings(BaseSettings):
    app_name: str = "Images Server"
    database_url: str
    secret_key: str = "super-secret-key"
    algorithm: str = "HS256"

    class Config:
        env_file = ".env"


@lru_cache
def get_settings():
    s = Settings()
    print(s.database_url)
    return s
