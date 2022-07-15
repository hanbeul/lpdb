#!/bin/sh
PYTHONPATH=$PYTHONPATH:$(pwd)/ultimateAlpr/binaries/linux/x86_64:/app/ultimateAlpr/python LD_LIBRARY_PATH=$(pwd)/ultimateAlpr/binaries/linux/x86_64 python rtsp.py
