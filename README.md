
# Garbage Classification Project

## Overview
This project is a full-stack application for classifying garbage images into categories using deep learning. It combines a FastAPI backend (Python) with a React frontend for an interactive user experience. 

---

## Table of Contents
- [Garbage Classification Project](#garbage-classification-project)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [1. Features](#1-features)
  - [2. Architecture](#2-architecture)
    - [Data Flow](#data-flow)
  - [3. Project Structure](#3-project-structure)
  - [4. Technologies Used](#4-technologies-used)
  - [5. Digital Image Processing Techniques](#5-digital-image-processing-techniques)
  - [6. CNN Model Architecture \& Training](#6-cnn-model-architecture--training)
  - [7. Setup \& Installation](#7-setup--installation)
    - [Prerequisites](#prerequisites)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
  - [8. Usage](#8-usage)
  - [9. Model Training \& Evaluation](#9-model-training--evaluation)
  - [10. Contributing](#10-contributing)
  - [11. License](#11-license)
  - [Features](#features)
  - [Architecture](#architecture)
    - [Data Flow](#data-flow-1)
  - [Setup \& Installation](#setup--installation)
    - [Prerequisites](#prerequisites-1)
    - [Backend Setup](#backend-setup-1)
    - [Frontend Setup](#frontend-setup-1)
  - [Usage](#usage)
  - [Project Structure](#project-structure)
  - [Technologies Used](#technologies-used)
  - [Contributing](#contributing)
  - [License](#license)

---

## 1. Features
- **Interactive Frontend:** Responsive React UI for image upload, result visualization, and classification history chart.
  <img width="1806" height="843" alt="image" src="https://github.com/user-attachments/assets/f79efae2-b1ab-4e8b-bd47-d09fdbbf0994" />
  <img width="1602" height="856" alt="image" src="https://github.com/user-attachments/assets/f97bcbd3-178f-46f4-8fc8-13856dcd4da4" />


- **Efficient Backend:** FastAPI server serving predictions from a trained Keras CNN model.
- **Model Integration:** Seamless use of TensorFlow/Keras models for real-time inference.
- **Classification History:** Bar chart of previous classifications using localStorage.
- **Recyclability Status:** Visual indication (logo, color) of whether the predicted class is recyclable.
- **PDF Report Generation:** (Planned) Downloadable report of classification results.

---

## 2. Architecture
```
Frontend (React) <-> FastAPI Backend <-> Keras Model
                  |                |                  |
        User Uploads      Receives API      Model Predicts
        Image/Views UI    Requests/Results  Class & Probabilities
```

### Data Flow
1. User uploads an image via the frontend.
2. Frontend sends the image to the FastAPI backend.
3. Backend preprocesses the image and runs it through the CNN model.
4. Backend returns the predicted class and probabilities.
5. Frontend displays the result, recyclability status, and updates the classification history chart.

---

## 3. Project Structure
```
Project/
├── backend/
│   ├── main.py
│   ├── models/
│   └── util/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── styles/
│   └── public/
├── data/
│   └── raw/
├── notebooks/
│   ├── preprocessing.ipynb
│   └── CNNModel.ipynb
├── requirements.txt
├── README.md
└── ...
```

---

## 4. Technologies Used
- **Backend:** Python, FastAPI, TensorFlow/Keras
- **Frontend:** React, Chart.js, react-chartjs-2, Vite
- **Other:** Jupyter Notebooks, localStorage

---

## 5. Digital Image Processing Techniques
- **Image Resizing:** All input images are resized to 224x224 pixels to match the input requirements of MobileNetV2.
- **Image Enhancement:** CLAHE (Contrast Limited Adaptive Histogram Equalization) is applied to the luminance channel to improve contrast and detail.
- **Color Space Conversion:** Images are converted from BGR to YCrCb for enhancement, then back to RGB for model input.
- **Normalization:** Pixel values are scaled to the [0, 1] range for stable training.
- **Data Augmentation:** Random rotations, flips, and other augmentations are applied to increase dataset diversity and reduce overfitting.
- **Label Encoding:** Class labels are encoded using scikit-learn’s LabelEncoder for compatibility with Keras.

---

## 6. CNN Model Architecture & Training
- **Base Model:** MobileNetV2 (pretrained on ImageNet, used as feature extractor)
  - Input shape: (224, 224, 3)
  - All layers frozen by default; optionally, last N layers can be unfrozen for fine-tuning.
- **Custom Head:**
  - Global Average Pooling
  - Dropout (0.2)
  - Dense layer with softmax activation for multi-class classification
- **Training Details:**
  - Optimizer: Adam
  - Loss: Categorical Crossentropy
  - Metrics: Accuracy, Precision, Recall, AUC, Top-3 Accuracy
  - K-Fold Cross Validation (5 folds) for robust evaluation
  - Early Stopping and ReduceLROnPlateau callbacks for efficient training
- **Ensemble:** Final predictions can be made using a soft-voting ensemble of the best models from each fold.

---

## 7. Setup & Installation

### Prerequisites
- Python 3.11+
- Node.js & npm

### Backend Setup
1. Navigate to the `backend` directory:
        ```bash
        cd backend
        ```
2. Install Python dependencies:
        ```bash
        pip install -r ../requirements.txt
        ```
3. Start the FastAPI server:
        ```bash
        uvicorn main:app --host localhost --port 8089 --reload
        ```

### Frontend Setup
1. Navigate to the `frontend` directory:
        ```bash
        cd frontend
        ```
2. Install Node.js dependencies:
        ```bash
        npm install
        ```
3. Start the React development server:
        ```bash
        npm run dev
        ```

---

## 8. Usage
1. Open the frontend in your browser (usually at `http://localhost:5173`).
2. Upload an image to classify.
3. View the predicted class, recyclability status, and previous classification chart.
4. (Optional) Download a PDF report of the result (if implemented).

---

## 9. Model Training & Evaluation
- **K-Fold Cross Validation:** The dataset is split into 5 folds; each fold trains a fresh model and evaluates on its validation split.
- **Performance Metrics:** Accuracy, precision, recall, AUC, and top-3 accuracy are tracked per fold.
- **Confusion Matrix:** Visualized for overall and per-fold results to analyze misclassifications.
- **Learning Curves:** Training and validation accuracy/loss curves are plotted for each fold and averaged.

---

## 10. Contributing
Contributions are welcome! Please fork the repository and submit a pull request. For major changes, open an issue first to discuss what you would like to change.

---

## 11. License
This project is for educational purposes as part of the Digital Image Processing course.

---

## Features

- **Interactive Frontend:** Responsive React UI for image upload, result visualization, and classification history chart.
- **Efficient Backend:** FastAPI server serving predictions from a trained Keras CNN model.
- **Model Integration:** Seamless use of TensorFlow/Keras models for real-time inference.
- **Classification History:** Bar chart of previous classifications using localStorage.
- **Recyclability Status:** Visual indication (logo, color) of whether the predicted class is recyclable.
- **PDF Report Generation:** (Planned) Downloadable report of classification results.

---

## Architecture

```
Frontend (React) <-> FastAPI Backend <-> Keras Model
                  |                |                  |
                  |                |                  |
        User Uploads      Receives API      Model Predicts
        Image/Views UI    Requests/Results  Class & Probabilities
```

### Data Flow
1. User uploads an image via the frontend.
2. Frontend sends the image to the FastAPI backend.
3. Backend preprocesses the image and runs it through the CNN model.
4. Backend returns the predicted class and probabilities.
5. Frontend displays the result, recyclability status, and updates the classification history chart.

---

## Setup & Installation

### Prerequisites
- Python 3.11+
- Node.js & npm

### Backend Setup
1. Navigate to the `backend` directory:
        ```bash
        cd backend
        ```
2. Install Python dependencies:
        ```bash
        pip install -r ../requirements.txt
        ```
3. Start the FastAPI server:
        ```bash
        uvicorn main:app --host localhost --port 8089 --reload
        ```

### Frontend Setup
1. Navigate to the `frontend` directory:
        ```bash
        cd frontend
        ```
2. Install Node.js dependencies:
        ```bash
        npm install
        ```
3. Start the React development server:
        ```bash
        npm run dev
        ```

---

## Usage

1. Open the frontend in your browser (usually at `http://localhost:5173`).
2. Upload an image to classify.
3. View the predicted class, recyclability status, and previous classification chart.
4. (Optional) Download a PDF report of the result (if implemented).

---

## Project Structure

```
Project/
├── backend/
│   ├── main.py
│   ├── models/
│   └── util/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── styles/
│   └── public/
├── data/
│   └── raw/
├── notebooks/
│   ├── preprocessing.ipynb
│   └── CNNModel.ipynb
├── requirements.txt
├── README.md
└── ...
```

---

## Technologies Used

- **Backend:** Python, FastAPI, TensorFlow/Keras
- **Frontend:** React, Chart.js, react-chartjs-2, Vite
- **Other:** Jupyter Notebooks, localStorage

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request. For major changes, open an issue first to discuss what you would like to change.

---

## License

This project is for educational purposes as part of the Digital Image Processing course.

