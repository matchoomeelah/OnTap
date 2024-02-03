import { useNavigate } from "react-router-dom";
import BreweryTile from "../Brewery/BreweryTile";
import OpenModalButton from "../OpenModalButton";
import DeleteBreweryModal from "../Modals/DeleteBreweryModal";

function UserBreweries({profileUser, sessionUser}) {
    const navigate = useNavigate();

    return (
        <div>
            {/* {profileUser?.id === sessionUser?.id && <button onClick={() => navigate(`/breweries/new`)}>Create New Brewery</button>} */}
            {profileUser?.breweries.map(brewery => {
                return (
                    <div key={brewery.id}>
                        <BreweryTile brewery={brewery} />
                    </div>
                )
            })}
        </div>
    )
}

export default UserBreweries;
