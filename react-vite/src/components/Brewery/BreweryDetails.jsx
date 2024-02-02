import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetBreweryById } from "../../redux/breweries";
import BeerTile from "../Beer/BeerTile"

function BreweryDetails() {
    const dispatch = useDispatch();
    const breweries = useSelector(state => state.breweries);
    const { brewery_id } = useParams();
    const currBrewery = breweries[brewery_id];
    console.log(breweries);
    console.log(currBrewery);
    currBrewery && console.log(currBrewery.beers);


    useEffect(() => {
        dispatch(thunkGetBreweryById(brewery_id));
    }, [])


    return (
        <div id="brewery-details-container">
            <div id="brewery-header">
                <img src={currBrewery?.image_url} />
                <div>
                    <h1>{currBrewery?.name}</h1>
                    <p>{currBrewery?.city}, {currBrewery?.state_province}, {currBrewery?.country}</p>
                    <p>{currBrewery?.type}</p>
                    <a href={currBrewery?.website_url} target={"_blank"}>{currBrewery?.website_url}</a>
                </div>
            </div>
            <div id="brewery-content-container">
                <div id="brewery-content">
                    <h4>Beers</h4>
                    {currBrewery?.beers.map(beer => {
                        return <BeerTile key={beer.id} beer={beer} />
                    })}
                </div>
                <div id="brewery-about">
                    <h4>About</h4>
                    <div>{currBrewery?.description}</div>
                </div>
            </div>
        </div>
    )
}

export default BreweryDetails;
