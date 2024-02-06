//
// Constants
//
const GET_USER_BY_ID = "users/getUserById";


//
// Actions
//
export const actionGetUserById = (user) => {
    return {
        type: GET_USER_BY_ID,
        user
    }
}


//
// Thunks
//
export const thunkGetUserById = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}`);

    const data = await response.json();
    // console.log("Profile User: ", data );

    if (response.ok) {
        dispatch(actionGetUserById(data));
    }
    else {
        console.log("There was an error getting the user");
    }

    return data;
}


//
// Reducer
//
const initialState = {
    profileUser: {},
    otherUsers: {}
}


export default function usersReducer(state = {}, action) {
    switch(action.type) {
        case GET_USER_BY_ID: {
            return {...state, otherUsers: {...state.otherUsers}, profileUser: {...action.user} }
        }
        default:
            return state;
    }
}
