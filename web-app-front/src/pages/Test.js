import { useState, useEffect } from "react";

export default function Test() {
  const [olympicHosts, setOlympicHosts] = useState([]);

  useEffect(() => {
    fetchOlympicHosts();
  }, []);

  const fetchOlympicHosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/olympic_hosts");
      const data = await response.json();
      setOlympicHosts(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  return (
    <div id="home">
      {olympicHosts.length > 0 && (
        <div>
          <h2>Hôtes olympiques :</h2>
          <ul>
            {olympicHosts.map((host) => (
              <li key={host.id}>{host.game_name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
