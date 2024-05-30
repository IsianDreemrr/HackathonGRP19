from flask import jsonify, request
from connect_db import execute_query
import pickle

model_country_year = pickle.load(open('./models/medals_y_c_model.pkl', 'rb'))

def register_routes(app):
    
    @app.route('/api/olympic_hosts', methods=['GET'])
    def get_olympic_hosts():
        query = "SELECT * FROM olympic_hosts"
        data = execute_query(query)
        return jsonify(data)

    @app.route('/api/olympic_medals', methods=['GET'])
    def get_olympic_medals():
        query = "SELECT * FROM olympic_medals"
        data = execute_query(query)
        return jsonify(data)

    @app.route('/api/olympic_medals/<country_id>/<year>', methods=['POST'])
    def predict_medals_for_year_and_country(country_id, year):
        prediction = model_country_year.predict([[year, country_id]])

        result = {
            'country': country_id,
            'year': year,
            'gold': prediction[0][0],
            'silver': prediction[0][1],
            'bronze': prediction[0][2]
        }
        return jsonify(result)
    # ... autres routes ...

    # Obtenir le classement des pays
    @app.route('/api/classement_pays', methods=['GET'])
    def classement_pays():
        query = """
        SELECT
            country_name, country_code, country_3_letter_code,
            COUNT(*) AS total_medals,
            SUM(CASE WHEN medal_type = 'GOLD' THEN 1 ELSE 0 END) AS gold_medals,
            SUM(CASE WHEN medal_type = 'SILVER' THEN 1 ELSE 0 END) AS silver_medals,
            SUM(CASE WHEN medal_type = 'BRONZE' THEN 1 ELSE 0 END) AS bronze_medals
        FROM olympic_medals
        GROUP BY country_name, country_code, country_3_letter_code
        ORDER BY total_medals DESC;
        """
        data = execute_query(query)
        return jsonify(data)



    @app.route('/api/all_data', methods=['GET'])
    def get_all_data():
        hosts_query = "SELECT * FROM olympic_hosts"
        medals_query = "SELECT * FROM olympic_medals"
        results_query = "SELECT * FROM olympic_results"
        athletes_query = "SELECT * FROM olympic_athletes"
        
        hosts_data = execute_query(hosts_query)
        medals_data = execute_query(medals_query)
        results_data = execute_query(results_query)
        athletes_data = execute_query(athletes_query)
        
        all_data = {
            'hosts': hosts_data,
            'medals': medals_data,
            'results': results_data,
            'athletes': athletes_data
        }
        return jsonify(all_data)