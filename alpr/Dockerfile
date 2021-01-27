FROM openalpr/openalpr

RUN apt-get update && apt-get install -y python3 python3-pip

WORKDIR /app
COPY requirements.txt .

RUN pip3 install -r requirements.txt

COPY . .

ENV FLASK_APP=main.py
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

#entrypoint ["python3", "-m","flask", "run"]
entrypoint ["python3", "main.py"]
