import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteCheckIn } from "../../redux/checkIns";

function CheckInModal({checkIn}) {
    const {closeModal} = useModal()
    const dispatch = useDispatch();

    const submitDelete = async () => {
        try {
            // console.log("Brewery ID: ", brewery.id)
            await dispatch(thunkDeleteCheckIn(checkIn.beer.id, checkIn.id));
            closeModal();
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div id='delete-modal-container'>
            <h1 id='confirm-delete-heading'>Confirm Delete</h1>
            <div id="confirm-delete-phrase">Are you sure you want to delete this check in?</div>
            <div id="confirm-delete-buttons">
                <button id='yes-button' onClick={submitDelete}>Yes (Delete Check In)</button>
                <button id='no-button' onClick={closeModal}>No (Keep Check In)</button>
            </div>
        </div>
    )
}

export default CheckInModal;
