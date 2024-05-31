import Banner from "./components/Banner";
import countries from "../data/contries.json";
import { useState } from "react";
import axios from "axios";
import Header from "./components/Header";

export default function PredictMedals() {
  const [donnees, setDonnees] = useState(countries);
  const [medals, setMedals] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pays = document.getElementById("country").value;
    const year = document.getElementById("OGyear").value;
    try {
      const data = await axios
        .post(`http://localhost:5000/api/olympic_medals/${pays}/${year}`)
        .then((response) => {
          console.log(response.data);
          setMedals(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(donnees);
  return (
    <div>
      <Header />
      <Banner title="PREDICTION DU NOMBRE DE MEDAILLES OLYMPIQUES" />
      <form action="{{ url_for('predict')}}" method="post">
        <div className="left">
          <div className="field">
            <label for="pays">Pays</label>
            <div id="pays">
              <select
                name="pays"
                id="country"
                className="select2-basic"
                required
              >
                {Object.keys(donnees).map((index) => (
                  <option value={index}>{donnees[index]}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="txt-field field">
            <label>Année des jeux</label>
            <div id="pays">
              <input
                type="number"
                id="OGyear"
                name="year"
                min="2024"
                required
              />
              <span></span>
            </div>
          </div>
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            Valider
          </button>
        </div>
      </form>
      {medals !== null && medals["gold"] !== undefined && (
        <table>
          <thead>
            <tr>
              <th className="total_head">JO</th>
              <th className="flag_head">PAYS</th>
              <th className="gold_head">🥇</th>
              <th className="silver_head">🥈</th>
              <th className="bronze_head">🥉</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="rank">{medals["year"]}</td>
              <td className="flag">{donnees[medals["country"]]}</td>
              <td className="gold medal">{medals["gold"].toFixed(0)}</td>
              <td className="silver medal">{medals["silver"].toFixed(0)}</td>
              <td className="bronze medal">{medals["bronze"].toFixed(0)}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
