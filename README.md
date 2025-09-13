# Garbage Classification Project

This project is a part of the Digital Image Processing course. The goal of this project is to classify garbage into different categories using a Convolutional Neural Network (CNN).

## Architecture

The architecture of the project is as follows:

```
+-----------------+
| Input Image     |
+-----------------+
        |
        v
+-----------------+
| Preprocessing   |
+-----------------+
        |
        v
+-----------------+
| CNN Model       |
+-----------------+
        |
        v
+-----------------+
| Output          |
+-----------------+
```

### Preprocessing

The preprocessing step includes the following:

-   Image resizing
-   Data augmentation (rotation, flipping, etc.)
-   Normalization

### CNN Model

The CNN model is a deep learning model that is used for image classification. The model consists of the following layers:

-   Convolutional layers
-   Pooling layers
-   Fully connected layers

## Algorithms

The following algorithms are used in this project:

-   **Convolutional Neural Network (CNN)**: A deep learning algorithm that is used for image classification.
-   **Data Augmentation**: A technique that is used to increase the size of the training dataset by creating modified copies of already existing images.

## Digital Image Processing Techniques

The following digital image processing techniques are used in this project:

-   **Image Resizing**: A technique that is used to change the size of an image.
-   **Image Normalization**: A technique that is used to change the range of pixel intensity values.

## Getting Started

To get started with this project, you need to have Python and pip installed on your system.

### Installation

1.  Clone the repository:

```
git clone https://github.com/your-username/garbage-detection.git
```

2.  Install the dependencies:

```
pip install -r requirements.txt
```

### Usage

1.  Run the `preprocessing.ipynb` notebook to preprocess the data.
2.  Train the model.
3.  Test the model.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

