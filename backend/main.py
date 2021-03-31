from fastapi import FastAPI
from proccesing_images.router import images_router
import uvicorn


app = FastAPI()


app.include_router(images_router, prefix="/images")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8012)
