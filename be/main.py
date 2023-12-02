from flask import Flask,request, jsonify, send_from_directory, abort
from flask_cors import CORS
import json
import joblib
import numpy as np
from sklearn.preprocessing import LabelEncoder, OneHotEncoder, StandardScaler,MinMaxScaler

app = Flask(__name__)
CORS(app)  # This enables CORS for your Flask app.

data_file = "./html/model.ai.json"
html_folder = "./html/"
encoder = LabelEncoder()
scaler = StandardScaler()
onehot = OneHotEncoder()
minmaxscaler = MinMaxScaler()

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

@app.route('/predict/<path:filename>', methods=['POST'])
def predict(filename):
    try:
        loaded_model = joblib.load('./model/'+filename+'_model.pkl')
        json_data = request.get_json()
        
        is_regression = filename.endswith('r')

        customer_name_encoded = encoder.fit_transform([json_data["customer-name"]])[0]
        category_encoded = encoder.fit_transform([json_data["category"]])[0]
        city_encoded = encoder.fit_transform([json_data["city"]])[0]
        region_encoded = encoder.fit_transform([json_data["region"]])[0]

        order_date = int(json_data["month"])
        sales = scaler.fit_transform([[float(json_data["sales"])]])[0][0]
        discount = scaler.fit_transform([[float(json_data["discount"])]])[0][0]

        input_data = {
            'Customer Name' : customer_name_encoded,
            'Category' : category_encoded,
            'City' : city_encoded,
            'Region' : region_encoded,
            'Order Data' :order_date,
            'Sales' : sales,
            'Discount' : discount
        }
        
        if not is_regression:
            profit = scaler.fit_transform([[float(json_data["profit"])]])[0][0]
            input_data['Profit'] = profit
            
        input_data = np.array(list(input_data.values())).reshape(1, -1)
        predict = loaded_model.predict(input_data)
        
        if is_regression:
            predictions_list = predict.tolist() if isinstance(predict, np.ndarray) else [predict]
            predictions = predictions_list[0][0] if isinstance(predictions_list[0], list) else predictions_list[0]
            inverse_prediction = scaler.inverse_transform([[predictions]])[0][0]
            return jsonify({'predict' : round(inverse_prediction.tolist() * 1000, 2)})
        else:
            class_to_numeric = {'Low': 0, 'Medium': 1, 'High': 2}
            numeric_to_class = {v: k for k, v in class_to_numeric.items()}
            
            predictions_encoder = np.argmax(predict, axis=1)
            predicted_original_label = numeric_to_class[predictions_encoder.tolist()[0]]
            return jsonify({'predict' : predicted_original_label})

    except Exception as e:
        return jsonify({'error': str(e)})
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5234)
