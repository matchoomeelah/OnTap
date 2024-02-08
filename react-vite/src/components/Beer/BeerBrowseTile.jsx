import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteBeerModal from "../Modals/DeleteBeerModal";
import EditDeleteButtons from "./EditDeleteButtons/EditDeleteButtons";

function BeerBrowseTile({ beer }) {
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);
    const currAvgRating = beer?.check_ins.length > 0 ? parseFloat(beer?.check_ins.reduce((acc, curr) => curr.rating + acc, 0) / beer?.check_ins.length).toFixed(1) : "New";

    const [showLongDescription, setShowLongDescription] = useState(false);

    function setDefaultImage() {
        const beerLogo = document.getElementById(`beer-logo${beer.id}`);
        beerLogo.src = "https://i.ibb.co/qChdf5n/default-beer.jpg";
    }

    return (
        <div className="beer-browse-tile">
            <div className="browse-tile-top-content">
                <img id={`beer-logo${beer.id}`}className="browse-tile-image" src={beer.image_url} alt="beer-image" onError={setDefaultImage}/>
                <div className="browse-tile-top-info">
                    <NavLink to={`/beers/${beer.id}`} className="beer-browse-tile-name">{beer.name}</NavLink>
                    <NavLink to={`/breweries/${beer.brewery_id}`} className="beer-browse-tile-brewery">{beer.brewery_name}</NavLink>
                    <div className="beer-browse-tile-style">{beer.style}</div>
                    {!showLongDescription ?
                        beer.description.length < 180 ?
                            <div className="beer-browse-tile-description">{beer.description}</div>
                            :
                            <div className="beer-browse-tile-description">
                                {beer.description.substring(0, 180) + "..."}
                                <button className="tile-show-more-button" onClick={() => setShowLongDescription(true)}>Show more</button>
                            </div>
                        :
                        <div className="beer-browse-tile-description">
                            <div>{beer.description}</div>
                            <button className="tile-show-more-button" onClick={() => setShowLongDescription(false)}>Show less</button>
                        </div>
                    }


                </div>
                {beer?.creator_id === sessionUser?.id &&
                        // <div className="beer-buttons">
                        //     <button id="beer-tile-edit" onClick={(e) => navigate(`/beers/${beer.id}/edit`)}>Edit</button>
                        //     <OpenModalButton
                        //         buttonId="beer-tile-delete"
                        //         buttonText={'Delete'}
                        //         modalComponent={<DeleteBeerModal beer={beer} />}
                        //     />
                        // </div>
                        <EditDeleteButtons beer={beer} />
                }
            </div>
            <div>
                <div className="beer-browse-tile-abv-ibu">
                    <div className="beer-browse-bottom-section">
                        {beer.abv}% ABV
                    </div>
                    <div className="beer-browse-tile-vertical-line"></div>
                    <div className="beer-browse-bottom-section">
                        {beer.ibu} IBU
                    </div>
                    <div className="beer-browse-tile-vertical-line"></div>
                    <div className="beer-browse-bottom-section">
                        <i id="beer-tile-mug" class="fa-solid fa-beer-mug-empty"></i>{currAvgRating}
                    </div>
                    <div className="beer-browse-tile-vertical-line"></div>
                    <div className="beer-browse-bottom-section">
                        {beer.check_ins.length} {beer.check_ins.length === 1 ? "Rating" : "Ratings"}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BeerBrowseTile;
