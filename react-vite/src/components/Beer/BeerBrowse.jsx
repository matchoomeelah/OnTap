import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkGetBeers } from "../../redux/beers";
import BeerTile from "./BeerTile";
import "./Beer.css";
import BeerBrowseTile from "./BeerBrowseTile";

function BeerBrowse() {
    const dispatch = useDispatch();

    const beers = useSelector(state => state.beers);


    useEffect(() => {
        dispatch(thunkGetBeers());
    }, [])

    return (
        <div className="browse-page-container">
            <h1 className="browse-heading">All Beers</h1>
            {Object.values(beers).map(beer => {
                return <BeerTile key={beer.id} beer={beer} />
                // return <BeerBrowseTile key={beer.id} beer={beer} />
            })}
        </div>
    )
}

export default BeerBrowse;
