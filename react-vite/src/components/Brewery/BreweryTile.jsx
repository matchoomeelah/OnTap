import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteBreweryModal from "../Modals/DeleteBreweryModal";

function BreweryTile({ brewery }) {
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className="brewery-tile" onClick={() => navigate(`/breweries/${brewery.id}`)}>
            <img className="brewery-tile-image" src={brewery.image_url} alt="brewery Image" />
            <div className="brewery-tile-info">
                {/* <div> */}
                    <div id="brewery-tile-name">{brewery.name}</div>
                    <div id="city-state-country">{brewery.city}, {brewery.state_province}, {brewery.country}</div>
                {/* </div> */}
                <div id="brewery-buttons-container">
                    {brewery?.creator_id === sessionUser?.id &&
                        <div className="brewery-buttons">
                            <button id="brewery-tile-edit" onClick={(e) => { e.stopPropagation(); navigate(`/breweries/${brewery.id}/edit`) }}>Edit</button>
                            <OpenModalButton
                                onButtonClick={(e) => e.stopPropagation()}
                                buttonId="brewery-tile-delete"
                                buttonText={'Delete'}
                                modalComponent={<DeleteBreweryModal brewery={brewery} />}
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default BreweryTile;
