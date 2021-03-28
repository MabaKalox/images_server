from pydantic import BaseModel
from typing import List, Optional
import datetime


class UploadImageModel(BaseModel):
    was_renamed: bool = False
    was_recreated: bool = False
    image_path: Optional[str]


class RemoveImageModel(BaseModel):
    image_path: Optional[str]


class ImageListModel(BaseModel):
    images_path_list: List[str]