FROM python

RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6 -y

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY ultimateAlpr ./ultimateAlpr

RUN cd ultimateAlpr/binaries/linux/x86_64/ && \
    python ../../../python/setup.py build_ext --inplace -v

ENV PYTHONPATH=$PYTHONPATH:/app/ultimateAlpr/binaries/linux/x86_64:/app/ultimateAlpr/python \
    LD_LIBRARY_PATH=/app/ultimateAlpr/binaries/linux/x86_64

RUN wget https://doubango.org/deep_learning/libtensorflow_r1.14_cpu+gpu_linux_x86-64.tar.gz
RUN tar -zxf /app/libtensorflow_r1.14_cpu+gpu_linux_x86-64.tar.gz -C /app/ultimateAlpr/binaries/linux/x86_64/

COPY *.py *.env ./

entrypoint ["python", "rtsp.py"]
