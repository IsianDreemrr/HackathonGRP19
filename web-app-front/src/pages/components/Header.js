import { Link } from "react-router-dom";
import '../../styles/global.css';

export default function Header() {
    return (
        <div className="nav">
            <p className="navItem">
                <Link to="/">Accueil</Link>
            </p>
            <p className="navItem">
                <Link to="/predict-medals">Prédictions Médailles</Link>
            </p>
            <p className="navItem">
                <Link to="/predictions">Prédictions</Link>
            </p>
            <p className="navItem">
                <Link to="/prediction-pays-sport">Classement sports spécifiques</Link>
            </p>
        </div>
    )
}