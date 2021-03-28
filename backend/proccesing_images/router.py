from fastapi import File, UploadFile, Depends, HTTPException
from fastapi import APIRouter
from .models import UploadImageModel, ImageListModel
import imghdr
from pathlib import Path
from database.database import get_db
from .crud import ImageService
import aiofiles

images_router = APIRouter()


@images_router.post("/upload_image/", response_model=UploadImageModel)
async def upload_image(file: UploadFile = File(...), db_session=Depends(get_db)):
    file_name = Path(file.filename)
    image_format = imghdr.what(file.file)
    if image_format is not None:
        image_info = UploadImageModel()
        if not file_name.suffix.islower():
            file_name = file_name.with_suffix(file_name.suffix.lower())
            image_info.was_renamed = True
        if file_name.suffix != f".{image_format}":
            file_name = file_name.with_suffix(f".{image_format}")
            image_info.was_renamed = True
        image_info.image_path = f"/images_folder/{file_name}"
        async with aiofiles.open(image_info.image_path, 'wb') as dist_file:
            await dist_file.write(await file.read())
        ImageService.add_image(db_session, image_info)
        return image_info
    else:
        raise HTTPException(status_code=400, detail="Invalid file Format. Only images allowed.")


@images_router.get("/get_images_list", response_model=ImageListModel)
async def get_images_list(db_session=Depends(get_db)):
    images_list = ImageService.get_images_list(db_session)
    images_path_list = [image_info.image_path for image_info in images_list]
    return ImageListModel(images_path_list=images_path_list)
