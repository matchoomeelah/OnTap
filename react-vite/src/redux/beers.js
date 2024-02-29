//
// Constants
//
const CREATE_BEER = "beers/createBeer"
const GET_BEERS = "beers/getBeers"
const GET_BEER_BY_ID = "beers/getBeerById"
const UPDATE_BEER = "beers/updateBeer"
const DELETE_BEER = "beers/deleteBeer"


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

export const actionUpdateBeer= (beer) => {
    return {
        type: UPDATE_BEER,
        beer
    }
}

export const actionDeleteBeer= (id) => {
    return {
        type: DELETE_BEER,
        id
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

    const data = await response.json();

    // Extract the data
    if (response.ok) {
        dispatch(actionCreateBeer(data))
        return data
    }

    // console.log("There was an error creating your beer");
    return {"errors": data};
}

export const thunkGetBeers = () => async (dispatch) => {
    // Get Response
    const response = await fetch(`/api/beers`);

    // Extract the data
    const data = await response.json();

    // Send to reducer or report error
    if (response.ok) {
        dispatch(actionGetBeers(data.Beers));
        return data;
    }

    // console.log("Something went wrong getting all Beers")
    return {"errors": data};
}


export const thunkGetBeerById = (id) => async (dispatch) => {
    // Get Response
    const response = await fetch(`/api/beers/${id}`);

    // Extract the data
    const data = await response.json();

    // Send to reducer or report error
    if (response.ok) {
        dispatch(actionGetBeerById(data.Beer));
        return data;
    }

    // console.log("Something went wrong getting a specific Beer")
    return {"errors": data};

}

export const thunkUpdateBeer= (id, beer) => async (dispatch) => {
    // Get Response
    const response = await fetch(`/api/beers/${id}`, {
        method: "PUT",
        body: beer
    });


    // Extract the data
    const data = await response.json();

    // Send to reducer or report error
    if (response.ok) {
        dispatch(actionUpdateBeer(data));
        return data;
    }

    // console.log("There was an error updating your beer")
    return {"errors": data};

}

export const thunkDeleteBeer = (id) => async (dispatch) => {
    // Get Response
    const response = await fetch(`/api/beers/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    // Extract data
    const data = await response.json();

    //Send to reducer
    if (response.ok) {
        dispatch(actionDeleteBeer(id));
        return data;
    }

    // console.log("There was an error deleting the brewery")
    return {"errors": data};

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
        case UPDATE_BEER: {
            return { ...state, [action.beer.id]: action.beer };
        }
        case DELETE_BEER: {
            const newBeers = { ...state };
            delete newBeers[action.id];
            return newBeers;
        }
        default:
            return state
    }
}
