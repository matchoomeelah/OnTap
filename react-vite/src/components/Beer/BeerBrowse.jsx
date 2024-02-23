import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkGetBeers } from "../../redux/beers";
// import BeerTile from "./BeerTile";
import "./Beer.css";
import BeerBrowseTile from "./BeerBrowseTile";

function BeerBrowse() {
    const dispatch = useDispatch();

    const beers = useSelector(state => state.beers);


    useEffect(() => {
        dispatch(thunkGetBeers());
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="browse-page-container">
            <h1 className="browse-heading">All Beers</h1>
            {/* <SearchBar /> */}
            <div id="all-beers-container">
            {Object.values(beers).map(beer => {
                return <BeerBrowseTile key={beer.id} beer={beer} />
            })}
            </div>
        </div>
    )
}

export default BeerBrowse;
