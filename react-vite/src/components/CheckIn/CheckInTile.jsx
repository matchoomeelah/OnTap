import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { thunkGetBreweries } from "../../redux/breweries";

import "./CheckIn.css"


function CheckInTile({checkIn}) {
    const dispatch = useDispatch();
    const breweries = useSelector(state => state.breweries);
    const currBrewery = breweries[checkIn.beer.brewery_id];


    useEffect(() => {
        dispatch(thunkGetBreweries())
    }, [])

    return (
        <div className="check-in-tile-container">
            <NavLink to={`/users/${checkIn.user_id}`}> {checkIn.user_name}</NavLink> is drinking <NavLink to={`/beers/${checkIn.beer.id}`}>{checkIn.beer.name}</NavLink> by <NavLink to={`/breweries/${currBrewery?.id}`}>{currBrewery?.name}</NavLink>
            <div>{checkIn.body}</div>
        </div>
    )

}

export default CheckInTile;
