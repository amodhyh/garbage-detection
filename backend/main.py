from fastapi import FastAPI,UploadFile,File
from pydantic import BaseModel
from PIL import Image
from io import BytesIO
import uvicorn
from util import preprocessing.
import tensorflow as tf
import numpy as np
import os
import keras
from contextlib import asynccontextmanager

model=None  # Placeholder for model loading logic
MODEL_PATH='.../../models/CNNModel.keras'
IMAGE_WIDTH=224
IMAGE_HEIGHT=224

class Item(BaseModel):
    image:


@asynccontextmanager
async def lifespan(app: FastAPI):
    global model
    model = tf.  .load_model(MODEL_PATH)
    print("Model loaded")
    yield
    # Any cleanup code can go here
    
app = FastAPI(lifespan=lifespan)


@app.get("/")
def status():
    return {"message": "app is running"}

if __name__ == "__main__":
    uvicorn.run("app:app",
                host="localhost",
                port=8089,
                reload=True) 