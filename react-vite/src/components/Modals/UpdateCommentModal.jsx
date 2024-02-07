import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { thunkUpdateComment } from "../../redux/comments";

function UpdateCommentModal({beerId, comment}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    // const sessionUser = useSelector(state => state.session.user);

    const [body, setBody] = useState(comment.body);
    const [bodyCharCount, setBodyCharCount] = useState(body.length);
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

        const newComment = await dispatch(thunkUpdateComment(beerId, comment.check_in_id, comment.id, formData))

        if (newComment.errors) {
            setErrors(newComment.errors);
        }
        else {
            closeModal();
        }
    }

    return (
        <div id="create-comment-modal-container">
            <h1>Update comment</h1>
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
                {/* <div id="body-char-count">{bodyCharCount}/255</div> */}
                <button className='submit-button'>Confirm</button>
            </form>
        </div>
    )
}

export default UpdateCommentModal
