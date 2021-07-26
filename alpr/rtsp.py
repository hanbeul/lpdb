import cv2
from PIL import Image
from dotenv import load_dotenv
load_dotenv()
import os
import ultimateAlprSdk
import json
import requests
from datetime import datetime, timedelta
import base64
from io import BytesIO

RTSP_PW = os.environ.get("RTSP_PW")
RTSP_URL = "rtsp://lpdb:" + RTSP_PW + "@192.168.1.66/live"

JSON_CONFIG = {
    "debug_level": "info",
    "debug_write_input_image_enabled": False,
    "debug_internal_data_path": ".",

    "num_threads": -1,
    "gpgpu_enabled": True,
    "max_latency": -1,

    "klass_vcr_gamma": 1.5,

    "detect_roi": [0, 0, 0, 0],
    "detect_minscore": 0.1,

    "car_noplate_detect_min_score": 0.8,

    "pyramidal_search_enabled": True,
    "pyramidal_search_sensitivity": 0.28,
    "pyramidal_search_minscore": 0.3,
    "pyramidal_search_min_image_size_inpixels": 800,

    "recogn_minscore": 0.3,
    "recogn_score_type": "min",

    "assets_folder": "ultimateAlpr/assets",
    # Update JSON options using values from the command args
    "charset": "latin",
    "car_noplate_detect_enabled": False,
    "ienv_enabled": True,
    "openvino_enabled": True,
    "openvino_device": "CPU",
    "klass_lpci_enabled": False,
    "klass_vcr_enabled": False,
    "klass_vmmr_enabled": False,
    "klass_vbsr_enabled": False,
    "license_token_file": "",
    "license_token_data": ""
    }

ultimateAlprSdk.UltAlprSdkEngine_init(json.dumps(JSON_CONFIG))

vcap = cv2.VideoCapture(RTSP_URL)

recent_visits = {}
last_plate = ""
last_plate_count = 0

def add_plate(plate):
  print("Adding plate!", flush=True)
  t = datetime.today()

  # Resize image
  base_width = 1000
  wpercent = (base_width/float(image.size[0]))
  hsize = int((float(image.size[1])*float(wpercent)))
  scaled_image = image.resize((base_width, hsize), Image.ANTIALIAS)

  # Encode image to b64
  buffered = BytesIO()
  scaled_image.save(buffered, format="PNG")
  b64_image = base64.b64encode(buffered.getvalue())

  requests.post("http://backend:9000/api/visits", data = {'plate': plate, 'timestamp': t, 'image': b64_image})
  recent_visits[plate] = t

while(1):
  ret, frame = vcap.read()
  #frame = cv2.Canny(frame,100,200)
  # Convert from opencv image format to PIL image format
  

  image = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
  width, height = image.size
  format = ultimateAlprSdk.ULTALPR_SDK_IMAGE_TYPE_RGB24

  result = ultimateAlprSdk.UltAlprSdkEngine_process(
      format,
      image.tobytes(), # type(x) == bytes
      width,
      height,
      0, # stride
      1
      )

  result = json.loads(result.json())
  output = []
  if "plates" in result.keys():
    for x in result["plates"]:
      output.append(x["text"])

  if "plates" in result.keys():
    print("plate:", result["plates"][0]["text"], flush=True)
    print("Recent visits:", recent_visits, flush=True)
    print("count:", last_plate_count, flush=True)
    if last_plate == result["plates"][0]["text"]:
      last_plate_count += 1
    else:
      last_plate_count = 0
    last_plate = result["plates"][0]["text"]

    if last_plate_count >= 30:
      if last_plate not in recent_visits.keys():
        add_plate(last_plate)
      elif (datetime.today() - recent_visits[last_plate]) > timedelta(minutes = 5):
        add_plate(last_plate)




  #print(output)
  #cv2.imshow("VIDEO", frame)
  #cv2.waitKey(1)

ultimateAlprSdk.UltAlprSdkEngine_deInit()
