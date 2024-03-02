import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkGetBeers } from "../../redux/beers";
import { useModal } from '../../context/Modal';
import LoginFormModal from "../Modals/LoginFormModal"
import SignupFormModal from "../Modals/SignupFormModal"

import Select from 'react-select'

import { BEER_STYLES } from "../Forms/validation";
import "./Beer.css";
import BeerTile from "./BeerTile";
import { useNavigate } from "react-router-dom";

function BeerBrowse() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const beers = useSelector(state => state.beers);
    const sessionUser = useSelector(state => state.session.user);
    const { setModalContent } = useModal();

    const [style, setStyle] = useState("");
    const [selectedStyle, setSelectedStyle] = useState({})

    let beersArray = Object.values(beers);

    // Apply filters
    if (style) {
        beersArray = beersArray.filter(beer => beer.style === style);
    }

    let styleOptions = BEER_STYLES.sort().map(style => {
        return {
            value: style,
            label: style
        }
    });

    useEffect(() => {
        dispatch(thunkGetBeers());
    })

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
                        return <BeerTile key={beer.id} beer={beer} />
                    })
                    :
                    <div className="browse-placeholder">
                        <div className="placeholder-text">No beers of this style created yet!</div>
                        {sessionUser ?
                            <button className="create-button show-button" onClick={() => navigate(`/beers/new`)}>+ Add a Beer</button>
                            :
                            <div className="log-or-sign-message"><button onClick={() => setModalContent(<LoginFormModal />)}>Log In</button> or <button onClick={() => setModalContent(<SignupFormModal />)}>Sign Up</button> to add a beer.</div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default BeerBrowse;
