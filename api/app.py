from flask import Flask, jsonify, request
from flask_cors import CORS
from ultralytics import YOLO
from werkzeug.utils import secure_filename
import pandas as pd
import ast

from PIL import Image
import io


# app instance
app = Flask(__name__)
CORS(app, resources={r'/api/*': {"origins": "*"}})
app.debug = True
model = YOLO("/Users/mihirseth/Desktop/Coding/souschef/sous-chef/api/model.pt")

pd.set_option('display.max_colwidth', 1000)

# Specify the column names that you want to read
columns = ['ingredients', 'name', 'steps','n_ingredients','n_steps', 'nutrition', 'minutes']


# /api/home
# @app.route("/api/home", methods=['GET'])
# def return_home():
#     return jsonify({
#         'message': "Like this video if this helped!",
#         'people': ['Jack', 'Harry', 'Arpan']
#     })




@app.route("/api/upload", methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']
    data = request.form
    # print(data['calorie'])
    calories = int(data['calorie'])
    # cooking_steps = data['cooking_steps']
    protein = int(data['protein'])
    time = int(data['minutes'])

    # ingredients_num = data['ingredients_num']

    df = pd.read_csv('/Users/mihirseth/Downloads/archive-2/RAW_recipes.csv', usecols=columns)

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Read the file into memory
    image = Image.open(io.BytesIO(file.read()))
    

    # Process the image with your model
    results = model(image)
    results = results[0]
    box = results.boxes[0]
    detected_items_list = []
    for box in results.boxes:
            class_id = results.names[box.cls[0].item()]
            detected_items = str(class_id)
            detected_items_list.append(detected_items)

    detected_items_list = list(set(detected_items_list))
    detected_items_list = list(map(str.lower, detected_items_list))

    df['nutrition'] = df['nutrition'].apply(ast.literal_eval)

    ingredients_condition = df['ingredients'].apply(lambda x: all(item in x for item in detected_items_list))
    # cooking_steps_condition = df['n_steps'] > 10
    # ingredients_num_condition = df['n_ingredients'] > 10

    cooking_steps_condition = df['n_steps'] 
    ingredients_num_condition = df['n_ingredients'] 

    calories_condition = df['nutrition'].apply(lambda x: x[0] <= calories)
    protein_condition = df['nutrition'].apply(lambda x: x[5] >= protein)
    minutes_condition = df['minutes'] <= time

    combined_condition = ingredients_condition & cooking_steps_condition & ingredients_num_condition & calories_condition & protein_condition & minutes_condition

    df_filtered = df[combined_condition]


    n = 5
    if len(df_filtered) < n:
        n = len(df_filtered)

    # Select n random recipes
    df_random = df_filtered.sample(n)

    return jsonify({'message': 'File processed successfully', 'objects': detected_items_list, 'recipes': df_random.to_dict(orient='records'), 'total_objects': len(df_random)})


@app.route("/api/reload", methods=['POST'])
def reload_image():

    data = request.form
    calories = int(data['0'])
    protein = int(data['2'])
    time = int(data['1'])
    ingredients = data['3']
    # ingredients = type(data['3'])


    # ingredients_num = data['ingredients_num']

    df = pd.read_csv('/Users/mihirseth/Downloads/archive-2/RAW_recipes.csv', usecols=columns)

 
    

    # Process the image with your model

    # detected_items_list = []
   
    detected_items_list = ingredients.split()
    detected_items_list = list(set(detected_items_list))
    detected_items_list = list(map(str.lower, detected_items_list))

    df['nutrition'] = df['nutrition'].apply(ast.literal_eval)

    ingredients_condition = df['ingredients'].apply(lambda x: all(item in x for item in detected_items_list))
    # cooking_steps_condition = df['n_steps'] > 10
    # ingredients_num_condition = df['n_ingredients'] > 10

    cooking_steps_condition = df['n_steps'] 
    ingredients_num_condition = df['n_ingredients'] 

    calories_condition = df['nutrition'].apply(lambda x: x[0] <= calories)
    protein_condition = df['nutrition'].apply(lambda x: x[5] >= protein)
    minutes_condition = df['minutes'] <= time

    combined_condition = ingredients_condition & cooking_steps_condition & ingredients_num_condition & calories_condition & protein_condition & minutes_condition

    df_filtered = df[combined_condition]


    n = 5
    if len(df_filtered) < n:
        n = len(df_filtered)

    # Select n random recipes
    df_random = df_filtered.sample(n)
    return jsonify({'message': 'File processed successfully', 'objects': detected_items_list, 'recipes': df_random.to_dict(orient='records'), 'total_objects': len(df_random)})


if __name__ == "__main__":
    app.run(debug=True, port=8080)