import cv2
from dotenv import load_dotenv
load_dotenv()
import os

RTSP_PW = os.environ.get("RTSP_PW")
RTSP_URL = "rtsp://lpdb:" + RTSP_PW + "@192.168.1.66/live"

vcap = cv2.VideoCapture(RTSP_URL)

while(1):
  ret, frame = vcap.read()
  frame = cv2.Canny(frame,100,200)
  print("Captured frame!")
  #cv2.imshow("VIDEO", frame)
  #cv2.waitKey(1)
