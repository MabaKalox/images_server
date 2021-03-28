from sqlalchemy.orm import Session
from typing import List
from .schemas import Image as ImageSchema
from .models import UploadImageModel, ImageListModel
import datetime


class ImageService:
    @staticmethod
    def add_image(db: Session, image_info: UploadImageModel):
        db_image_info: ImageSchema = db.query(ImageSchema).filter_by(image_path=image_info.image_path).first()
        if db_image_info is None:
            db_new_image = ImageSchema(image_path=image_info.image_path)
            db.add(db_new_image)
        else:
            image_info.was_recreated = True
            db_image_info.image_timestamp = datetime.datetime.now()
        db.commit()

    @staticmethod
    def remove_image(db: Session):
        pass

    @staticmethod
    def get_images_list(db: Session):
        return db.query(ImageSchema).all()
