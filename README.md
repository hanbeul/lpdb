# LPDB

## Run

```bash
docker compose up -d --build
```

## API

Currently takes a webhook request from Square when a payment is made then does the following:

1. Read's the RTSP stream
2. Capture the current frame as an image
3. Saves it to disk

Access the swagger docs at /reference
