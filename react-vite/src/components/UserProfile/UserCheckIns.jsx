import { useNavigate } from "react-router-dom";
import CheckInTile from "../CheckIn/CheckInTile";
// import DeleteCheckInModal from "../Modals/DeleteCheckInModal"
// import OpenModalButton from "../OpenModalButton";

function UserCheckIns({ profileUser, checkIns }) {
    const navigate = useNavigate();

    return (
        <div>
            {Object.values(checkIns).length === 0 ?
                <div id="no-check-ins-placeholder">
                    <div id="no-check-ins-text">Hmm, no activity here. Time to drink up!</div>
                </div> :
                Object.values(checkIns).toReversed().map(checkIn => {
                    return (
                        <div key={checkIn.id}>
                            <CheckInTile checkIn={checkIn} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default UserCheckIns;
