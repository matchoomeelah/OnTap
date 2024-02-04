//
// Constants
//
const CREATE_CHECK_IN = "checkIns/createCheckIn"
const GET_USER_CHECK_INS = "checkIns/getUserCheckIns"
const GET_BEER_CHECK_INS = "checkIns/getBeerCheckIns"

//
// Actions
//
export const actionCreateCheckIn = (checkIn) => {
    return {
        type: CREATE_CHECK_IN,
        checkIn
    }
}

export const actionGetUserCheckIns = (checkIns) => {
    return {
        type: GET_USER_CHECK_INS,
        checkIns
    }
}

export const actionGetBeerCheckIns = (checkIns) => {
    return {
        type: GET_BEER_CHECK_INS,
        checkIns
    }
}


//
// Thunks
//
export const thunkCreateCheckIn = (beerId, checkIn) => async (dispatch) => {
    console.log("in the thunk");
    const response = await fetch(`/api/beers/${beerId}/check-ins`, {
        method: "POST",
        body: checkIn
    });

    const data = await response.json();
    console.log("DATA: ", data)

    if (response.ok) {
        dispatch(actionCreateCheckIn(data));
        return data;
    }

    console.log("There was an error creating your check in");
    return {"errors": data};

}

export const thunkGetUserCheckIns = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/check-ins`);

    const data = await response.json();
    console.log("DATA: ", data)

    if (response.ok) {
        dispatch(actionGetUserCheckIns(data));
        return data;
    }

    console.log("There was an error getting user check ins");
    return {"errors": data};

}

export const thunkBeerCheckIns = async (beerId) => {
    const response = await fetch(`/api/beers/${beerId}/check-ins`);

    const data = await response.json();
    console.log("DATA: ", data)

    if (response.ok) {
        dispatch(actionGetBeerCheckIns(data));
        return data;
    }

    console.log("There was an error getting user check ins");
    return {"errors": data};

}


//
// Reducer
//

export default function checkInsReducer(state = {}, action) {
    switch(action.type) {
        case CREATE_CHECK_IN:
            return { ...state, [action.checkIn.id]: action.checkIn };
        case GET_USER_CHECK_INS:
            const newCheckIns = {};
            Object.values(action.checkIns).forEach(checkIn => {
                newCheckIns[checkIn.id] = checkIn
            });
            return newCheckIns;
        default:
            return state;
    }
}
