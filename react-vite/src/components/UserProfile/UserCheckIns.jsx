import { useNavigate } from "react-router-dom";
import CheckInTile from "../CheckIn/CheckInTile";
import DeleteCheckInModal from "../Modals/DeleteCheckInModal"
import OpenModalButton from "../OpenModalButton";

function UserCheckIns({checkIns}) {
    const navigate = useNavigate();

    console.log(checkIns)

    return (
        <div>
            {Object.values(checkIns).toReversed().map(checkIn => {
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
