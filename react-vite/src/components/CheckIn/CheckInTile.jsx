import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { thunkGetBreweries } from "../../redux/breweries";

import "./CheckIn.css"
import DeleteCheckInModal from "../Modals/DeleteCheckInModal"
import OpenModalButton from "../OpenModalButton";


function CheckInTile({ checkIn }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const breweries = useSelector(state => state.breweries);
    const currBrewery = breweries[checkIn.beer.brewery_id];


    useEffect(() => {
        dispatch(thunkGetBreweries())
    }, [])

    function showOptions() {
        const menu = document.getElementById("check-in-options-menu");
        menu.classList.toggle("hidden");
    }

    return (
        <div className="check-in-tile-container">
            <NavLink id="check-in-username" to={`/users/${checkIn.user_id}`}>{checkIn.user_name}</NavLink> <span id="check-in-headline"> is drinking <NavLink to={`/beers/${checkIn.beer.id}`}>{checkIn.beer.name}</NavLink> by <NavLink to={`/breweries/${currBrewery?.id}`}>{currBrewery?.name}</NavLink></span>
            <div id="check-in-body">{checkIn.body}</div>
            {checkIn.user_id === sessionUser?.id &&
                // <div className="check-in-buttons">
                    <OpenModalButton
                        buttonId="delete-button"
                        buttonText={'Delete'}
                        modalComponent={<DeleteCheckInModal checkIn={checkIn} />}
                    />
                // </div>
            }
        </div>
    )

}

export default CheckInTile;
