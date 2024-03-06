import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetBeers } from "../../redux/beers";
import { useModal } from '../../context/Modal';
import LoginFormModal from "../Modals/LoginFormModal"
import SignupFormModal from "../Modals/SignupFormModal"
import BeerTile from "./BeerTile";
import Select from 'react-select'
import { BEER_STYLES } from "../Forms/form-utils";
import "./Beer.css";


function BeerBrowse() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setModalContent } = useModal();

    const beers = useSelector(state => state.beers);
    const sessionUser = useSelector(state => state.session.user);
    const [selectedStyle, setSelectedStyle] = useState(null)

    let styleOptions = useMemo(() => BEER_STYLES.sort().map(style => {
        return {
            value: style,
            label: style
        }
    }), []);

    let beersArray = Object.values(beers);

    // Apply filters
    if (selectedStyle?.value) {
        beersArray = beersArray.filter(beer => beer.style === selectedStyle.value);
    }

    window.scrollTo(0, 0);

    useEffect(() => {
        dispatch(thunkGetBeers());
    }, [dispatch])

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
                        setSelectedStyle({
                            value: e.value,
                            label: e.label
                        })
                    }}
                />
                <button
                    className="clear-button"
                    onClick={() => {
                        setSelectedStyle(null)
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
