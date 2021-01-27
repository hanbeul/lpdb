from openalpr import Alpr
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello_world():
  return "Hello World from the ALPR container! :)"

@app.route("/lpdb", methods=["GET", "POST"])
def lpdb():
  if request.method == "POST":
    return True
  else:
    return False

if __name__ == "__main__":
  app.run(host="0.0.0.0")
