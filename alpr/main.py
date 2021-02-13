from openalpr import Alpr
from flask import Flask, request
app = Flask(__name__)

@app.route("/")
def hello_world():
  return "Hello World from the ALPR container! :)"

@app.route("/lpdb", methods=["GET", "POST"])
def lpdb():
  if request.method == "POST":
    return True
  elif request.method == "GET":
    print("Received Get Request! Creating alpr...")
    alpr = Alpr("us", "/srv/openalpr/config/openalpr.conf", "/srv/openalpr/runtime_data")
    print("alpr created!")
    if not alpr.is_loaded():
      print("Error loading OpenALPR")

    alpr.set_top_n(20)
    alpr.set_default_region("md")
    print("processing file...")
    results = alpr.recognize_file("/app/plate.jpg")
    print("processed!")
    print(results)
    alpr.unload()
    return results


if __name__ == "__main__":
  app.run(host="0.0.0.0")
