from pydantic import BaseModel
from typing import List, Optional
import datetime
from pathlib import Path


class BaseImageSchema(BaseModel):
    image_path: Path
    image_timestamp: Optional[datetime.datetime]


class DBImageSchema(BaseImageSchema):
    image_id: int

    class Config:
        orm_mode = True


class UploadImageSchema(BaseImageSchema):
    was_renamed: bool = False
    was_recreated: bool = False


class DeleteImageResponseSchema(BaseModel):
    image_path: Path
    was_deleted: bool = True
