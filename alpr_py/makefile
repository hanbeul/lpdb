build: 
	docker build --rm -t hanbeul/lpdb-alpr .
dev:
	docker run --rm -it -e DISPLAY=host.docker.internal:0 -v $(CURDIR):/srv/lpdb --entrypoint /bin/bash hanbeul/lpdb-alpr:latest 
run: 
	docker run --rm -it -e DISPLAY=host.docker.internal:0 hanbeul/lpdb-alpr:latest
