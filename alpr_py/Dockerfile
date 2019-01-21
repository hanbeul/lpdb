from hanbeul/openalpr

ENV DEBIAN_FRONTEND noninteractive
ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8

# Install prerequisites
run apt-get update && apt-get install -y \
# lpdb dependencies
python \
python-pip

# Copy all data
copy . /srv/lpdb

workdir /srv/lpdb
run pip install pipenv && \
pipenv install --system --deploy

#workdir /data
entrypoint ["python", "main.py"]
