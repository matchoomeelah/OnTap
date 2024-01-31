import { useNavigate } from "react-router-dom";

function BreweryTile({ brewery }) {
    const navigate = useNavigate();

    return (
        <div className="brewery-tile" onClick={() => navigate(`/breweries/${brewery.id}`)}>
            <img className="brewery-tile-image" src={brewery.image_url} alt="Brewery Image"/>
            <div className="brewery-tile-info">
                <p>{brewery.name}</p>
                <p>{brewery.city}, {brewery.state_province}, {brewery.country}</p>
            </div>
        </div>
    )
}

export default BreweryTile;
