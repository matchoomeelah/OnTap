import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkGetBreweries } from "../../redux/breweries";
import BreweryTile from "./BreweryTile";
import "./Brewery.css"

function BreweryBrowse() {
    const dispatch = useDispatch();

    const breweries = useSelector(state => state.breweries)
    console.log(breweries);


    useEffect(() => {
        dispatch(thunkGetBreweries());
    }, [])


    return (
        <div className="browse-page-container">
            <h1 className="browse-heading">All Breweries</h1>
            {Object.values(breweries).map(brewery => {
                return <BreweryTile key={brewery.id} brewery={brewery} />
            })}
        </div>
    )
}

export default BreweryBrowse;
