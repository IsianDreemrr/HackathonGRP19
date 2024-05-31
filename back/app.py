from flask import Flask
from flask_cors import CORS
from routes import register_routes

app = Flask(__name__)
# CORS(app)
CORS(app, resources={r"/*": {"origins": "https://6659acc8497f3a1d9caaf899--hackathon-jo-19.netlify.app"}})

register_routes(app)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
    # app.run(debug=True)