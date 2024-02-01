import { useNavigate } from "react-router-dom";
import BeerTile from "../Beer/BeerTile"
import OpenModalButton from "../OpenModalButton";
import DeleteBeerModal from "../Modals/DeleteBeerModal";

function UserBeers({profileUser, sessionUser}) {
    const navigate = useNavigate();

    console.log(profileUser);

    return (
        <div>
            {profileUser?.id === sessionUser?.id && <button onClick={() => navigate(`/beers/new`)}>Create New Beer</button>}
            {profileUser?.beers.map(beer => {
                return (
                    <div key={beer.id}>
                        <BeerTile beer={beer} />
                        {profileUser.id === sessionUser.id &&
                            <div className="beer-buttons">
                                <OpenModalButton
                                    buttonText={'Delete'}
                                    modalComponent={<DeleteBeerModal beer={beer} />}
                                />
                                <button onClick={() => navigate(`/beers/${beer.id}/edit`, { state: {value: beer.brewery_id, label: beer.name}})}>Edit</button>
                            </div>
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default UserBeers;
