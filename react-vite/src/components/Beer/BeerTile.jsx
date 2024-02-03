import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteBeerModal from "../Modals/DeleteBeerModal";

function BeerTile({ beer }) {
    const navigate = useNavigate();

    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className="beer-tile">
            <img className="beer-tile-image" src={beer.image_url} alt="Beer Image" />
            <div className="beer-tile-info">
                <div>
                    <div id="beer-tile-name">{beer.name}</div>
                    <div id="beer-tile-style">{beer.style}</div>
                </div>
                <div id="beer-tile-abv-ibu">
                    <div>
                        ABV {beer.abv}%
                    </div>
                    <div>
                        IBU {beer.ibu}
                    </div>
                </div>
            </div>
            {/* {beer?.creator_id === sessionUser?.id &&
                <div className="beer-buttons">
                    <OpenModalButton
                        buttonText={'Delete'}
                        modalComponent={<DeleteBeerModal beer={beer} />}
                    />
                    <button onClick={(e) => {e.stopPropagation();navigate(`/beers/${beer.id}/edit`)}}>Edit</button>
                </div>
            } */}
            {/* <button onClick={() => navigate(`/beers/${beer.id}`)}>View Details</button> */}

        </div>
    )
}

export default BeerTile;
