//
// Constants
//
const GET_USER_BY_ID = "users/getUserById";
const CLEAR_USER = "users/clearUser"


//
// Actions
//
export const actionGetUserById = (user) => {
    return {
        type: GET_USER_BY_ID,
        user
    }
}

export const actionClearUser = () => {
    return {
        type: CLEAR_USER
    }
}


//
// Thunks
//
export const thunkGetUserById = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}`);

    const data = await response.json();

    if (response.ok) {
        dispatch(actionGetUserById(data));
        return data;
    }

    // console.log("There was an error getting user")
    return {"errors": data};
}


//
// Reducer
//

export default function usersReducer(state = {}, action) {
    switch(action.type) {
        case GET_USER_BY_ID: {
            return {...state, otherUsers: {...state.otherUsers}, profileUser: {...action.user} }
        }
        case CLEAR_USER: {
            return {};
        }
        default:
            return state;
    }
}
