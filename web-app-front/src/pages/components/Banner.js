import '../../styles/Banner.css';

export default function Banner({ title, onSearchChange }) {
    return (
        <div className="banner">
            <h1>{title}</h1>
            <input
                type="text"
                className="bannerSearch"
                name="bannerSearch"
                placeholder="Rechercher..."
                onChange={onSearchChange}
            />
        </div>
    );
}