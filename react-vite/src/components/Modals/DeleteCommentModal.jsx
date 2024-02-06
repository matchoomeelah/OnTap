import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteComment } from "../../redux/comments";

function DeleteCommentModal({beerId, comment}) {
    const {closeModal} = useModal()
    const dispatch = useDispatch();

    const submitDelete = async () => {
        try {
            await dispatch(thunkDeleteComment(beerId, comment.check_in_id, comment.id));
            closeModal();
        }
        catch (e) {
            return e;
        }
    }

    return (
        <div id='delete-modal-container'>
            <h1 id='confirm-delete-heading'>Confirm Delete</h1>
            <div id="confirm-delete-phrase">Are you sure you want to delete this comment?</div>
            <div id="confirm-delete-buttons">
                <button id='yes-button' onClick={submitDelete}>Yes (Delete Comment)</button>
                <button id='no-button' onClick={closeModal}>No (Keep Comment)</button>
            </div>
        </div>
    )
}

export default DeleteCommentModal;
