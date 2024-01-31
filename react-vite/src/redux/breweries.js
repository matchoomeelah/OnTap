//
// Constants
//
const CREATE_BREWERY = "breweries/createBrewery"
const GET_BREWERIES = "breweries/getBreweries"
const GET_BREWERY_BY_ID = "breweries/getBreweryById"
const UPDATE_BREWERY = "breweries/updateBrewery"

//
// Actions
//
export const actionCreateBrewery = (brewery) => {
    return {
        type: CREATE_BREWERY,
        brewery
    }
}

export const actionGetBreweries = (breweries) => {
    return {
        type: GET_BREWERIES,
        breweries
    }
}

export const actionGetBreweryById = (brewery) => {
    return {
        type: GET_BREWERY_BY_ID,
        brewery
    }
}
export const actionUpdateBrewery = (brewery) => {
    return {
        type: UPDATE_BREWERY,
        brewery
    }
}


//
// Thunks
//
export const thunkCreateBrewery = (brewery) => async (dispatch) => {
    // Get Response
    const response = await fetch(`/api/breweries`, {
        method: "POST",
        body: brewery
    })

    const data = await response.json();
    console.log(data);

    // Extract the data
    if (response.ok) {
        dispatch(actionCreateBrewery(data))
    }
    else {
        console.log("There was an error");
    }

    return data;
}


export const thunkGetBreweries = () => async (dispatch) => {
    // Get Response
    const response = await fetch(`/api/breweries`)

    // Extract the data
    const data = await response.json();
    console.log(data);

    // Send to reducer or report error
    if (response.ok) {
        dispatch(actionGetBreweries(data.Breweries))
    }
    else {
        console.log("There was an error");
    }

    return data;
}

export const thunkGetBreweryById = (id) => async (dispatch) => {
    // Get Response
    const response = await fetch(`/api/breweries/${id}`)

    // Extract the data
    const data = await response.json();
    console.log(data);

    // Send to reducer or report error
    if (response.ok) {
        dispatch(actionGetBreweryById(data.Brewery));
    }
    else {
        console.log("There was an error");
    }

    return data;
}

export const thunkUpdateBrewery = (id, brewery) => async (dispatch) => {
    // Get Response
    const response = await fetch(`/api/breweries/${id}`, {
        method: "PUT",
        body: brewery
    })

    // Extract the data
    const data = await response.json();
    console.log(data);

    // Send to reducer or report error
    if (response.ok) {
        dispatch(actionUpdateBrewery(data));
    }
    else {
        console.log("There was an error");
    }

    return data;
}


//
// Reducer
//

export default function breweriesReducer(state = {}, action) {
    switch (action.type) {
        case CREATE_BREWERY: {
            return { ...state, [action.brewery.id]: action.brewery };
        }
        case GET_BREWERIES: {
            const newBreweries = {}
            action.breweries.map(brewery => {
                newBreweries[brewery.id] = brewery;
            });
            return newBreweries;
        }
        case GET_BREWERY_BY_ID: {
            const newBreweries = {}
            newBreweries[action.brewery.id] = action.brewery;
            return newBreweries;
        }
        case UPDATE_BREWERY: {
            return { ...state, [action.brewery.id]: action.brewery };
        }
        default:
            return state;
    }
}
