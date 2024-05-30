from flask import jsonify
from connect_db import execute_query
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import pickle
from app import app  # Importer l'application Flask

with app.app_context():
    query = "SELECT * FROM olympic_medals"
    data = execute_query(query)
    json_data = jsonify(data)
    
    # Extraire les données JSON de l'objet Response
    real_data = json_data.get_json()
    # print(real_data)
    medals = pd.DataFrame(real_data)

    # Renommer les colonnes si nécessaire pour faciliter l'accès
    medals.columns = ['','discipline_title', 'slug_game', 'event_title', 'event_gender', 'medal_type', 'participant_type', 'participant_title', 'athlete_url', 'athlete_full_name', 'country_name', 'country_code', 'country_3_letter_code']
    print(medals.head(100))

    # Créer un DataFrame avec les médailles agrégées par pays et par année
    df_medals = medals.groupby(['country_name', 'slug_game', 'medal_type']).size().unstack(fill_value=0).reset_index()
    print(df_medals)
    # Renommer les colonnes pour plus de clarté
    df_medals.columns = ['country', 'year', 'bronze', 'gold', 'silver']

    df_medals['year'] = df_medals['year'].apply(lambda x: int(x.split('-')[-1]))

    # Afficher le DataFrame préparé
    print('final')
    print(df_medals.head(100))

    countries = medals['country'].unique()
    i = 0
    for country in countries:
        medals.loc[medals['country'] == country, 'countryId'] = i
        i += 1

    mlX, mly = medals[['year', 'countryId']].values, medals[['gold', 'silver', 'bronze']].values

    X_train, X_test, y_train, y_test = train_test_split(mlX, mly, test_size=0.30, random_state=0)

    modelml = RandomForestRegressor(max_depth=10000, random_state=0)
    modelml.fit(mlX, mly)

    pickle.dump(modelml, open('modelml.pkl', 'wb'))