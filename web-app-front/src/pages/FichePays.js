import React, { useEffect, useState } from 'react';
import '../styles/Table.css';
import '../styles/Classement.css';

// Les Pays
function App() {
    const [lePays, setLePays] = useState([]);
    const idPays = window.location.pathname.split('/pays/')[1];

    return (
        <div className="container">
            <h1>{idPays}</h1>
        </div>
    );
}

export default App;