//
// Constants
//
const CREATE_BEER = "beers/createBeer"
const GET_BEERS = "beers/getBeers"
const GET_BEER_BY_ID = "beers/getBeerById"


//
// Actions
//
export const actionCreateBeer = (beer) => {
    return {
        type: CREATE_BEER,
        beer
    }
}

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

export const thunkCreateBeer = (beer) => async (dispatch) => {
    // Get Response
    const response = await fetch(`/api/beers`, {
        method: "POST",
        body: beer
    })
    console.log("IM IN THE THUNK")

    const data = await response.json();
    console.log(data);

    // Extract the data
    if (response.ok) {
        dispatch(actionCreateBeer(data))
    }
    else {
        console.log("There was an error creating your beer");
    }

    return data;
}

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
        case CREATE_BEER: {
            return { ...state, [action.beer.id]: action.beer };
        }
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
