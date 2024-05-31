import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';

const ClassementPaysSport = () => {
    const [sport, setSport] = useState('');
    const [classement, setClassement] = useState([]);
    const [disciplines, setDisciplines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [debounceTimeout, setDebounceTimeout] = useState(null);

    useEffect(() => {
        const fetchDisciplines = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/all_disciplines');
                setDisciplines(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des disciplines :', error);
            }
        };

        fetchDisciplines();
    }, []);

    const fetchClassement = async (selectedSport) => {
        setLoading(true);
        if (selectedSport) {
            try {
                const response = await axios.post('http://localhost:5000/api/classement_pays_sport', { sport: selectedSport });
                setClassement(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        }
        setLoading(false);
    };

    const sendSportToBackend = async () => {
        try {
            await axios.get(`http://localhost:5000/api/get-sport?sport=${sport}`);
            console.log('Sport envoyé avec succès !');
        } catch (error) {
            console.error('Erreur lors de l\'envoi du sport :', error);
        }
    };

    useEffect(() => {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const newTimeout = setTimeout(() => {
            fetchClassement(sport);
            sendSportToBackend(); // Appel de la fonction pour envoyer le sport sélectionné
        }, 500);

        setDebounceTimeout(newTimeout);

        return () => clearTimeout(newTimeout);
    }, [sport]);

    return (
        <>
            <Header />
            <div style={{ textAlign: 'center' }}>
                <h1>Classement Top 10 des pays pour un sport spécifique</h1>
                <select value={sport} onChange={(e) => setSport(e.target.value)} style={{height: '30px', width: '200px'}}>
                    <option value="" disabled>Choisissez un sport</option>
                    {disciplines.map((discipline) => (
                        <option key={discipline.discipline_title} value={discipline.discipline_title}>
                            {discipline.discipline_title}
                        </option>
                    ))}
                </select>

                {loading && <p>Chargement...</p>}

                {!loading && classement.length > 0 && (
                    <table style={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
                        <thead>
                            <tr>
                                <th>Pays</th>
                                <th>Code</th>
                                <th>Code 3 lettres</th>
                                <th>Total Médailles</th>
                                <th>Médailles d'Or</th>
                                <th>Médailles d'Argent</th>
                                <th>Médailles de Bronze</th>
                                <th>Rang</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classement.map((pays, index) => (
                                <tr key={pays.country_code}>
                                    <td>{pays.country_name}</td>
                                    <td>{pays.country_code}</td>
                                    <td>{pays.country_3_letter_code}</td>
                                    <td>{pays.total_medals}</td>
                                    <td>{pays.gold_medals}</td>
                                    <td>{pays.silver_medals}</td>
                                    <td>{pays.bronze_medals}</td>
                                    <td>{index + 1}</td> {/* Position starts from 1 */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default ClassementPaysSport;