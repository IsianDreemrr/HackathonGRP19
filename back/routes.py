from flask import jsonify, request
from connect_db import execute_query
import pickle

model_country_year = pickle.load(open('./models/medals_y_c_model.pkl', 'rb'))

model_top25_gold = pickle.load(open('./models/top_25_medals_gold.pkl', 'rb'))
model_top25_silver = pickle.load(open('./models/top_25_medals_silver.pkl', 'rb'))
model_top25_bronze = pickle.load(open('./models/top_25_medals_bronze.pkl', 'rb'))
model_top25_DF = pickle.load(open('./models/model_top25_DF.pickle', 'rb')) # Dataframe des 25 premiers pays
                          

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
    
    # ROUTE ANTOINE PREDICTION TOP 25
    @app.route('/api/olympic_medals/top25/', methods=['GET'])
    def predict_medals_for_top25():
        
        prediction_gold = model_top25_gold.predict(model_top25_DF[['Year', 'Gold', 'Silver', 'Bronze']])
        prediction_silver = model_top25_silver.predict(model_top25_DF[['Year', 'Gold', 'Silver', 'Bronze']])
        prediction_bronze = model_top25_bronze.predict(model_top25_DF[['Year', 'Gold', 'Silver', 'Bronze']])

        result = []
        i=0

        # Boucle sur les 25 premiers pays pour ajouter les prédictions au résultat
        for i in range(len(model_top25_DF)):
            result.append({
                'country': model_top25_DF['Country'].iloc[i],
                'gold': prediction_gold[i],
                'silver': prediction_silver[i],
                'bronze': prediction_bronze[i]
            })
        
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