import cv2
from dotenv import load_dotenv
load_dotenv()
import os

RTSP_PW = os.environ.get("RTSP_PW")
RTSP_URL = "rtsp://admin:" + RTSP_PW + "@192.168.1.90/Streaming/Channels/1"

vcap = cv2.VideoCapture(RTSP_URL)

while(1):
  ret, frame = vcap.read()
  cv2.imshow("VIDEO", frame)
  cv2.waitKey(1)
