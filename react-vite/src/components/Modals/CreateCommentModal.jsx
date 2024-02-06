import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { thunkCreateComment } from "../../redux/comments";


function CreateCommentModal({ checkIn }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const sessionUser = useSelector(state => state.session.user);

    const [body, setBody] = useState("");
    const [bodyCharCount, setBodyCharCount] = useState(0);
    const [errors, setErrors] = useState({});


    async function handleSubmit(e) {
        e.preventDefault();
        setErrors({});

        const formData = new FormData();
        formData.append("body", body);
        formData.append("user_id", sessionUser.id);
        formData.append("check_in_id", checkIn.id);

        console.log(checkIn.beer.id)

        const newComment = await dispatch(thunkCreateComment(checkIn.beer.id, checkIn.id, formData))

        console.log(newComment);

        if (newComment.errors) {
            setErrors(newComment.errors);
            setImageLoading(false);
        }
        else {
            closeModal();
        }
    }

    return (
        <div id="create-comment-modal-container">
            <h1>Add a comment</h1>
            <form id='comment-form' onSubmit={handleSubmit}>
                <textarea
                    id='comment-body-input'
                    placeholder='Leave your comment here...'
                    value={body}
                    onChange={e => {
                        setBody(e.target.value);
                        setBodyCharCount(e.target.value.length)
                    }}
                    maxLength={255}
                />
                <div id="body-char-count">{bodyCharCount}/255</div>
                <button className='submit-button'>Confirm</button>
            </form>
        </div>
    )
}

export default CreateCommentModal;
