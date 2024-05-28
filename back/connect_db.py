import pymysql, os
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
        
# Afficher un ligne d'une table
def get_one_row(conn):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM olympic_athletes LIMIT 1")
    row = cursor.fetchone()
    cursor.close()
    return row        

# Exemple d'utilisation
conn = get_db_connection()
row = get_one_row(conn)
print(row)
close_db_connection(conn)