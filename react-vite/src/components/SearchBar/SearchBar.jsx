import { useEffect, useRef, useState } from "react";
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
    const [isFocused, setIsFocused] = useState(false);
    const searchListRef = useRef();

    const searchBeers = Object.values(beers).filter(beer => beer.name.toLowerCase().includes(query.toLowerCase()));
    const searchBreweries = Object.values(breweries).filter(brewery => brewery.name.toLowerCase().includes(query));


    useEffect(() => {
        if (!beers || Object.values(beers).length < 2) {
            dispatch(thunkGetBeers());
        }
    }, [beers, dispatch])

    useEffect(() => {
        if (!breweries || Object.values(breweries).length < 2) {
            dispatch(thunkGetBreweries());
        }
    }, [breweries, dispatch])

    useEffect(() => {
        // Closes search results when you click outside it
        const onClick = (e) => {
            const searchBar = document.getElementById("search-bar");
            if (!searchListRef.current.contains(e.target) && !searchListRef.current.contains(searchBar)) {
                setIsFocused(false);
            }
        };

        document.addEventListener('click', onClick);

        return () => document.removeEventListener("click", onClick);
    }, [isFocused]);


    function focus(e) {
        e.stopPropagation();
        setIsFocused(true);
    }


    function goToBeer(beerId) {
        navigate(`/beers/${beerId}`);
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
                onChange={e => {
                    setQuery(e.target.value);
                    focus(e);
                }}
                onFocus={focus}
                onClick={e => {
                    focus(e);
                }}
                placeholder="Find a beer or brewery..."
                autoComplete="off">
            </input>
            <div id="search-list" className={isFocused ? "search-list" : "search-list hidden"} ref={searchListRef}>
                {query.length > 0 && searchBeers.length > 0 &&
                    <div>
                        <div className="search-menu-beers-label">Beers</div>
                        {searchBeers.map(beer => {
                            return <div key={beer.id} className="search-list-item" onClick={() => goToBeer(beer.id)}>
                                <img src={beer.image_url} />
                                {beer.name}
                            </div>
                        })}
                    </div>
                }
                {query.length > 0 && searchBreweries.length > 0 &&
                    <div>
                        <div className="search-menu-breweries-label">Breweries</div>
                        {searchBreweries.map(brewery => {
                            return <div key={brewery.id} className="search-list-item" onClick={() => goToBrewery(brewery.id)} >
                                <img src={brewery.image_url} />
                                {brewery.name}
                            </div>
                        })}
                    </div>
                }
            </div>
        </div >
    );
}

export default SearchBar;
