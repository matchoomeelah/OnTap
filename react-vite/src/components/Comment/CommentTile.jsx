import { NavLink } from "react-router-dom";
import "./Comment.css"
import { useSelector } from "react-redux";
import EditDeleteButtons from "./EditDeleteButtons/EditDeleteButtons";

function CommentTile({ beerId, comment }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className="comment-tile-container">
            <div className="comment-user-info">
                <div className='comment-profile-picture'>
                    {comment.user.profile_pic ?
                        <img className="comment-custom-profile-pic" src={comment.user.profile_pic} />
                        :
                        <i id="comment-default-profile-pic" className="fas fa-user-circle fa-lg" />
                    }
                </div>
                <NavLink id="comment-username" to={`/users/${comment.user_id}`}>{comment.user.first_name} {comment.user.last_name}</NavLink>
            </div>
            <div>
                <div id="comment-body" >{comment.body}</div>
                {sessionUser?.id === comment.user_id &&
                    <EditDeleteButtons beerId={beerId} comment={comment} />
                }
            </div>
        </div>
    )
}

export default CommentTile;
