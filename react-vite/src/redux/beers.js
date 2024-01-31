//
// Constants
//
// const CREATE_BEER = "beers/createBeer"
const GET_BEERS = "beers/getBeers"
const GET_BEER_BY_ID = "beers/getBeerById"


//
// Actions
//
export const actionGetBeers = (beers) => {
    return {
        type: GET_BEERS,
        beers
    }
}

export const actionGetBeerById = (beer) => {
    return {
        type: GET_BEER_BY_ID,
        beer
    }
}


//
// Thunks
//
export const thunkGetBeers = () => async (dispatch) => {
    // Get Response
    const response = await fetch(`/api/beers`);

    // Extract the data
    const data = await response.json();

    // Send to reducer or report error
    if (response.ok) {
        dispatch(actionGetBeers(data.Beers));
    }
    else {
        console.log("Something went wrong getting all Beers")
    }

    return data;
}


export const thunkGetBeerById = (id) => async (dispatch) => {
    // Get Response
    const response = await fetch(`/api/beers/${id}`);

    // Extract the data
    const data = await response.json();

    // Send to reducer or report error
    if (response.ok) {
        dispatch(actionGetBeerById(data.Beer));
    }
    else {
        console.log("Something went wrong getting a specific Beer")
    }

    return data;
}




//
// Reducer
//

export default function beersReducer(state = {}, action) {
    switch (action.type) {
        case GET_BEERS: {
            const newBeers = {};
            action.beers.forEach(beer => {
                newBeers[beer.id] = beer;
            });
            return newBeers;
        }
        case GET_BEER_BY_ID: {
            const newBeers = {}
            newBeers[action.beer.id] = action.beer
            return newBeers;
        }
        default:
            return state
    }
}
