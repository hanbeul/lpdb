FROM python

RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6 -y

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY ultimateAlpr ./ultimateAlpr

COPY *.py *.env ./

entrypoint ["python", "rtsp.py"]
