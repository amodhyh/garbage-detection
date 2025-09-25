from fastapi import FastAPI,UploadFile,File
from pydantic import BaseModel
from PIL import Image
from io import BytesIO
import numpy as np
import uvicorn
import os
from contextlib import asynccontextmanager
from tensorflow.keras.models import Model, load_model
from tensorflow.keras.layers import Input
import tensorflow as tf
from keras.saving import register_keras_serializable
from util.preprocessing import preprocess




model=None  # Placeholder for model loading logic
MODEL_PATH='./models/best_model.h5'
MODEL_PATH_FOLDS='./models/fold_{}.keras'
IMAGE_WIDTH=224
IMAGE_HEIGHT=224

class Item(BaseModel):
    image: UploadFile = File(...)
import numpy as np
from tensorflow.keras.models import load_model

# Paths to your models
model_paths = [
    './models/best_fold_1.keras',
    './models/best_fold_2.keras',
    './models/best_fold_3.keras',
    './models/best_fold_4.keras',
    './models/best_fold_5.keras'

]

# Load models


# Usage example
# img_array should be preprocessed and have shape (1, IMAGE_WIDTH, IMAGE_HEIGHT, 3)
models=None



@asynccontextmanager
async def lifespan(app: FastAPI):
    global models,model_paths
    models = [load_model(path) for path in model_paths]
    print("Models loaded")


    yield
    # Any cleanup code can go here
    
app = FastAPI(lifespan=lifespan)


def soft_voting_predict(img_array):
    # Get prediction probabilities from each model
    probs = [model.predict(img_array)[0] for model in models]
    # Average the probabilities
    avg_probs = np.mean(probs, axis=0)
    # Get the predicted class index
    predicted_index = int(np.argmax(avg_probs))
    return predicted_index, avg_probs
@app.get("/test")
def test_model():
    class_labels = [
        "battery", "biological", "brown-glass", "cardboard", "clothes",
        "green-glass", "metal", "paper", "plastic", "shoes", "trash", "white-glass"
    ]
    if models is None:
        return {"error": "Model not loaded"}

    image_path = "./metal32.jpg"

    if not os.path.exists(image_path):
        return {"error": "Sample image not found"}
    img = Image.open(image_path).convert("RGB")

    img = Image.open(image_path).convert("RGB")
    img_np = np.array(img)
    img_array = preprocess(img_np)
    img_array = np.expand_dims(img_array, axis=0)

    predicted_index, avg_probs = soft_voting_predict(img_array)
    predicted_class = class_labels[predicted_index]
    return {
        "predicted_class": predicted_class
    }

@app.get("/")
def status():
    return {"message": "app is running"}

if __name__ == "__main__":
    uvicorn.run("backend.main:app",
                host="localhost",
                port=8089,
                reload=True)
