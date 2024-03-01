import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PhotoProvider, PhotoView } from 'react-photo-view';

import { thunkGetBreweries } from "../../redux/breweries";

import "./CheckIn.css"
import OpenModalButton from "../OpenModalButton";
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
    }, [dispatch])

    return (
        <div className="outer-check-in-tile">
            <div className="check-in-tile-container">
                {checkIn.user_id === sessionUser?.id &&
                    <EditDeleteButtons checkIn={checkIn} />
                }
                <div className="check-in-top-container">
                    <div className='check-in-profile-picture'>
                        {checkIn.user_profile_pic ?
                            <img className="check-in-custom-profile-pic" src={checkIn.user_profile_pic} />
                            :
                            <i id="check-in-default-profile-pic" className="fas fa-user-circle fa-lg" />
                        }
                    </div>
                    <div>
                        <div id="check-in-user-rating"><NavLink id="check-in-username" to={`/users/${checkIn.user_id}`}>{checkIn.user_name}</NavLink><span>{"  "}&#x2022;</span><span><i id="check-in-mug" className="fa-solid fa-beer-mug-empty"></i>{parseFloat(checkIn.rating).toFixed(1)}</span> </div>
                        <span id="check-in-headline"> is drinking <NavLink className="check-in-headline-navlink" to={`/beers/${checkIn.beer.id}`}>{checkIn.beer.name}</NavLink> by <NavLink className="check-in-headline-navlink" to={`/breweries/${currBrewery?.id}`}>{currBrewery?.name}</NavLink></span>
                    </div>
                </div>
                <div id="check-in-body">{checkIn.body}</div>
                {checkIn.image_url &&
                    <PhotoProvider>
                        <PhotoView key={checkIn.id} src={checkIn.image_url}>
                            <img className="check-in-image" src={checkIn.image_url} />
                        </PhotoView>
                    </PhotoProvider>
                }
                <div className="check-in-buttons">
                    <button id="show-comments-button" onClick={() => setShowComments(!showComments)}>{showComments ? "Hide Comments" : `Show Comments (${checkIn.comments.length})`}</button>
                    {sessionUser && <OpenModalButton
                        buttonId="add-comment-button"
                        buttonText={<div><i className="fa-regular fa-comment"></i>Reply</div>}
                        modalComponent={<CreateCommentModal checkIn={checkIn}
                            onModalClose={() => setShowComments(true)}
                        />}
                    />}
                </div>
            </div>

            {showComments &&
                <div className="comments-container">
                    {checkIn.comments.map(comment => {
                        return <CommentTile key={comment.id} beerId={checkIn.beer.id} comment={comment} />
                    })}
                </div>
            }
        </div>
    )

}

export default CheckInTile;
