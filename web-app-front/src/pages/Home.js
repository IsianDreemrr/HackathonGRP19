import { Link } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  return (
    <div id="home">
      <div className="nav">
        <p className="navItem">
          <Link to="/predict-medals">Classement</Link>
        </p>
        <p className="navItem">
          <Link to="/predictions">Prédictions</Link>
        </p>
      </div>
      <img src="Logo_JO_Paris.jpg" alt="Logo" />
      <div className="contains">
        <h1>JO24 Predictions</h1>
        <Link to="/classement">Classement</Link>
        <Link to="/predictions">Prédictions</Link>
      </div>
      <div
        style={{
          top: "14%",
          left: "17%",
        }}
        className="bubble"
      >
        Résumé des
        <br /> Jeux Olympiques
        <br /> de 1896 à 2022
      </div>
      <div
        style={{
          top: "60%",
          left: "69%",
        }}
        className="bubble"
      >
        Découvrez nos prédictions pour les Jeux de Paris
      </div>
    </div>
  );
}
