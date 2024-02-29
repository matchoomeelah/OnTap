import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteBrewery } from "../../redux/breweries";
import { useNavigate } from "react-router-dom";

function DeleteBreweryModal({ brewery }) {
    const { closeModal } = useModal()
    const dispatch = useDispatch();
    // const navigate = useNavigate();


    const submitDelete = async () => {
        try {
            await dispatch(thunkDeleteBrewery(brewery.id));
            closeModal();

        }
        catch (e) {
            return e
        }
    }

    return (
        <div id='delete-modal-container'>
            <h1 id='confirm-delete-heading'>Confirm Delete</h1>
            <div id="confirm-delete-phrase">Are you sure you want to delete this brewery and all it's associated beers?</div>
            <div id="confirm-delete-buttons">
                <button id='yes-button' onClick={submitDelete}>Yes (Delete Brewery)</button>
                <button id='no-button' onClick={closeModal}>No (Keep Brewery)</button>
            </div>
        </div>
    )

}

export default DeleteBreweryModal;
