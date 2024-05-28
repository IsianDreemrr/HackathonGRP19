from flask import Flask, jsonify, request
from flask_cors import CORS
import pymysql
import os
from dotenv import load_dotenv

# Charger les variables d'environnement depuis le fichier .env
load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_DATABASE = os.getenv("DB_DATABASE")

app = Flask(__name__)
CORS(app)

# Fonction pour établir une connexion à la base de données MySQL
def get_db_connection():
    try:
        conn = pymysql.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_DATABASE
        )
        print("Connexion réussie")
        return conn
    except pymysql.MySQLError as e:
        print(f"Erreur de connexion à la base de données: {e}")
        return None

# Fonction pour fermer la connexion à la base de données MySQL
def close_db_connection(conn):
    if conn:
        conn.close()
        print("Connexion fermée")
    else:
        print("Aucune connexion à fermer")

# Fonction pour exécuter une requête SQL et récupérer les résultats
def execute_query(query, params=None):
    conn = get_db_connection()
    if conn:
        try:
            with conn.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.execute(query, params)
                result = cursor.fetchall()
            conn.commit()
            return result
        except pymysql.MySQLError as e:
            print(f"Erreur lors de l'exécution de la requête: {e}")
            return None
        finally:
            close_db_connection(conn)
    else:
        return None

# Endpoints pour récupérer les données
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

@app.route('/api/olympic_results', methods=['GET'])
def get_olympic_results():
    query = "SELECT * FROM olympic_results"
    data = execute_query(query)
    return jsonify(data)

@app.route('/api/olympic_athletes', methods=['GET'])
def get_olympic_athletes():
    query = "SELECT * FROM olympic_athletes"
    data = execute_query(query)
    return jsonify(data)

# Endpoint pour tester la connectivité avec la base de données
@app.route('/api/test_db_connection', methods=['GET'])
def test_db_connection():
    conn = get_db_connection()
    if conn:
        close_db_connection(conn)
        return jsonify({"message": "Connexion réussie"}), 200
    else:
        return jsonify({"message": "Erreur de connexion"}), 500

# Endpoints pour récupérer les données par différents critères
@app.route('/api/data_by_country', methods=['GET'])
def get_data_by_country():
    country = request.args.get('country')
    query = "SELECT * FROM olympic_results WHERE country_name = %s"
    data = execute_query(query, (country,))
    return jsonify(data)

@app.route('/api/data_by_athlete', methods=['GET'])
def get_data_by_athlete():
    athlete = request.args.get('athlete')
    query = "SELECT * FROM olympic_athletes WHERE athlete_full_name = %s"
    data = execute_query(query, (athlete,))
    return jsonify(data)

@app.route('/api/data_by_year', methods=['GET'])
def get_data_by_year():
    year = request.args.get('year')
    query = "SELECT * FROM olympic_hosts WHERE game_year = %s"
    data = execute_query(query, (year,))
    return jsonify(data)

@app.route('/api/data_by_game', methods=['GET'])
def get_data_by_game():
    game = request.args.get('game')
    query = "SELECT * FROM olympic_hosts WHERE game_slug = %s"
    data = execute_query(query, (game,))
    return jsonify(data)

@app.route('/api/data_by_medal', methods=['GET'])
def get_data_by_medal():
    medal = request.args.get('medal')
    query = "SELECT * FROM olympic_medals WHERE medal_type = %s"
    data = execute_query(query, (medal,))
    return jsonify(data)

@app.route('/api/data_by_sport', methods=['GET'])
def get_data_by_sport():
    sport = request.args.get('sport')
    query = "SELECT * FROM olympic_results WHERE discipline_title = %s"
    data = execute_query(query, (sport,))
    return jsonify(data)

@app.route('/api/data_by_gender', methods=['GET'])
def get_data_by_gender():
    gender = request.args.get('gender')
    query = "SELECT * FROM olympic_results WHERE event_gender = %s"
    data = execute_query(query, (gender,))
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

if __name__ == '__main__':
    app.run(debug=True)