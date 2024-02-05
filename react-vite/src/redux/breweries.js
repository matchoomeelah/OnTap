//
// Constants
//
const CREATE_BREWERY = "breweries/createBrewery"
const GET_BREWERIES = "breweries/getBreweries"
const GET_BREWERY_BY_ID = "breweries/getBreweryById"
const UPDATE_BREWERY = "breweries/updateBrewery"
const DELETE_BREWERY = "breweries/deleteBrewery"

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

export const actionDeleteBrewery = (id) => {
    return {
        type: DELETE_BREWERY,
        id
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
        return data;
    }
    console.log("There was an error creating your brewery");

    return {"errors": data};
}


export const thunkGetBreweries = () => async (dispatch) => {
    // Get Response
    const response = await fetch(`/api/breweries`)

    // Extract the data
    const data = await response.json();
    // console.log(data);

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

    // Send to reducer or report error
    if (response.ok) {
        try{
            dispatch(actionUpdateBrewery(data));
            return data;
        }
        catch(e) {
            console.log(e);
        }
    }

    console.log("There was an error updating the brewery");


    return {"errors": data};
}

export const thunkDeleteBrewery = (id) => async (dispatch) => {
    const response = await fetch(`/api/breweries/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();

    if (response.ok) {
        dispatch(actionDeleteBrewery(id));
    }
    else {
        console.log("There was an error deleting the brewery")
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
        case DELETE_BREWERY: {
            const newBreweries = { ...state };
            delete newBreweries[action.id];
            return newBreweries;
        }
        default:
            return state;
    }
}
