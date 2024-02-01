import { useNavigate, useParams } from "react-router-dom";
import UserProfileHeader from "./UserProfileHeader";

import "./UserProfile.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserById } from "../../redux/users";
import UserBreweries from "./UserBreweries";
import UserBeers from "./UserBeers";

function UserProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user_id } = useParams();
    const profileUser = useSelector(state => state.users.profileUser);
    const sessionUser = useSelector(state => state.session.user);
    const breweries = useSelector(state => state.breweries);
    const beers = useSelector(state => state.beers);

    const [showBeers, setShowBeers] = useState(true);
    const [showBreweries, setShowBreweries] = useState(false);

    function enableShowBeers() {
        setShowBreweries(false);
        setShowBeers(true);
    }

    function enableShowBreweries() {
        setShowBeers(false);
        setShowBreweries(true);
    }

    useEffect(() => {
        enableShowBeers();
    }, [])

    useEffect(() => {
        dispatch(thunkGetUserById(user_id));
    }, [user_id, breweries, beers])


    return (
        <div>
            <UserProfileHeader user={profileUser} />
            <div>
                <button onClick={enableShowBeers}>Show Beers</button>
                <button onClick={enableShowBreweries}>Show Breweries</button>
            </div>
            <div id="profile-content-container">
                <div id="profile-content">
                    {
                        showBreweries &&
                        <UserBreweries profileUser={profileUser} sessionUser={sessionUser} />
                    }
                    {
                        showBeers &&
                        <UserBeers profileUser={profileUser} sessionUser={sessionUser} />
                    }
                </div>
            </div>
        </div>
    )
}

export default UserProfile;
