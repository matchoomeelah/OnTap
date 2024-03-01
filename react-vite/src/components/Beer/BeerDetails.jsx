import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { thunkGetBeerById } from "../../redux/beers";
import CheckInTile from "../CheckIn/CheckInTile";
import OpenModalButton from "../OpenModalButton";
import CreateCheckInModal from "../Modals/CreateCheckInModal";
import { PhotoProvider, PhotoView } from 'react-photo-view';

function BeerDetails() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sessionUser = useSelector(state => state.session.user);
    const beers = useSelector(state => state.beers);
    const checkIns = useSelector(state => state.checkIns);
    const comments = useSelector(state => state.comments);
    const { beer_id } = useParams();
    const currBeer = beers[beer_id];
    const currAvgRating = currBeer?.check_ins.length > 0 ? parseFloat(currBeer?.check_ins.reduce((acc, curr) => curr.rating + acc, 0) / currBeer?.check_ins.length).toFixed(1) : "New";
    const beerPhotos = currBeer?.check_ins.filter(checkIn => checkIn.image_url);

    const [showLongDescription, setShowLongDescription] = useState(false);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        async function wrapper() {
            const response = await dispatch(thunkGetBeerById(beer_id));
            if (response.errors) {
                navigate("/error");
            }
        }

        wrapper();
    }, [beer_id, checkIns, comments, dispatch, navigate])

    function setDefaultImage() {
        const beerLogo = document.getElementById("beer-logo");
        beerLogo.src = "https://i.ibb.co/qChdf5n/default-beer.jpg";
    }

    return (
        <PhotoProvider>
            <div id="beer-details-container">
                <div id="beer-header">
                    <img id="beer-logo" src={currBeer?.image_url} onError={setDefaultImage} />
                    <div id="beer-header-info">
                        <div id="beer-name">{currBeer?.name}</div>
                        <div><NavLink to={`/breweries/${currBeer?.brewery_id}`} id="brewery-nav-link">{currBeer?.brewery_name}</NavLink></div>
                        <div id="beer-style">{currBeer?.style}</div>
                        <div id="bottom-info">
                            <div id="abv-ibu-rating">
                                <div>
                                    <div>ABV</div>
                                    <div>{currBeer?.abv}%</div>
                                </div>
                                <div>
                                    <div>IBU</div>
                                    <div>{currBeer?.ibu}
                                    </div>
                                </div>
                                <div>
                                    <div>Rating</div>
                                    <div><i id="beer-details-rating-mug" className="fa-solid fa-beer-mug-empty"></i>{currAvgRating}</div>
                                </div>
                            </div>
                            {/* <button id="wishlist-button" onClick={() => alert("Feature Coming Soon!")}> Add to WishList</button> */}
                        </div>
                    </div>
                </div>
                <div id="beer-content-container">
                    <div id="beer-content-left">
                        <div id="beer-about">
                            <h4>About</h4>
                            {!showLongDescription ?
                                currBeer?.description.length < 300 ?
                                    <div>{currBeer?.description}</div>
                                    :
                                    <div>
                                        {currBeer?.description.substring(0, 300) + "..."}
                                        <button className="show-more-button" onClick={() => setShowLongDescription(true)}>Show more</button>
                                    </div>
                                :
                                <div>
                                    <div>{currBeer?.description}</div>
                                    <button className="show-more-button" onClick={() => setShowLongDescription(false)}>Show less</button>
                                </div>
                            }
                        </div>
                        {beerPhotos?.length > 0 &&
                            <div id="small-screen-beer-photos-container">
                                <div id="small-screen-dummy"></div>
                                <div id="small-screen-beer-photos">
                                    {currBeer?.check_ins.toReversed().slice(0, 5).map(checkIn => {
                                        return checkIn.image_url &&
                                            <PhotoView key={checkIn.id} src={checkIn.image_url}>
                                                <img key={checkIn.id} className="small-beer-photo" src={checkIn.image_url} />
                                            </PhotoView>
                                    })}
                                </div>
                            </div>
                        }
                        <div id="check-in-button-div">
                            {sessionUser &&
                                <OpenModalButton
                                    buttonId="check-in-button"
                                    buttonText={'Check In!'}
                                    modalComponent={<CreateCheckInModal beer={currBeer} />}
                                />}
                            <h2 id="beer-details-recent-activity-header">Recent Activity</h2>
                        </div>
                        {currBeer?.check_ins.length === 0 ?
                            <div id="no-check-ins-placeholder">
                                <div id="no-check-ins-text">Hmm, no activity here. Time to drink up!</div>
                            </div> :
                            <div id="check-in-container">
                                {currBeer?.check_ins.toReversed().map(checkIn => {
                                    return <CheckInTile key={checkIn.id} checkIn={checkIn} />
                                })}
                            </div>
                        }
                    </div>
                    {beerPhotos?.length > 0 &&
                        <div id="beer-photos-container">
                            <h4>Photos</h4>
                            <div id="dummy"></div>
                            <div id="beer-photos">
                                {currBeer?.check_ins.toReversed().slice(0, 9).map(checkIn => {
                                    return checkIn.image_url &&
                                        <PhotoView key={checkIn.id} src={checkIn.image_url}>
                                            <img className="beer-side-photo" src={checkIn.image_url} />
                                        </PhotoView>
                                })}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </PhotoProvider>
    )
}

export default BeerDetails;
