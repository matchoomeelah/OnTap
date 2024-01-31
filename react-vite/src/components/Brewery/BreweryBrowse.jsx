import { useDispatch, useSelector } from "react-redux";
import { thunkGetBreweries } from "../../redux/breweries";
import { useEffect } from "react";
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
        <div>
            <h1>Brewery Browse</h1>
            {Object.values(breweries).map(brewery => {
                return <BreweryTile key={brewery.id} brewery={brewery} />
            })}
        </div>
    )
}

export default BreweryBrowse;
