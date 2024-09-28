import torch
from PIL import Image
import numpy as np
import cv2
from gradio_client import Client, handle_file
import os
import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

model = torch.hub.load('ultralytics/yolov5', 'custom', path="./best.pt")
client = Client("stepfun-ai/GOT_official_online_demo")
print("models loaded")

# Create the uploads folder if it doesn't exist
uploads_dir = 'uploads'
if not os.path.exists(uploads_dir):
    os.makedirs(uploads_dir)


def process_and_save_crops(image_path, output_path):
    """
    Load an image, process it through a YOLOv5 custom model, and save the detected crops.

    Args:
        image_path (str): Path to the input image (e.g., "sample.png").
        output_path (str): Path to save the cropped detection areas as images.
    """

    # Load the input image
    with Image.open(image_path) as img:
        width, height = img.size
        left, top = width // 2, 0
        right, bottom = width, height // 2
        img = img.crop((left, top, right, bottom))
        img.save("cropped_sample.png")  # Save the cropped image
        img = img.convert("RGB")  # Ensure it's in RGB format
        img = np.array(img)  # Convert to numpy array

        # Use the model to detect objects
        results = model(img)
        crops = results.crop(save=False)

        # Save the cropped detection areas as images
        for i, crop in enumerate(crops):
            cropped_array = crop['im']
            cropped_image = Image.fromarray(cropped_array)
            cropped_image.save(f"{output_path}cropped_detection_{i}.png")

    print("Cropped detection areas have been saved as images.")

def ocr(image_path):
    """
    Currently using the Gradio client / Hugging Face API to perform OCR on the cropped detection areas. Replace this with ocr.py in production.

    Args:
        image_path (str): Path to the cropped detection areas image (e.g., "cropped_detection_0.png").

    Returns:
        str: The license plate number detected by OCR.
    """
    result = client.predict(
		image=handle_file(image_path),
		got_mode="plain texts OCR",
		fine_grained_mode="box",
		ocr_color="red",
		ocr_box="Hello!!",
		api_name="/run_GOT"
    )
    license_plate = result[0]
    return license_plate

@app.route('/detect', methods=['POST'])
def detect_license_plate():
    # Get the image URL from the request
    image_url = request.json['image_url']

    # Download the image from the URL
    response = requests.get(image_url)
    image_path = os.path.join('uploads', 'image.jpg')
    with open(image_path, 'wb') as f:
        f.write(response.content)

    # Process the image and save the cropped detection areas
    process_and_save_crops(image_path, './uploads/')

    # Perform OCR on the first cropped detection area
    license_plate = ocr(os.path.join('uploads', 'cropped_detection_0.png'))

    # Return the license plate number as JSON response
    return jsonify({'license_plate': license_plate})

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
