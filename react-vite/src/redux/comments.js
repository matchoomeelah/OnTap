//
// Constants
//
const CREATE_COMMENT = "comments/createComment"
const UPDATE_COMMENT = "comments/updateComment"
const DELETE_COMMENT = "comments/deleteComment"

//
// Actions
//
export const actionCreateComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        comment
    }
}

export const actionUpdateComment = (comment) => {
    return {
        type: UPDATE_COMMENT,
        comment
    }
}

export const actionDeleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}

//
// Thunks
//
export const thunkCreateComment = (beerId, checkInId, comment) => async (dispatch) => {
    const response = await fetch(`/api/beers/${beerId}/check-ins/${checkInId}/comments`, {
        method: "POST",
        body: comment
    });

    const data = await response.json();

    if (response.ok) {
        dispatch(actionCreateComment(data))
        return data;
    }

    // console.log("There was an error creating your comment")
    return {errors: data}
}

export const thunkUpdateComment = (beerId, checkInId, commentId, comment) => async (dispatch) => {
    const response = await fetch(`/api/beers/${beerId}/check-ins/${checkInId}/comments/${commentId}`, {
        method: "PUT",
        body: comment
    });

    const data = await response.json();

    if (response.ok) {
        dispatch(actionUpdateComment(data))
        return data;
    }

    // console.log("There was an error updating your comment")
    return {errors: data}
}

export const thunkDeleteComment = (beerId, checkInId, commentId) => async (dispatch) => {
    const response = await fetch(`/api/beers/${beerId}/check-ins/${checkInId}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    // Extract data
    const data = await response.json();

    //Send to reducer
    if (response.ok) {
        dispatch(actionDeleteComment(commentId));
        return data;
    }

    // console.log("There was an error deleting the comment")
    return {errors: data};
}

//
// Reducer
//
export default function commentsReducer(state = {}, action) {
    switch(action.type) {
        case CREATE_COMMENT: {
            return { ...state, [action.comment.id]: action.comment };
        }
        case UPDATE_COMMENT: {
            const newComments = {...state};
            newComments[action.comment.id] = action.comment;
            return newComments;
        }
        case DELETE_COMMENT: {
            const newComments = {...state};
            delete newComments[action.commentId];
            return newComments;
        }
        default:
            return state;
    }
}
