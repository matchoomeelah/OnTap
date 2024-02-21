import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetBeers } from "../../redux/beers";
import { thunkGetBreweries } from "../../redux/breweries";

import "./SearchBar.css"
import { useNavigate } from "react-router-dom";

function SearchBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const beers = useSelector(state => state.beers);
    const breweries = useSelector(state => state.breweries);

    const [query, setQuery] = useState("");

    useEffect(() => {
        if (!beers || Object.values(beers).length < 2) {
            dispatch(thunkGetBeers());
            console.log(beers)

        }
    }, [beers])

    useEffect(() => {
        if (!breweries || Object.values(breweries).length < 2) {
            dispatch(thunkGetBreweries());
            console.log(breweries)
        }
    }, [breweries])

    function goToBeer(beerId) {
        navigate(`/breweries/${beerId}`);
        setQuery("");
    }

    function goToBrewery(breweryId) {
        navigate(`/breweries/${breweryId}`);
        setQuery("");
    }


    return (
        <div id="search-bar">
            <input
                id="search-input"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search...">
            </input>
            <div id="search-list">
                {query.length > 0 &&
                    <div>
                        {Object.values(breweries).filter(brewery => brewery.name.toLowerCase().includes(query)).map(brewery => {
                            return <div key={brewery.id} className="search-list-item" onClick={() => goToBrewery(brewery.id)} >{brewery.name}</div>
                        })}
                    </div>
                }
                {query.length > 0 &&
                    <div>
                        {Object.values(beers).filter(beer => beer.name.toLowerCase().includes(query.toLowerCase())).map(beer => {
                            return <div key={beer.id} className="search-list-item" onClick={() => goToBeer(beer.id)}>{beer.name}</div>
                        })}
                    </div>
                }
            </div>
        </div >
    );
}

export default SearchBar;
