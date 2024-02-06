import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteBeer } from "../../redux/beers";

function DeleteBeerModal({ beer }) {
    const { closeModal } = useModal()
    const dispatch = useDispatch();


    const submitDelete = async () => {
        try {
            console.log("Beer ID: ", beer.id)
            await dispatch(thunkDeleteBeer(beer.id));
            closeModal();
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div id='delete-modal-container'>
            <h1 id='confirm-delete-heading'>Confirm Delete</h1>
            <div id="confirm-delete-phrase">Are you sure you want to delete this Beer?</div>
            <div id="confirm-delete-buttons">
                <button id='yes-button' onClick={submitDelete}>Yes (Delete Beer)</button>
                <button id='no-button' onClick={closeModal}>No (Keep Beer)</button>
            </div>
        </div>
    )

}

export default DeleteBeerModal;
