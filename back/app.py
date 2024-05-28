from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'message': 'Welcome to my API!'}
    return data

if __name__ == '__main__':
    app.run(debug=True)    