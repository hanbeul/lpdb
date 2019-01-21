import numpy as np
import cv2
from openalpr import Alpr
from threading import Timer, Thread
import json

scalefx = 1
scalefy = 1

sessions = {}
source = './assets/vid_left_right_720p.mp4'

alpr = Alpr('us', './openalpr/config/openalpr.conf.defaults', './openalpr/runtime_data/')

iterations = 0

cap = cv2.VideoCapture(source)
while(True):
  iterations += 1
  ret, frame = cap.read()
  width = cap.get(3)
  height = cap.get(4)

  print('Height: ', height, 'Width: ', width)
  print('Iteration: ', iterations)

  json = alpr.recognize_ndarray(frame)
  
  for result in json['results']:

    plate = result['plate']

    print(plate, ' : ',  result['confidence'])
    
    # Draw rectangles around each license plate
    x1 = result['coordinates'][0]['x']
    y1 = result['coordinates'][0]['y']
    x2 = result['coordinates'][2]['x']
    y2 = result['coordinates'][2]['y']

    cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 10)

    if plate in sessions: 
      sessions[plate] += 2
    else: 
      sessions[plate] = 1

  scale = cv2.resize(frame, None, fx=scalefx, fy=scalefy, interpolation = cv2.INTER_CUBIC)
  cv2.imshow('frame', scale)

  if cv2.waitKey(1) & 0xFF == ord('q'):
    break

cap.release()
alpr.unload()
cv2.destroyAllWindows()
