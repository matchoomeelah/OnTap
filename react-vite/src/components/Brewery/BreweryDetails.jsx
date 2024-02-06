import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetBreweryById } from "../../redux/breweries";
import BeerTile from "../Beer/BeerTile"
import CheckInTile from "../CheckIn/CheckInTile";

function BreweryDetails() {
    const dispatch = useDispatch();
    const beers = useSelector(state => state.beers);
    const breweries = useSelector(state => state.breweries);
    const { brewery_id } = useParams();
    const currBrewery = breweries[brewery_id];

    const [showBeers, setShowBeers] = useState(true)
    const [showCheckIns, setShowCheckins] = useState(false)


    useEffect(() => {
        window.scrollTo(0, 0);
        enableShowBeers();
    }, [])

    useEffect(() => {
        dispatch(thunkGetBreweryById(brewery_id));
    }, [beers])


    // Finds all check ins associated with brewery and sorts them by most recent...
    // Should probably just change the DB if I want this functionality
    const breweryCheckIns = [];
    currBrewery?.beers.forEach(beer => {
        beer.check_ins.forEach(checkIn => {
            breweryCheckIns.push(checkIn);
        })
    })
    breweryCheckIns.sort((a, b) => a.created_at > b.created_at ? 1 : -1);


    function enableShowBeers() {
        setShowCheckins(false);
        setShowBeers(true);
    }

    function enableShowCheckIns() {
        setShowBeers(false);
        setShowCheckins(true);
    }


    return (
        <div id="brewery-details-container">
            <div id="brewery-header">
                <img src={currBrewery?.image_url} />
                <div>
                    <h1>{currBrewery?.name}</h1>
                    <p>{currBrewery?.city}, {currBrewery?.state_province}, {currBrewery?.country}</p>
                    <p>{currBrewery?.type}</p>
                    <a href={currBrewery?.website_url} target={"_blank"} id="brewery-website">{currBrewery?.website_url}</a>
                </div>
            </div>
            <div id="brewery-content-container">
                <div id="brewery-about">
                    <h4>About</h4>
                    <div>{currBrewery?.description}</div>
                </div>
                <div id="brewery-content">
                    <div id="brewery-show-buttons-container">
                        <h5 id="brewery-show-beers-button" className="brewery-show-button" onClick={enableShowBeers}>Beers</h5>
                        <h5 id="brewery-show-check-ins-button" className="brewery-show-button" onClick={enableShowCheckIns}>Check Ins</h5>
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
                        (breweryCheckIns.length === 0 ?
                        <div id="no-check-ins-placeholder">
                            <div id="no-check-ins-text">Hmm, no activity here. Time to drink up!</div>
                        </div>
                        :
                        breweryCheckIns.map(checkIn => {
                        return <CheckInTile checkIn={checkIn} />
                    }))}
                </div>
            </div>
        </div>
    )
}

export default BreweryDetails;
