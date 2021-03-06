from fastapi import File, UploadFile, Depends, HTTPException
from fastapi import APIRouter
from .schemas import DBImageSchema, UploadImageSchema, DeleteImageResponseSchema
from config.config import get_settings
from typing import List
import imghdr
import json
from pathlib import Path
from database.database import get_db
from .crud import ImageService
import time

images_folder_path = Path.cwd().parent / 'images_folder'

images_router = APIRouter()

settings = get_settings()


@images_router.post("/upload_image/", response_model=UploadImageSchema)
async def upload_image(auto_name: bool = False, file: UploadFile = File(...), db_session=Depends(get_db)):
    file_name = Path(file.filename)
    image_format = imghdr.what(file.file)
    if image_format and image_format in settings.allowed_image_formats:
        image_info = UploadImageSchema(
            image_path=images_folder_path / file_name
        )
        if auto_name:
            image_info.image_path = image_info.image_path.with_name(
                str(time.time())+image_info.image_path.suffix)
            image_info.was_renamed = True
        await ImageService.upload_image(db_session, file, image_info, image_format)
        return image_info
    else:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file Format. Allowed: {json.dumps(settings.allowed_image_formats)}.")


@images_router.get("/get_images_list", response_model=List[DBImageSchema])
async def get_images_list(db_session=Depends(get_db)):
    return ImageService.get_images_list(db_session)


@images_router.get("/delete_image", response_model=DeleteImageResponseSchema)
async def remove_image(image_id: int, db_session=Depends(get_db)):
    image_path = await ImageService.remove_image(db_session, image_id)
    return DeleteImageResponseSchema(image_path=image_path)
