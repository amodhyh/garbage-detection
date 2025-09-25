from fastapi import FastAPI,UploadFile,File
from pydantic import BaseModel
from PIL import Image
from io import BytesIO

from tensorflow.keras.models import Model, load_model
from tensorflow.keras.layers import Input
import tensorflow as tf

from keras.saving import register_keras_serializable
@register_keras_serializable()
class EnsembleModel(Model):
    def __init__(self, model_paths=None, **kwargs):
        super(EnsembleModel, self).__init__(**kwargs)
        self.models = []
        if model_paths:
            self.models = [load_model(path) for path in model_paths]

    def call(self, inputs):
        all_probs = [model(inputs, training=False) for model in self.models]
        avg_probs = tf.reduce_mean(all_probs, axis=0)
        return avg_probs
import uvicorn 

from util import preprocessing
import numpy as np
import os
from contextlib import asynccontextmanager

model=None  # Placeholder for model loading logic
MODEL_PATH='./models/CNNModel.keras'
IMAGE_WIDTH=224
IMAGE_HEIGHT=224

class Item(BaseModel):
    image: UploadFile = File(...)


@asynccontextmanager
async def lifespan(app: FastAPI):
    global model
    model = load_model(MODEL_PATH, custom_objects={'EnsembleModel': EnsembleModel})
    print("Model loaded")
    yield
    # Any cleanup code can go here
    
app = FastAPI(lifespan=lifespan)

@app.get("/test")
def test_model():
    import numpy as np
    if model is None:
        return {"error": "Model not loaded"}
    image_path = "./sample.jpeg"
    if not os.path.exists(image_path):
        return {"error": "Sample image not found"}
    image = Image.open(image_path).convert("RGB")
    image = image.resize((IMAGE_WIDTH, IMAGE_HEIGHT))
    img_array = np.array(image).astype(np.float32) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    result = model.predict(img_array)
    result = np.nan_to_num(result, nan=0.0, posinf=0.0, neginf=0.0)
    return {"result": result.tolist()}
@app.get("/")
def status():
    return {"message": "app is running"}

if __name__ == "__main__":
    uvicorn.run("backend.main:app",
                host="localhost",
                port=8089,
                reload=True)
