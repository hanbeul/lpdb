import torch
import cv2
import numpy
from flask import Flask, flash, request, redirect, url_for, make_response, jsonify

# Model
model = torch.hub.load("ultralytics/yolov5", "custom", path="./yolov5s_weights.pt", force_reload=True)  # or yolov5n - yolov5x6, custom

# Images
img = "image.png"  # or file, Path, PIL, OpenCV, numpy, list

ALLOWED_EXTENSIONS = ['png']

app = Flask(__name__)

#@app.route("/")
def hello_world():
  results = model(img)
  crop = results.crop(save=False)[0]['im']
  results.print()  # or .show(), .save(), .crop(), .pandas(), etc.
  return "<p>Hello lpdb!</p>"

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        file_bytes = numpy.fromfile(file, numpy.uint8)
        img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
        results = model(img)
        results.print()
        return "Done"
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    '''
