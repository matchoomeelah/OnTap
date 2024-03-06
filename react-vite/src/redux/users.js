//
// Constants
//
const GET_USER_BY_ID = "users/getUserById";
const UPDATE_USER = "users/updateUser"
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

export const actionUpdateUser= (user) => {
    return {
        type: UPDATE_USER,
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
    return {errors: data};
}

export const thunkUpdateUser = (user, id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        body: user
    });

    const data = await response.json();

    if (response.ok) {
        dispatch(actionUpdateUser(data));
        return data;
    }

    return {errors: data.errors};
}


//
// Reducer
//

export default function usersReducer(state = {}, action) {
    switch(action.type) {
        case GET_USER_BY_ID: {
            return {...state, otherUsers: {...state.otherUsers}, profileUser: {...action.user} }
        }
        case UPDATE_USER: {
            return {...state, otherUsers: {...state.otherUsers}, profileUser: {...action.user} }
        }
        case CLEAR_USER: {
            return {};
        }
        default:
            return state;
    }
}
