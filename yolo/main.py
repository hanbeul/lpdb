import torch
import cv2
import numpy
from flask import Flask, flash, request, redirect, url_for, make_response, jsonify

from plate_model import PlateModel

#model = torch.hub.load("ultralytics/yolov5", "custom", path="./yolov5s_weights.pt", force_reload=True)  # or yolov5n - yolov5x6, custom

app = Flask(__name__)

model = PlateModel()

@app.route('/hello', methods=['GET'])
def hello_world():
  results = model(img)
  crop = results.crop(save=False)[0]['im']
  results.print()  # or .show(), .save(), .crop(), .pandas(), etc.
  return "<p>Hello lpdb!</p>"

@app.route('/health', methods=['GET'])
def health():
  # results = model(img)
  # crop = results.crop(save=False)[0]['im']
  # results.print()  # or .show(), .save(), .crop(), .pandas(), etc.
  return "{'healthy': 'yes'}"

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        file_bytes = numpy.fromfile(file, numpy.uint8)
        img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
        results = model.classify(img)
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
