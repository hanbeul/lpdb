# syntax=docker/dockerfile:1

FROM ultralytics/yolov5
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD ["python", "main.py"]
EXPOSE 3000
