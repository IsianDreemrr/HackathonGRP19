import { useEffect, useState } from "react";
import axios from "axios";

export default function Predictions() {
  const [backendData, setBackendData] = useState([]);

  // axios
  //   .get("http://localhost:5000/api/data")
  //   .then((response) => {
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     console.error("Erreur :", error);
  //   });

  useEffect(() => {
    const list = async () => {
      const response = await axios.get("http://localhost:5000/api/data");
      setBackendData(response.data);
    };
    list();
  }, []);
  console.log(backendData);
  //   async function fetchData() {
  //     try {
  //       const response = await fetch("http://localhost:5000/api/data");
  //       if (!response.ok) {
  //         throw new Error("Erreur lors de la récupération des données");
  //       }
  //       const data = await response.json();
  //       console.log("Données récupérées :", data);
  //       // Utilisez les données dans votre application
  //     } catch (error) {
  //       console.error("Erreur :", error);
  //     }
  //   }

  return (
    <>
      <h1>Predictions</h1>
      <div>
        <button>fdf</button>
      </div>
    </>
  );
}
