import React, { useState, useEffect } from 'react';
import '../styles/Table.css';
import Banner from './components/Banner';
import Header from './components/Header';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOlympicMedals();
  }, []);

  const fetchOlympicMedals = async () => {
    try {
      const response = await fetch('https://hackathongrp19.onrender.com/api/olympic_medals/top25');
      // const response = await fetch('http://127.0.0.1:5000/api/olympic_medals/top25');
      const data = await response.json();
      // Transform data to include flag and calculate total
      const transformedData = data.map((country) => ({
        country: country.country,
        flag: getFlagEmoji(country.country),
        gold: country.gold,
        silver: country.silver,
        bronze: country.bronze,
        total: country.gold + country.silver + country.bronze
      }));
      // Sort by total medals and assign ranks
      transformedData.sort((a, b) => b.total - a.total);
      transformedData.forEach((country, index) => {
        country.rank = index + 1;
      });
      setCountries(transformedData);
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };

  const getFlagEmoji = (country) => {
    const flags = {
      'Australia': '🇦🇺',
      'Belgium': '🇧🇪',
      'Brazil': '🇧🇷',
      'Bulgaria': '🇧🇬',
      'Canada': '🇨🇦',
      'Cuba': '🇨🇺',
      'Denmark': '🇩🇰',
      'Finland': '🇫🇮',
      'France': '🇫🇷',
      'Germany': '🇩🇪',
      'Great Britain': '🇬🇧',
      'Hungary': '🇭🇺',
      'Italy': '🇮🇹',
      'Japan': '🇯🇵',
      'Netherlands': '🇳🇱',
      'Norway': '🇳🇴',
      'People\'s Republic of China': '🇨🇳',
      'Poland': '🇵🇱',
      'Republic of Korea': '🇰🇷',
      'Romania': '🇷🇴',
      'Spain': '🇪🇸',
      'Sweden': '🇸🇪',
      'Switzerland': '🇨🇭',
      'United States of America': '🇺🇸'
    };
    return flags[country] || '🏳️';
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter(country =>
    country.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="container">
        <Banner title="MEDAILLES OLYMPIQUES" onSearchChange={handleSearchChange} />
        <table>
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
              <tr key={index}>
                <td className="rank">{country.rank}</td>
                <td className="flag">{country.flag} {country.country}</td>
                <td className="gold medal">{country.gold.toFixed(0)}</td>
                <td className="silver medal">{country.silver.toFixed(0)}</td>
                <td className="bronze medal">{country.bronze.toFixed(0)}</td>
                <td className="total">{country.total.toFixed(0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
