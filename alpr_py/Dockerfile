from ubuntu:18.04

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
wget \
# lpdb dependencies
python3 \
python3-pip

# Copy all data
copy . /srv/lpdb

# Setup the build directory
run mkdir /srv/lpdb/openalpr/src/build
workdir /srv/lpdb/openalpr/src/build

# Setup the compile environment
run cmake -DCMAKE_INSTALL_PREFIX:PATH=/usr -DCMAKE_INSTALL_SYSCONFDIR:PATH=/etc .. && \
make -j2 && \
make install

workdir /srv/lpdb
run pip3 install pipenv && \
export LC_ALL=C.UTF-8 && \
export LANG=C.UTF-8 && \
pipenv --python /usr/bin/python3 install

#workdir /data
entrypoint ["pipenv", "--python", "/usr/bin/python3", "run", "python3", "main.py"]
