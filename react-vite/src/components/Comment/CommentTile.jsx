import { NavLink } from "react-router-dom";
import "./Comment.css"
import { useSelector } from "react-redux";
import UpdateCommentModal from "../Modals/UpdateCommentModal";
import DeleteCommentModal from "../Modals/DeleteCommentModal";
import OpenModalButton from "../OpenModalButton";

function CommentTile({ beerId, comment }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className="comment-tile-container">
            <NavLink to={`/users/${comment.user_id}`}>{comment.user.first_name} {comment.user.last_name}</NavLink>
            <div>{comment.body}</div>
            {sessionUser.id === comment.user_id &&
                <div className="comment-edit-delete-buttons">
                    <OpenModalButton
                        buttonId="edit-button"
                        buttonText={'Edit'}
                        modalComponent={<UpdateCommentModal beerId={beerId} comment={comment} />}
                    />
                    <OpenModalButton
                        buttonId="delete-button"
                        buttonText={'Delete'}
                        modalComponent={<DeleteCommentModal beerId={beerId} comment={comment} />}
                    />
                </div>
            }
        </div>
    )
}

export default CommentTile;
