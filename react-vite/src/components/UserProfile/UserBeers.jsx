import { useNavigate } from "react-router-dom";
import BeerTile from "../Beer/BeerTile"
import OpenModalButton from "../OpenModalButton";
import DeleteBeerModal from "../Modals/DeleteBeerModal";

function UserBeers({ profileUser, sessionUser }) {
    const navigate = useNavigate();

    console.log(profileUser);

    return (
        <div id="user-beers-container">
            <div>
                {profileUser?.beers.map(beer => {
                    return (
                        <div key={beer.id}>
                            <BeerTile beer={beer} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default UserBeers;
