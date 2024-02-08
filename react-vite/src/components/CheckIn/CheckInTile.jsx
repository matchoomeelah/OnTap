import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { thunkGetBreweries } from "../../redux/breweries";

import "./CheckIn.css"
import DeleteCheckInModal from "../Modals/DeleteCheckInModal"
import OpenModalButton from "../OpenModalButton";
import UpdateCheckInModal from "../Modals/UpdateCheckInModal";
import CommentTile from "../Comment/CommentTile";
import CreateCommentModal from "../Modals/CreateCommentModal";
import EditDeleteButtons from "./EditDeleteButtons/EditDeleteButtons";


function CheckInTile({ checkIn }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const breweries = useSelector(state => state.breweries);
    const currBrewery = breweries[checkIn.beer.brewery_id];

    const [showComments, setShowComments] = useState(false)

    useEffect(() => {
        dispatch(thunkGetBreweries())
    }, [])

    function showOptions() {
        const menu = document.getElementById("check-in-options-menu");
        menu.classList.toggle("hidden");
    }

    return (
        <div className="outer-check-in-tile">
            <div className="check-in-tile-container">
                {checkIn.user_id === sessionUser?.id &&
                    // <h1>Here i am</h1>
                    <EditDeleteButtons checkIn={checkIn} />
                }
                <div id="check-in-user-rating"><NavLink id="check-in-username" to={`/users/${checkIn.user_id}`}>{checkIn.user_name}</NavLink><span>{"  "}&#x2022;</span><span><i id="check-in-mug" class="fa-solid fa-beer-mug-empty"></i>{parseFloat(checkIn.rating).toFixed(1)}</span> </div>
                <span id="check-in-headline"> is drinking <NavLink className="check-in-headline-navlink" to={`/beers/${checkIn.beer.id}`}>{checkIn.beer.name}</NavLink> by <NavLink className="check-in-headline-navlink" to={`/breweries/${currBrewery?.id}`}>{currBrewery?.name}</NavLink></span>
                <div id="check-in-body">{checkIn.body}</div>
                {checkIn.image_url && <img src={checkIn.image_url} className="check-in-image" />}
                <div className="check-in-buttons">
                    {sessionUser && <OpenModalButton
                        buttonId="add-comment-button"
                        buttonText={'Add Comment'}
                        modalComponent={<CreateCommentModal checkIn={checkIn}
                            onModalClose={() => setShowComments(true)}
                        />}
                    />}
                    <button id="show-comments-button" onClick={() => setShowComments(!showComments)}>{showComments ? "Hide Comments" : `Show Comments (${checkIn.comments.length})`}</button>

                </div>
            </div>

            {showComments &&
                <div className="comments-container">
                    {checkIn.comments.map(comment => {
                        return <CommentTile beerId={checkIn.beer.id} comment={comment} />
                    })}
                </div>
            }
        </div>
    )

}

export default CheckInTile;
