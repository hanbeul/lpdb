FROM python:2.7

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

RUN git clone https://github.com/sergiomsilva/alpr-unconstrained.git
WORKDIR /app/alpr-unconstrained
RUN cd darknet && make
RUN bash get-networks.sh

#RUN bash run.sh -i samples/test -o /tmp/output -c /tmp/output/results.csv
entrypoint ["bash", "run.sh", "-i", "samples/test", "-o", "/tmp/output", "-c", "/tmp/output/results.csv"]
