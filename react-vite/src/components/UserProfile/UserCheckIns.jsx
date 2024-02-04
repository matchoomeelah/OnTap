import { useNavigate } from "react-router-dom";
import CheckInTile from "../CheckIn/CheckInTile";
import DeleteCheckInModal from "../Modals/DeleteCheckInModal"
import OpenModalButton from "../OpenModalButton";

function UserCheckIns({profileUser, checkIns}) {
    const navigate = useNavigate();

    return (
        <div>
            {profileUser?.check_ins.reverse().map(checkIn => {
                return (
                    <div key={checkIn.id}>
                        <CheckInTile checkIn={checkIn} />
                    </div>
                )
            })}
        </div>
    )
}

export default UserCheckIns;
