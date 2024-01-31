import { useNavigate } from "react-router-dom";

function BeerTile({ beer }) {
    const navigate = useNavigate();

    return (
        <div className="beer-tile" onClick={() => navigate(`/beers/${beer.id}`)}>
            <img className="beer-tile-image" src={beer.image_url} alt="Beer Image"/>
            <div className="beer-tile-info">
                <p>{beer.name}</p>
                <p>{beer.style}</p>
                <p>ABV {beer.abv}%    IBU {beer.ibu}</p>
            </div>
        </div>
    )
}

export default BeerTile;
