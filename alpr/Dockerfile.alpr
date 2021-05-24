FROM openalpr/openalpr

RUN apt-get update && apt-get install -y python3 python3-pip

WORKDIR /app
COPY requirements.txt .

RUN pip3 install -r requirements.txt
WORKDIR /srv/openalpr/src/bindings/python
RUN python3 setup.py install

WORKDIR /app
COPY . .

ENV FLASK_APP=main.py
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8
ENV PYTHONPATH PYTHONPATH:/srv/openalpr/src/bindings/python/openalpr

#entrypoint ["python3", "-m","flask", "run"]
entrypoint ["python3", "main.py"]
