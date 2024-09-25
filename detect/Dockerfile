# Use the official Python image as the base image
FROM python:3.12-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Python script and other files to the container
COPY . .

# Expose the port for the Flask app
EXPOSE 5000

# Set the entry point for the container
CMD ["python", "main.py"]
