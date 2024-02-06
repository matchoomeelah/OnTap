import { NavLink } from "react-router-dom";
import "./Comment.css"

function CommentTile({comment}) {
    return (
        <div className="comment-tile-container">
            <NavLink to={`/users/${comment.user_id}`}>{comment.user.first_name} {comment.user.last_name}</NavLink>
            <div>{comment.body}</div>
        </div>
    )
}

export default CommentTile;
