from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse
from proccesing_images.router import images_router
import uvicorn

app = FastAPI()

# app.mount("/public", StaticFiles(directory="public"), name="static")


app.include_router(images_router, prefix="/images")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8012)
