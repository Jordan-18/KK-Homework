from flask import Flask,request, jsonify, send_from_directory
from flask_cors import CORS
import json
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  # This enables CORS for your Flask app.

data_file = "./html/model.ai.json"
html_folder = "./html/"

@app.route('/', methods=['GET'])
def index():
    return jsonify({"status": "Success"}), 404

@app.route('/data', methods=['GET'])
def get_data():
    try:
        with open(data_file, 'r') as f:
            data = json.load(f)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error": "Data file not found"}), 404
    
@app.route('/html/<path:filename>')
def serve_html(filename):
    return send_from_directory(html_folder, filename)


def preprocess_data(data):
    return data

@app.route('/predict/<path:filename>')
def predict(filename):
    try:
        loaded_model = joblib.load('./model/'+filename+'_model.pkl')
        json = request.get_json()
        data = np.array([json])
        input_data = preprocess_data(data)
        predictions = loaded_model.predict(input_data)
        return jsonify(predictions.tolist())
    except Exception as e:
        return jsonify({'error': str(e)})
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5234)
