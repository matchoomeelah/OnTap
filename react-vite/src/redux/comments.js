//
// Constants
//
const CREATE_COMMENT = "comments/createComment"

//
// Actions
//
export const actionCreateComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        comment
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

    console.log("There was an error creating your comment")
    return {"errors": data}
}


//
// Reducer
//
export default function commentsReducer(state = {}, action) {
    switch(action.type) {
        case CREATE_COMMENT:
            return { ...state, [action.comment.id]: action.comment };
        default:
            return state;
    }
}
