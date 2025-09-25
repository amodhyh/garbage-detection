#!/usr/bin/env python
# coding: utf-8


import cv2
import numpy as np




      # Data Augmentation Functions
    # ### Histogram Equalization
    # Resize to 128x128
def resize(image, size=(224, 224)):
    resized_img = cv2.resize(image, size)
    return resized_img

def denoise(image):
    h, w = image.shape[:2]
    # Kernel size: 1/50th of the smallest dimension, rounded to nearest odd integer
    ksize = max(3, min(15, (min(h, w) // 50) | 1))
    blurred_image = cv2.GaussianBlur(image, (ksize, ksize), 0)
    return blurred_image

def sharpen(image):
    h, w = image.shape[:2]
    # Sharpening strength: scale with image size, but keep reasonable bounds
    alpha = min(2.0, max(1.0, min(h, w) / 128))
    # Sharpening kernel
    kernel = np.array([[0, -1, 0],
                       [-1, 4 * alpha + 1, -1],
                       [0, -1, 0]])
    kernel = kernel / (4 * alpha)
    sharpened = cv2.filter2D(image, -1, kernel)
    return sharpened


def histogram_equalization(image):
    # Convert to YCrCb color space
    ycrcb = cv2.cvtColor(image, cv2.COLOR_BGR2YCrCb)
    # Equalize the histogram of the Y channel
    ycrcb[:, :, 0] = cv2.equalizeHist(ycrcb[:, :, 0])
    # Convert back to BGR
    equalized_img = cv2.cvtColor(ycrcb, cv2.COLOR_YCrCb2BGR)
    return equalized_img

# ### Normalization
def normalize(image):
    # Convert to float32 and scale to [0, 1]
    norm_img = image.astype(np.float32) / 255.0
    return norm_img

def preprocess(image):
    image = resize(image)
    image = denoise(image)
    image = sharpen(image)
    image = histogram_equalization(image)
    image = normalize(image)
    return image





