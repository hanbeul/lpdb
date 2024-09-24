import torch
from flask import Flask

# Model
model = torch.hub.load("ultralytics/yolov5", "custom", path="./yolov5s_weights.pt", force_reload=True)  # or yolov5n - yolov5x6, custom

# Images
img = "image.png"  # or file, Path, PIL, OpenCV, numpy, list

app = Flask(__name__)

@app.route("/")
def hello_world():
  results = model(img)
  crop = results.crop(save=False)[0]['im']
  results.print()  # or .show(), .save(), .crop(), .pandas(), etc.
  return "<p>Hello lpdb!</p>"
