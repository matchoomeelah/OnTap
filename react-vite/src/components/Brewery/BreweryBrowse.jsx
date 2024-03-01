import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkGetBreweries } from "../../redux/breweries";
import BreweryTile from "./BreweryTile";
import Select from 'react-select'
import "./Brewery.css"
import { BREWERY_TYPES } from "../Forms/validation";
import { useNavigate } from "react-router-dom";
import { useModal } from '../../context/Modal';
import LoginFormModal from "../Modals/LoginFormModal"
import SignupFormModal from "../Modals/SignupFormModal"

function BreweryBrowse() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const breweries = useSelector(state => state.breweries)
    const sessionUser = useSelector(state => state.session.user);
    const { setModalContent, setOnModalClose } = useModal();

    const [selectedType, setSelectedType] = useState({})

    let breweriesArray = Object.values(breweries);

    // Apply filters
    if (Object.values(selectedType).length > 0) {
        breweriesArray = breweriesArray.filter(brewery => {
            if (brewery.type !== selectedType.value) {
                return false;
            }
            return true;
        });
    }

    const breweryTypeOptions = BREWERY_TYPES.sort().map(type => {
        return {
            value: type,
            label: type
        }
    })

    useEffect(() => {
        dispatch(thunkGetBreweries());
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    return (
        <div className="browse-page-container">
            <h1 className="browse-heading">All Breweries</h1>
            <div className="filters-container">
                <label>Type:</label>
                <Select
                    id="type-filter"
                    value={selectedType}
                    className="input"
                    options={breweryTypeOptions}
                    onChange={(e) => {
                        setSelectedType({
                            value: e.value,
                            label: e.label
                        })
                    }}
                />
                <button
                    className="clear-button"
                    onClick={() => {
                        setSelectedType({})
                    }}>Clear</button>
            </div>
            {breweriesArray.length > 0 ?
                breweriesArray.map(brewery => {
                    return <BreweryTile key={brewery.id} brewery={brewery} />
                })
                :
                <div className="browse-placeholder">
                    <div className="placeholder-text">No breweries of this type yet!</div>
                    {sessionUser ?
                        <button className="create-button show-button" onClick={() => navigate(`/breweries/new`)}>+ Add a Brewery</button>
                        :
                        <div className="log-or-sign-message"><button onClick={() => setModalContent(<LoginFormModal />)}>Log In</button> or <button onClick={() => setModalContent(<SignupFormModal />)}>Sign Up</button> to add a brewery.</div>
                    }
                </div>
            }
        </div>
    )
}

export default BreweryBrowse;
