import React from 'react';
import Banner from './components/Banner';
import '../styles/Table.css'

// Les Pays
function App() {
    const countries = [
		{ rank: 1, country: 'United States of America', flag: '🇺🇸', gold: 46, silver: 37, bronze: 38, total: 121 },
		{ rank: 2, country: 'United Kingdom', flag: '🇬🇧', gold: 27, silver: 23, bronze: 17, total: 67 },
		{ rank: 3, country: 'China', flag: '🇨🇳', gold: 26, silver: 18, bronze: 26, total: 70 },
		{ rank: 4, country: 'Russia', flag: '🇷🇺', gold: 19, silver: 17, bronze: 20, total: 56 },
		{ rank: 5, country: 'Germany', flag: '🇩🇪', gold: 17, silver: 10, bronze: 15, total: 42 },
		{ rank: 6, country: 'Japan', flag: '🇯🇵', gold: 12, silver: 8, bronze: 21, total: 41 },
		{ rank: 7, country: 'France', flag: '🇫🇷', gold: 10, silver: 18, bronze: 14, total: 42 },
		{ rank: 8, country: 'South Korea', flag: '🇰🇷', gold: 9, silver: 3, bronze: 9, total: 21 },
		{ rank: 9, country: 'Italy', flag: '🇮🇹', gold: 8, silver: 12, bronze: 8, total: 28 },
		{ rank: 10, country: 'Australia', flag: '🇦🇺', gold: 8, silver: 11, bronze: 10, total: 29 },
	];
    return (
        <div className="container">
            <Banner title="Les Pays" />
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
                    {countries.map((country, index) => (
                        <tr key={index}>
                            <td className="rank">{country.rank}</td>
                            <td className="flag">{country.flag} {country.country}</td>
                            <td className="gold medal">{country.gold}</td>
                            <td className="silver medal">{country.silver}</td>
                            <td className="bronze medal">{country.bronze}</td>
                            <td className="total">{country.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;