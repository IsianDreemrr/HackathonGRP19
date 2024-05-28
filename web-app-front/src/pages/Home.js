import { Link } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  return (
    <div id="home">
      <div className="nav">
        <p className="navItem">
          <Link to="/rank">Classement</Link>
        </p>
        <p className="navItem">
          <Link to="/predictions">Prédictions</Link>
        </p>
      </div>
      <img src="Logo_JO_Paris.jpg" alt="Logo" />
      <div className="contains">
        <h1>JO24 Predictions</h1>
        <Link to="/rank">Découvrir</Link>
      </div>
      <div
        style={{
          top: "14%",
          left: "17%",
        }}
        className="bubble"
      >
        Résumes des
        <br /> Jeux Olypiques
        <br /> de 1896 à 2021
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
