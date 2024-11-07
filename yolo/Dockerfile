# syntax=docker/dockerfile:1

FROM ultralytics/yolov5
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD ["flask", "--app", "main", "run", "--host=0.0.0.0", "--port", "5001"]
EXPOSE 5001
