import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteBeerModal from "../Modals/DeleteBeerModal";

function BeerTile({ beer }) {
    const navigate = useNavigate();

    const sessionUser = useSelector(state => state.session.user);
    // const currAvgRating = beer?.check_ins.length > 0 ? beer?.check_ins.reduce((acc, curr) => curr.rating + acc, 0) / beer?.check_ins.length : "New";
    const currAvgRating = beer?.check_ins.length > 0 ? parseFloat(beer?.check_ins.reduce((acc, curr) => curr.rating + acc, 0) / beer?.check_ins.length).toFixed(1) : "New";


    return (
        <div className="beer-tile" onClick={() => navigate(`/beers/${beer.id}`)}>
            <img className="beer-tile-image" src={beer.image_url} alt="Beer Image" />
            <div className="beer-tile-info">
                <div>
                    <div id="beer-tile-name">{beer.name}</div>
                    <div id="beer-tile-style">{beer.style}</div>
                </div>
                <div>
                    <div id="bottom-tile-container">
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
                        {beer?.creator_id === sessionUser?.id &&
                            <div className="beer-buttons">
                                <button id="beer-tile-edit" onClick={(e) => { e.stopPropagation(); navigate(`/beers/${beer.id}/edit`) }}>Edit</button>
                                <OpenModalButton
                                    buttonId="beer-tile-delete"
                                    buttonText={'Delete'}
                                    modalComponent={<DeleteBeerModal beer={beer} />}
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BeerTile;
