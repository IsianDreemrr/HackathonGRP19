import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from './components/Banner';
import '../styles/Table.css';
import '../styles/Classement.css';
import Header from './components/Header';

// Les Pays
function App() {
    const [lesPays, setLesPays] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [animation, setAnimation] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchLesPays();
    }, []);

    const fetchLesPays = async () => {
        try {
            // const response = await fetch("https://hackathongrp19.onrender.com/api/olympic_medals/top25/api/classement_pays");
            const response = await fetch("http://localhost:5000/api/classement_pays");
            const data = await response.json();
            setLesPays(data);
        } catch (error) {
            console.error("Erreur lors de la récupération du classement des pays :", error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchInput(event.target.value);
    };

    const filteredCountries = lesPays.filter(country =>
        country.country_name.toLowerCase().includes(searchInput.toLowerCase())
    );

    const checkCountry = (code) => {
        setAnimation(true)
        setTimeout(() => {
            navigate(`/pays/${code}`)
        }, 1000);
    }

    return (
        <>
            <Header />
            <div className={animation ? 'container switchPage' : 'container'}>
                <Banner title="Les Pays" onSearchChange={handleSearchChange} />
                <table animation={animation} setAnimation={setAnimation}>
                    <thead>
                        <tr>
                            <th className="rank_head">RANG</th>
                            <th className="flag_head">PAYS</th>
                            <th className="gold_head">🥇</th>
                            <th className="silver_head">🥈</th>
                            <th className="bronze_head">🥉</th>
                            <th className="total_head">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCountries.map((country, index) => (
                            <tr key={index} className="row" onClick={() => checkCountry(country.country_code)}>
                                <td className="rank">{index+1}</td>
                                <td className="flag">{country.country_name}</td>
                                <td className="gold medal">{country.gold_medals}</td>
                                <td className="silver medal">{country.silver_medals}</td>
                                <td className="bronze medal">{country.bronze_medals}</td>
                                <td className="total" style={{textAlign: "center"}}>{country.total_medals}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default App;