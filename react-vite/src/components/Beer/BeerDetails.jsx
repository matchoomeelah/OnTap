import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { thunkGetBeerById } from "../../redux/beers";

function BeerDetails() {
    const dispatch = useDispatch();

    const beers = useSelector(state => state.beers);
    const { beer_id } = useParams();
    const currBeer = beers[beer_id];

    console.log(currBeer)



    useEffect(() => {
        dispatch(thunkGetBeerById(beer_id))
    }, [beer_id])


    return (
        <div id="beer-details-container">
            <div id="beer-header">
                <img src={currBeer?.image_url} />
                <div>
                    <h1>{currBeer?.name}</h1>
                    <p>By <NavLink to={`/breweries/${currBeer?.brewery_id}`}>{currBeer?.brewery_name}</NavLink></p>
                    <p>{currBeer?.style}</p>
                    <div>
                        <p>ABV {currBeer?.abv}%    IBU {currBeer?.ibu}</p>
                        <button onClick={() => alert("Feature Coming Soon!")}> Add to WishList</button>
                    </div>
                </div>
            </div>
            <div id="beer-content-container">
                <div id="beer-content">

                </div>
                <div id="beer-photos">
                    <h4>Photos</h4>
                </div>
            </div>
        </div>
    )
}

export default BeerDetails;
