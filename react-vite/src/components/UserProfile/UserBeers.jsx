import { useNavigate } from "react-router-dom";
import BeerTile from "../Beer/BeerTile"
import OpenModalButton from "../OpenModalButton";
import DeleteBeerModal from "../Modals/DeleteBeerModal";

function UserBeers({ profileUser, sessionUser }) {
    const navigate = useNavigate();

    return (
        <div id="user-beers-container">
            {profileUser?.beers.length === 0 ?
                <div id="no-beers-placeholder">
                    <div id="no-beers-text">No beers created yet!</div>
                </div>
            :
            <div>
                {profileUser?.beers.map(beer => {
                    return (
                        <div key={beer.id}>
                            <BeerTile beer={beer} />
                        </div>
                    )
                })}
            </div>
            }
        </div>
    )
}

export default UserBeers;
