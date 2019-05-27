# OpenALPR

from ubuntu:18.04

# Add Tesseract PPA for latest version of package
run apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    software-properties-common && \
    add-apt-repository ppa:alex-p/tesseract-ocr

# Install prerequisites
run apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    build-essential \
    cmake \
    curl \
    git \
    libcurl3-dev \
    libleptonica-dev \
    liblog4cplus-dev \
    libopencv-dev \
    libtesseract-dev \
    wget

# Copy all data
copy ./openalpr /srv/openalpr

# Setup the build directory
run mkdir /srv/openalpr/src/build
workdir /srv/openalpr/src/build

# Setup the compile environment
run cmake -DCMAKE_INSTALL_PREFIX:PATH=/usr -DCMAKE_INSTALL_SYSCONFDIR:PATH=/etc .. && \
    make -j2 && \
    make install

workdir /data

#entrypoint ["alpr"]

# LPDB
#from hanbeul/openalpr

ENV DEBIAN_FRONTEND noninteractive
ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8

# Install prerequisites
run apt-get update && apt-get install -y \
# lpdb dependencies
python3 \
python3-pip

# Copy all data
copy assets /srv/lpdb/assets
copy Pipfile* /srv/lpdb/

workdir /srv/lpdb
run ln -s /usr/lib/python2.7/dist-packages/openalpr /usr/local/lib/python3.6/dist-packages/ && \
pip3 install pipenv && \
pipenv install --system --deploy 

copy main.py /srv/lpdb/

#workdir /data
entrypoint ["python3", "main.py"]
