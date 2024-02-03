import { useNavigate, useParams } from "react-router-dom";
import UserProfileHeader from "./UserProfileHeader";

import "./UserProfile.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserById } from "../../redux/users";
import UserBreweries from "./UserBreweries";
import UserBeers from "./UserBeers";
import UserCheckIns from "./UserCheckIns";

function UserProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user_id } = useParams();
    const profileUser = useSelector(state => state.users.profileUser);
    const sessionUser = useSelector(state => state.session.user);
    const breweries = useSelector(state => state.breweries);
    const beers = useSelector(state => state.beers);
    const checkIns = useSelector(state => state.checkIns);

    const [showBeers, setShowBeers] = useState(true);
    const [showBreweries, setShowBreweries] = useState(false);
    const [showCheckIns, setShowCheckins] = useState(true);


    function enableShowBeers() {
        setShowBreweries(false);
        setShowBeers(true);
    }

    function enableShowBreweries() {
        setShowBeers(false);
        setShowBreweries(true);
    }

    function enableShowCheckIns() {
        setShowBeers(false);
        setShowBreweries(false);
        setShowCheckins(true);
    }

    useEffect(() => {
        enableShowBeers();
    }, [])

    useEffect(() => {
        dispatch(thunkGetUserById(user_id));
    }, [user_id, breweries, beers, checkIns])


    return (
        <div>
            <UserProfileHeader user={profileUser} />
            <div id="profile-content-container">
                <div id="user-check-ins">
                    <div>
                        <h2 className="user-section-header" id="recent-activity-header">Recent Activity</h2>
                    </div>
                    <UserCheckIns profileUser={profileUser} sessionUser={sessionUser} />
                </div>

                <div id="user-stuff">
                    <div id="stuff-header">
                        <h2 className="user-section-header">{profileUser?.first_name}&apos;s Stuff </h2>
                        <div>
                            <button onClick={enableShowBeers}>Show Beers</button>
                            <button onClick={enableShowBreweries}>Show Breweries</button>
                        </div>
                    </div>
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
