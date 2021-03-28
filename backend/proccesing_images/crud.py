from sqlalchemy.orm import Session
from fastapi import HTTPException
from typing import List, Dict, Union
import aiofiles
from aiofiles import os
from fastapi import UploadFile
from .schemas import UploadImageSchema
from .models import ImageModel
import datetime
from pathlib import Path


class ImageService:
    @staticmethod
    async def upload_image(db: Session, file: UploadFile, image_info: UploadImageSchema, image_format: str):
        if not image_info.image_path.suffix.islower():
            image_info.image_path = image_info.image_path.with_suffix(
                image_info.image_path.suffix.lower()
            )
            image_info.was_renamed = True
        if image_info.image_path.suffix != f".{image_format}":
            image_info.image_path = image_info.image_path.with_suffix(f".{image_format}")
            image_info.was_renamed = True
        if await ImageService.save_file(file, image_info.image_path):
            ImageService.add_or_update_image_in_db(db, image_info)
        else:
            raise HTTPException(status_code=500, detail="Enable to save image")

    @staticmethod
    def add_or_update_image_in_db(db: Session, image_info: UploadImageSchema):
        db_image_info = ImageService.get_image_by_path(db, image_info.image_path)
        if db_image_info is None:
            db_new_image = ImageModel(
                image_path=image_info.image_path.as_posix()
            )
            image_info.image_timestamp = datetime.datetime.utcnow()
            db.add(db_new_image)
        else:
            db_image_info.image_timestamp = datetime.datetime.now()
            image_info.was_recreated = True
            image_info.image_timestamp = db_image_info.image_timestamp
        db.commit()

    @staticmethod
    async def remove_image(db: Session, image_id: int):
        db_image_info = ImageService.get_image_by_id(db, image_id)
        if db_image_info is None:
            raise HTTPException(status_code=400, detail="Image Does not exist")
        else:
            image_path = Path(db_image_info.image_path)
            if await ImageService.remove_file(image_path):
                db.delete(db_image_info)
                db.commit()
                return image_path
            else:
                raise HTTPException(status_code=500, detail="Enable to delete image")

    @staticmethod
    def get_image_by_id(db: Session, image_id: int) -> Union[ImageModel, None]:
        return db.query(ImageModel).filter_by(image_id=image_id).first()

    @staticmethod
    def get_image_by_path(db: Session, image_path: Path) -> Union[ImageModel, None]:
        return db.query(ImageModel).filter_by(image_path=image_path.as_posix()).first()

    @staticmethod
    def get_images_list(db: Session):
        return db.query(ImageModel).all()

    @staticmethod
    async def save_file(file: UploadFile, file_path: Path):
        try:
            async with aiofiles.open(file_path, 'wb') as dist_file:
                await dist_file.write(await file.read())
        except IOError:
            return False
        else:
            return True

    @staticmethod
    async def remove_file(file_path: Path):
        try:
            await aiofiles.os.remove(file_path)
        except IOError:
            return False
        else:
            return True
