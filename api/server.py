from flask import Flask, jsonify, request
from flask_cors import CORS
from ultralytics import YOLO
from werkzeug.utils import secure_filename
import os

from PIL import Image
import io


# app instance
app = Flask(__name__)
CORS(app, resources={r'/api/*': {"origins": "*"}})
app.debug = True
model = YOLO("/Users/mihirseth/Desktop/Coding/souschef/sous-chef/api/model.pt")

# /api/home
@app.route("/api/home", methods=['GET'])
def return_home():
    return jsonify({
        'message': "Like this video if this helped!",
        'people': ['Jack', 'Harry', 'Arpan']
    })




@app.route("/api/upload", methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Read the file into memory
    image = Image.open(io.BytesIO(file.read()))

    # Process the image with your model
    results = model(image)
    results = results[0]
    box = results.boxes[0]
    class_id = results.names[box.cls[0].item()]
    detected_items = str(class_id)
    # index = results.find("preprocess")
    # # If "preprocess" is found in the results string
    # if index != -1:
    #     # Cut out everything after "preprocess"
    #     results = results[:index + len("preprocess")]

    # results = results.split('\n')

    return jsonify({'message': 'File processed successfully', 'objects': detected_items})

# @app.route("/api/upload", methods=['POST', "GET"])
# def upload_image():

#     #  return jsonify({
#     #     'message': "Like this video if this helped!",
#     #     'people': ['Jack', 'Harry', 'Arpan']
#     # })

#     file = request. files['file']
#     file_name = file.filename
#     print ('check')
#     return jsonify({
#         'message': "Like this video if this helped!",
#         'people': ['Jack', 'Harry', 'Arpan']
#     })




if __name__ == "__main__":
    app.run(debug=True, port=8080)