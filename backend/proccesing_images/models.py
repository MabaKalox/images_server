from database.database import Base
from sqlalchemy.sql import functions as sql_functions
from sqlalchemy import Column, Integer, String, TIMESTAMP
import datetime


class ImageModel(Base):
    __tablename__ = "images"
    image_id = Column(Integer, primary_key=True)
    image_path = Column(String, index=True, unique=True)
    image_timestamp = Column(TIMESTAMP, nullable=False, server_default=sql_functions.now())

    def update_timestamp(self):
        self.image_timestamp = datetime.datetime.utcnow()
