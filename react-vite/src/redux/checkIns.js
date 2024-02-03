//
// Constants
//
const GET_USER_CHECK_INS = "checkIns/getUserCheckIns"
const GET_BEER_CHECK_INS = "checkIns/getBeerCheckIns"

//
// Actions
//
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
export const thunkGetUserCheckIns = async (userId) => {
    const response = await fetch(`/users/${userId}/check-ins`);

    const data = await response.json();
    console.log("DATA: ", data)

    if (response.ok) {
        dispatch(actionGetUserCheckIns(data));
        return data;
    }

    console.log("There was an error getting user check ins");
    return {"errors": data};

}

// export const thunkBeerUserCheckIns = async (beerId) => {
//     const response = await fetch(`/beers/${beerId}/check-ins`);

//     const data = await response.json();
//     console.log("DATA: ", data)

//     if (response.ok) {
//         dispatch(actionGetUserCheckIns(data));
//         return data;
//     }

//     console.log("There was an error getting user check ins");
//     return {"errors": data};

// }


//
// Reducer
//

export default function checkInsReducer(state = {}, action) {
    switch(action.type) {
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
