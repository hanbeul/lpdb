from hanbeul/openalpr

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
