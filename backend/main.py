from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import joblib
import json
import io

app = FastAPI(title="Exoplanet Classifier API")

# Allow React (localhost:3000) to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # use ["http://localhost:3000"] in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and features
model = joblib.load("model/rf_kepler.pkl")
features = ["koi_fpflag_nt", "koi_fpflag_ss", "koi_fpflag_co", "koi_fpflag_ec"]
with open("model/features.json", "w") as f:
    json.dump(features, f)
@app.get("/")
def home():
    return {"message": "Exoplanet classifier API running 🚀"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Read uploaded CSV
    contents = await file.read()
    df = pd.read_csv(io.StringIO(contents.decode("utf-8")))

    # Ensure same features
    X = df[features].fillna(df[features].median())
    preds = model.predict(X)

    # Map numeric predictions to readable labels
    inv_map = {0: "CONFIRMED", 1: "CANDIDATE", 2: "FALSE POSITIVE"}
    df["prediction"] = [inv_map[p] for p in preds]

    return {"predictions": df["prediction"].tolist()}
