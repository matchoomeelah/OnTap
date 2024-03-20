import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { thunkGetBreweryById } from "../../redux/breweries";
import CheckInTile from "../CheckIn/CheckInTile";
import BeerTile from "../Beer/BeerTile";
import EditDeleteButtons from "./EditDeleteButtons/EditDeleteButtons";

function BreweryDetails() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sessionUser = useSelector(state => state.session.user);
    const beers = useSelector(state => state.beers);
    const breweries = useSelector(state => state.breweries);
    const checkIns = useSelector(state => state.checkIns);
    const { brewery_id } = useParams();
    const currBrewery = breweries[brewery_id];

    const [showBeers, setShowBeers] = useState(true);
    const [showCheckIns, setShowCheckins] = useState(false);
    const [showLongDescription, setShowLongDescription] = useState(false)


    useEffect(() => {
        window.scrollTo(0, 0);
        enableShowBeers();
    }, [])


    useEffect(() => {
        async function wrapper() {
            const response = await dispatch(thunkGetBreweryById(brewery_id));
            if (response.errors) {
                console.log("ERRORS!!!!!!", response.errors)
                navigate("/error");
            }
        }

        wrapper();

    }, [beers, checkIns, brewery_id, dispatch, navigate])


    function enableShowBeers() {
        setShowCheckins(false);
        setShowBeers(true);
        const beersButton = document.getElementById("beers-button");
        const checkInsButton = document.getElementById("check-ins-button");
        beersButton.classList.add("glow");
        checkInsButton.classList.remove("glow")
    }

    function enableShowCheckIns() {
        setShowBeers(false);
        setShowCheckins(true);
        const beersButton = document.getElementById("beers-button");
        const checkInsButton = document.getElementById("check-ins-button");
        beersButton.classList.remove("glow");
        checkInsButton.classList.add("glow")
    }

    function setDefaultImage() {
        const breweryLogo = document.getElementById("brewery-logo");
        breweryLogo.src = "https://i.ibb.co/ys9X0Jg/brewery-default.jpg";
    }

    if (!currBrewery) {
        return navigate("/breweries");
    }

    return (
        <div id="brewery-details-container">
            <div id="brewery-header">
                <img id="brewery-logo" src={currBrewery?.image_url} onError={setDefaultImage} />
                <div id="brewery-header-info">
                    <div id="brewery-name">{currBrewery?.name}</div>
                    <div id="brewery-location">{currBrewery?.city}, {currBrewery?.state_province}, {currBrewery?.country}</div>
                    <div id="brewery-type">{currBrewery?.type}</div>
                    <a href={currBrewery?.website_url} target="_blank" rel="noreferrer" id="brewery-website">{currBrewery?.website_url}</a>
                </div>
            </div>


            <div id="brewery-content-container">
                <div id="brewery-content">
                    <div id="brewery-show-buttons-container">
                        <h5 id="beers-button" className="glow brewery-show-button show-beer" onClick={enableShowBeers}>Beers</h5>
                        <h5 id="check-ins-button" className="brewery-show-button show-checkins" onClick={enableShowCheckIns}>Check Ins</h5>
                    </div>
                    {showBeers &&
                        (currBrewery?.beers.length === 0 ?
                            <div id="no-beers-placeholder">
                                <div id="no-beers-text">No beers created yet!</div>
                            </div>
                            :
                            currBrewery?.beers.map(beer => {
                                return <BeerTile key={beer.id} beer={beer} />
                            }))}
                    {showCheckIns &&
                        (currBrewery.check_ins.length === 0 ?
                            <div id="no-check-ins-placeholder">
                                <div id="no-check-ins-text">Hmm, no activity here. Time to drink up!</div>
                            </div>
                            :
                            currBrewery.check_ins.toReversed().map(checkIn => {
                                return <CheckInTile key={checkIn.id} checkIn={checkIn} />
                            }))}
                </div>
                <div id="brewery-about">
                    <div id="about-heading">
                        <h4>About</h4>
                        <div id="you-own-this">
                            {sessionUser?.id === currBrewery?.creator_id &&
                                <div>
                                    <div id="you-own-this-text">
                                        <i className="fa-solid fa-medal"></i>You own this!
                                    </div>
                                    <div id="owner-button">
                                        <EditDeleteButtons brewery={currBrewery}/>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    {!showLongDescription ?
                        currBrewery?.description.length < 300 ?
                            <div>{currBrewery?.description}</div>
                            :
                            <div>
                                {currBrewery?.description.substring(0, 300) + "..."}
                                <button className="show-more-button" onClick={() => setShowLongDescription(true)}>Show more</button>
                            </div>
                        :
                        <div>
                            <div>{currBrewery?.description}</div>
                            <button className="show-more-button" onClick={() => setShowLongDescription(false)}>Show less</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default BreweryDetails;
