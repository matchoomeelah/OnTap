import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkGetBeers } from "../../redux/beers";
import Select from 'react-select'

import "./Beer.css";
import BeerBrowseTile from "./BeerBrowseTile";

function BeerBrowse() {
    const dispatch = useDispatch();

    const beers = useSelector(state => state.beers);

    const [style, setStyle] = useState("");
    const [minAbv, setMinAbv] = useState(0);
    const [maxAbv, setMaxAbv] = useState(100);

    let beersArray = Object.values(beers);

    // Apply filters
    if (style || minAbv || maxAbv < 100) {
        beersArray = beersArray.filter(beer => {
            if (style && beer.style !== style) {
                return false;
            }
            return true;
        });
    }

    const BEER_STYLES = ["Hazy IPA", "American IPA", "American Strong Ale", "Ale", "Lager", "IPA", "Stout", "Pale Ale", "Witbier", "Pilsner", "Brown Ale", "Cream Ale", "Porter", "Hefeweizen", "Saison", "Bock", "Dunkel", "Barley Wine", "Amber Ale", "Red Ale", "Wheat Beer", "Double IPA", "Gose", "English IPA", "Scotch Ale", "Kölsch"];
    let styleOptions = BEER_STYLES.sort().map(style => {
        return {
            value: style,
            label: style
        }
    });


    useEffect(() => {
        dispatch(thunkGetBeers());
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    return (
        <div className="browse-page-container">
            <h1 className="browse-heading">All Beers</h1>
            <div id="all-beers-container">
                {/* {Object.values(beers).map(beer => {
                    return <BeerBrowseTile key={beer.id} beer={beer} />
                })} */}
                {beersArray.map(beer => {
                    return <BeerBrowseTile key={beer.id} beer={beer} />
                })}
            </div>
            <div id="filters-container">
                <h4>Filters</h4>
                <label>Style:</label>
                <Select
                    id="style-filter"
                    className="input"
                    options={styleOptions}
                    onChange={(e) => {
                        setStyle(e.value);
                    }}
                />
                {/* <label>ABV</label>
                <div id="abv-min-max">
                    <input
                        placeholder="min"
                        value={minAbv}
                        onChange={e => setMinAbv(e.value)}
                    />
                    -
                    <input
                        placeholder="max"
                        value={maxAbv}
                        onChange={e => setMaxAbv(e.value)}
                    />

                </div> */}
            </div>
        </div>
    )
}

export default BeerBrowse;
