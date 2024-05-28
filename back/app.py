from flask import Flask, jsonify
import pandas as pd
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

csv_files = {
    'olympic_hosts': 'back/olympic_hosts.csv',
    'olympic_medals': 'back/olympic_medals.csv',
    'olympic_results': 'back/olympic_results.csv'
}

# Lire les données depuis un fichier CSV
def read_csv_data(file_path):
    df = pd.read_csv(file_path)
    df = df.where(pd.notnull(df), None)  # Remplacer les NaN par None
    return df.to_dict(orient='records')

@app.route('/api/olympic_hosts', methods=['GET'])
def get_olympic_hosts():
    data = read_csv_data(csv_files['olympic_hosts'])
    return jsonify(data)

@app.route('/api/olympic_medals', methods=['GET'])
def get_olympic_medals():
    data = read_csv_data(csv_files['olympic_medals'])
    return jsonify(data)

@app.route('/api/olympic_results', methods=['GET'])
def get_olympic_results():
    data = read_csv_data(csv_files['olympic_results'])
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
