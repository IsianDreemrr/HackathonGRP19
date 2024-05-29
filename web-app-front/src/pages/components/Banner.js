// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/js/bootstrap.bundle'
import '../../styles/Banner.css'

export default function Banner({title}) {
	return (
        <div className="banner">
            <h1>{title}</h1>
            <input type="text" className="ms-3 bannerSearch" name="searchingPlayer" placeholder="Rechercher un joueur..." />
        </div>
	);
}