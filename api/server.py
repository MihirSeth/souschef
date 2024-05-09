from flask import Flask, jsonify, request
from flask_cors import CORS
from ultralytics import YOLO
from werkzeug.utils import secure_filename
import os
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

    filename = secure_filename(file.filename)
    file.save(os.path.join('/Users/mihirseth/Desktop', filename))

    # results = model(os.path.join('/Users/mihirseth/Desktop', filename))

    # Extract detected objects and their counts
    # detected_objects = [(pred[5], pred[4]) for pred in results.pred[0]]
    

    return jsonify({'detected_objects': 'gello'})

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