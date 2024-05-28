import pymysql
import os
import pandas as pd
from dotenv import load_dotenv

# Charger les variables d'environnement depuis le fichier .env
load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_DATABASE = os.getenv("DB_DATABASE")

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

# Fonction pour insérer des données dans une table
def insert_data_from_csv(conn, table_name, csv_file_path, columns):
    try:
        cursor = conn.cursor()
        # Lire les données depuis le fichier CSV
        df = pd.read_csv(csv_file_path)
        # Remplacer les valeurs NaN par None
        df = df.where(pd.notnull(df), None)
        # Convertir les données en liste de tuples
        data = df[columns].values.tolist()
        # Générer une chaîne de caractères pour les valeurs de chaque ligne
        values_str = ', '.join(['%s'] * len(columns))
        # Construire la requête d'insertion
        insert_query = f"INSERT INTO {table_name} ({', '.join(columns)}) VALUES ({values_str})"
        # Exécuter la requête d'insertion
        cursor.executemany(insert_query, data)
        conn.commit()
        print(f"Données insérées avec succès dans la table {table_name}")
    except pymysql.MySQLError as e:
        print(f"Erreur lors de l'insertion des données dans la table {table_name}: {e}")
    finally:
        cursor.close()

# Exemple d'utilisation
conn = get_db_connection()

# Chemins relatifs vers les fichiers CSV et colonnes correspondantes
csv_files = {
    'olympic_hosts': {
        'file_path': 'back/olympic_hosts.csv',
        'columns': ['game_slug', 'game_end_date', 'game_start_date', 'game_location', 'game_name', 'game_season', 'game_year']
    },
    'olympic_medals': {
        'file_path': 'back/olympic_medals.csv',
        'columns': ['discipline_title', 'slug_game', 'event_title', 'event_gender', 'medal_type', 'participant_type', 'participant_title', 'athlete_url', 'athlete_full_name', 'country_name', 'country_code', 'country_3_letter_code']
    },
    'olympic_results': {
        'file_path': 'back/olympic_results.csv',
        'columns': ['discipline_title', 'event_title', 'slug_game', 'participant_type', 'medal_type', 'athletes', 'rank_equal', 'rank_position', 'country_name', 'country_code', 'country_3_letter_code', 'athlete_url', 'athlete_full_name', 'value_unit', 'value_type']
    }
}

# Insérer les données pour chaque table
for table_name, info in csv_files.items():
    insert_data_from_csv(conn, table_name, info['file_path'], info['columns'])

# Fermer la connexion
close_db_connection(conn)