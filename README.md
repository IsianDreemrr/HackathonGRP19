# HackathonGRP19

> Projet Deep Learning, création d'une application web qui devra contenir des pages analytiques et une page permettant d’utiliser le ou les modèles entraînés. Le but étant de faire des prédictions sur les résultats des prochains Jeux Olympiques grâce aux jeux de données fourni.

## Authors

- [Tellat Mazine](https://github.com/Mazinete)
- [Florian Alvarez](https://github.com/IsianDreemrr)
- [Antoine Avenia](https://github.com/AntoineAvn)
- [Anthony Stanix](https://www.github.com/StAntho)
- [Carellien Rakotoarisoa](https://github.com/vrakoto)
- [Pascal Kien](https://github.com/pascal-rithi-ke)

## Tech Stack

- [Pyhton](https://www.python.org/)
- [matplotlib](https://matplotlib.org/)
- [pandas](https://pandas.pydata.org/)
- [sklearn](https://scikit-learn.org/)
- [seaborn](https://seaborn.pydata.org/)

## Links

[Github](https://github.com/IsianDreemrr/HackathonGRP19)

[Trello](https://trello.com/b/KPqXSxUh/hackathon-jo)

[Webapp en ligne](https://6659acc8497f3a1d9caaf899--hackathon-jo-19.netlify.app/)

[Server API flask](https://hackathongrp19.onrender.com/)

## Installation

Create .env file with connection parameters:

```js
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
```

### Génération des modèle pour faire fonctionner la webapp

Il est nécessaire de Run All tous les fichiers .ipynb se trouvant dans le dossier back

```sh
pip install requirements.txt
```

### Back-end

```sh
cd back
python app.py
```

### Front-end

```sh
cd web-app-front
npm install
npm start
```

## Réponses aux questions et analyses de données

- Avec Spark : Notebook/Pascal/traitement_csv-non-utilise.ipynb
  Notebook-Florian/Notebook-Spark.ipynb

- Avec Pandas : Notebook/Antoine/Questions_FILES.ipynb

### Test Deep Learning

- Notebook/Mazine/Prédiction_médailles_pays.ipynb

### Présentation

- Présentation.pdf
