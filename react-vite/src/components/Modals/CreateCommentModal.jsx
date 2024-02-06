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

        if (body.trim().length <= 0) {
            setErrors({ body: "Your comment cannot be blank" })
            return
        }

        const formData = new FormData();
        formData.append("body", body);

        const newComment = await dispatch(thunkCreateComment(checkIn.beer.id, checkIn.id, formData))

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
                        setBodyCharCount(e.target.value.length);
                        if (errors.body) {
                            const newErrors = {...errors};
                            delete newErrors.body;
                            setErrors(newErrors)
                        }
                    }}
                    maxLength={255}
                />
                <div id="error-count-div">
                    <div className="error-container">
                    {errors.body && <span className="error-message">*{errors.body}</span>}
                    </div>
                    <div id="body-char-count">{bodyCharCount}
                        /255
                    </div>
                </div>
                <button className='submit-button'>Confirm</button>
            </form>
        </div>
    )
}

export default CreateCommentModal;
