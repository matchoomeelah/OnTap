import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkGetBeers } from "../../redux/beers";
import Select from 'react-select'

import { BEER_STYLES } from "../Forms/validation";
import "./Beer.css";
import BeerBrowseTile from "./BeerBrowseTile";
import { useNavigate } from "react-router-dom";

function BeerBrowse() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const beers = useSelector(state => state.beers);

    const [style, setStyle] = useState("");
    const [selectedStyle, setSelectedStyle] = useState({})
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
            <div className="filters-container">
                <label>Style:</label>
                <Select
                    id="style-filter"
                    value={selectedStyle}
                    className="input"
                    options={styleOptions}
                    onChange={(e) => {
                        setStyle(e.value);
                        setSelectedStyle({
                            value: e.value,
                            label: e.label
                        })
                    }}
                />
                <button
                    className="clear-button"
                    onClick={() => {
                        setStyle("");
                        setSelectedStyle({})
                    }}>Clear</button>
            </div>
            <div id="all-beers-container">
                {beersArray.length > 0 ?
                    beersArray.map(beer => {
                        return <BeerBrowseTile key={beer.id} beer={beer} />
                    })
                    :
                    <div className="browse-placeholder">
                        <div className="placeholder-text">No beers of this style created yet!</div>
                        <button className="create-button show-button" onClick={() => navigate(`/beers/new`)}>Add a Beer</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default BeerBrowse;
