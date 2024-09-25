FROM oven/bun:latest
# Install ffmpeg
RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /app

COPY . .

RUN bun install

EXPOSE 8080/tcp

ENTRYPOINT [ "bun", "index.ts" ]
