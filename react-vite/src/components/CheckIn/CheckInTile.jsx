import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { thunkGetBreweries } from "../../redux/breweries";

import "./CheckIn.css"
import DeleteCheckInModal from "../Modals/DeleteCheckInModal"
import OpenModalButton from "../OpenModalButton";
import UpdateCheckInModal from "../Modals/UpdateCheckInModal";


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
            <div id="check-in-user-rating"><NavLink id="check-in-username" to={`/users/${checkIn.user_id}`}>{checkIn.user_name}</NavLink><span>{"  "}&#x2022;<i id="check-in-mug" class="fa-solid fa-beer-mug-empty"></i>{parseFloat(checkIn.rating).toFixed(1)}</span> </div><span id="check-in-headline"> is drinking <NavLink to={`/beers/${checkIn.beer.id}`}>{checkIn.beer.name}</NavLink> by <NavLink to={`/breweries/${currBrewery?.id}`}>{currBrewery?.name}</NavLink></span>
            <div id="check-in-body">{checkIn.body}</div>
            {checkIn.image_url && <img src={checkIn.image_url} className="check-in-image" />}
            <div className="check-in-buttons">
                {checkIn.user_id === sessionUser?.id &&
                    <div>
                        <OpenModalButton
                            buttonId="edit-button"
                            buttonText={'Edit'}
                            modalComponent={<UpdateCheckInModal checkIn={checkIn} />}
                        />
                        <OpenModalButton
                            buttonId="delete-button"
                            buttonText={'Delete'}
                            modalComponent={<DeleteCheckInModal checkIn={checkIn} />}
                        />
                    </div>
                }
            </div>
        </div>
    )

}

export default CheckInTile;
