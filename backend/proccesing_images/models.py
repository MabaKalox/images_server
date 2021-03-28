from database.database import Base
from sqlalchemy import Column, Integer, String, DateTime
import datetime


class ImageModel(Base):
    __tablename__ = "images"
    image_id = Column(Integer, primary_key=True)
    image_path = Column(String, index=True, unique=True)
    image_timestamp = Column(DateTime, default=datetime.datetime.utcnow())