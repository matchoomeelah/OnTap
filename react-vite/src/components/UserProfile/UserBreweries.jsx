import { useNavigate } from "react-router-dom";
import BreweryTile from "../Brewery/BreweryTile";
import OpenModalButton from "../OpenModalButton";
import DeleteBreweryModal from "../Modals/DeleteBreweryModal";

function UserBreweries({profileUser, sessionUser}) {
    const navigate = useNavigate();

    return (
        <div>
            {profileUser?.breweries.length === 0 ?
                <div id="no-breweries-placeholder">
                    <div id="no-breweries-text">No breweries created yet!</div>
                </div>
            :
            profileUser?.breweries.map(brewery => {
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
