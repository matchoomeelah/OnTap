import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

function BeerBrowseTile({ beer }) {
    const navigate = useNavigate();

    const sessionUser = useSelector(state => state.session.user);
    const currAvgRating = beer?.check_ins.length > 0 ? parseFloat(beer?.check_ins.reduce((acc, curr) => curr.rating + acc, 0) / beer?.check_ins.length).toFixed(1) : "New";


    return (
        <div className="beer-browse-tile">
            <div className="browse-tile-top-content">
                <img className="browse-tile-image" src={beer.image_url} alt="beer-image" />
                <div className="browse-tile-top-info">
                    <NavLink className="beer-browse-tile-name">{beer.name}</NavLink>
                    <NavLink to={`/breweries/${beer.brewery_id}`} className="beer-browse-tile-brewery">{beer.brewery_name}</NavLink>
                    <div className="beer-browse-tile-style">{beer.style}</div>
                </div>
            </div>
            <div className="beer-browse-tile-description">{beer.description.substring(0, 160)}...</div>
            <div>
                <div id="beer-tile-abv-ibu">
                    <div>
                        ABV {beer.abv}%
                    </div>
                    <div>
                        IBU {beer.ibu}
                    </div>
                    <div>
                        <div><i id="beer-tile-mug" class="fa-solid fa-beer-mug-empty"></i>{currAvgRating}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BeerBrowseTile;
