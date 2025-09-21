from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/")
def status():
    return {"message": "app is running"}

if __name__ == "__main__":
    uvicorn.run("app:app",
                host="localhost",
                port=8089,
                reload=True)