import React, { useEffect, useState } from 'react';
import Banner from './components/Banner';
import '../styles/Table.css';
import '../styles/Classement.css';

// Les Pays
function App() {
    const [lePays, setLePays] = useState([]);
    const idPays = window.location.pathname.split('/pays/')[1];

    useEffect(() => {
        getLePays()
    }, [])

    const getLePays = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/pays/");
            const data = await response.json();
            setLePays(data);
            console.log(data);
        } catch (error) {
            console.error("Erreur lors de la récupération du classement des pays :", error);
        }
    }

    return (
        <div className="container">
            {/* <Banner title={pays} onSearchChange={handleSearchChange} /> */}
            <h1>{idPays}</h1>
        </div>
    );
}

export default App;