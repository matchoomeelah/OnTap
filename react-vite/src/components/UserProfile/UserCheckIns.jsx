import { useNavigate } from "react-router-dom";
import CheckInTile from "../CheckIn/CheckInTile";
import DeleteCheckInModal from "../Modals/DeleteCheckInModal"
import OpenModalButton from "../OpenModalButton";

function UserCheckIns({profileUser, sessionUser}) {
    const navigate = useNavigate();

    return (
        <div>
            {/* {profileUser?.id === sessionUser?.id && <button onClick={() => navigate(`/beers/new`)}>Create New Beer</button>} */}
            {profileUser?.check_ins.map(checkIn => {
                return (
                    <div key={checkIn.id}>
                        <CheckInTile checkIn={checkIn} />
                        {profileUser.id === sessionUser.id &&
                            <div className="check-in-buttons">
                                <OpenModalButton
                                    buttonText={'Delete'}
                                    modalComponent={<DeleteCheckInModal checkIn={checkIn} />}
                                />
                            </div>
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default UserCheckIns;
