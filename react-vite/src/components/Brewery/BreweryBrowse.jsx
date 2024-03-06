import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { thunkGetBreweries } from "../../redux/breweries";
import BreweryTile from "./BreweryTile";
import Select from 'react-select'
import "./Brewery.css"
import { BREWERY_TYPES } from "../Forms/form-utils";
import { useNavigate } from "react-router-dom";
import { useModal } from '../../context/Modal';
import LoginFormModal from "../Modals/LoginFormModal"
import SignupFormModal from "../Modals/SignupFormModal"

function BreweryBrowse() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setModalContent } = useModal();

    const breweries = useSelector(state => state.breweries)
    const sessionUser = useSelector(state => state.session.user);
    const [selectedType, setSelectedType] = useState(null)

    const breweryTypeOptions = useMemo(() => BREWERY_TYPES.sort().map(type => {
        return {
            value: type,
            label: type
        }
    }), [])

    let breweriesArray = Object.values(breweries);

    // Apply filters
    if (selectedType?.value) {
        breweriesArray = breweriesArray.filter(brewery => brewery.type === selectedType.value);
    }

    window.scrollTo(0, 0);

    useEffect(() => {
        dispatch(thunkGetBreweries());
    }, [dispatch])

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
                        setSelectedType(null)
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
