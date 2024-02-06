import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import UserProfileHeader from "./UserProfileHeader";
import UserBreweries from "./UserBreweries";
import UserBeers from "./UserBeers";
import UserCheckIns from "./UserCheckIns";
import { thunkGetUserById } from "../../redux/users";
import { thunkGetUserCheckIns } from "../../redux/checkIns";
import "./UserProfile.css";

function UserProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user_id } = useParams();
    const profileUser = useSelector(state => state.users.profileUser);
    const sessionUser = useSelector(state => state.session.user);
    const breweries = useSelector(state => state.breweries);
    const beers = useSelector(state => state.beers);
    const checkIns = useSelector(state => state.checkIns);
    const comments = useSelector(state => state.comments);

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
        dispatch(thunkGetUserCheckIns(user_id))
    }, [user_id, comments, beers, breweries])


    if (!profileUser || !checkIns) {
        return null;
    }

    return (
        <div>
            <UserProfileHeader user={profileUser} />
            <div id="profile-content-container">
                <div id="user-check-ins">
                    <div>
                        <h2 className="user-section-header" id="recent-activity-header">Recent Activity</h2>
                    </div>
                    <UserCheckIns checkIns={checkIns} />
                </div>

                <div id="user-stuff">
                    <div id="stuff-header">
                        <h2 className="user-section-header">{profileUser?.id === sessionUser?.id ? "My " : profileUser?.first_name + "'s "} Stuff </h2>
                        <div id="show-buttons-container">
                            <div id="show-buttons">
                                {profileUser?.id === sessionUser?.id && showBeers &&
                                    <h5 className="create-button show-button" onClick={() => navigate(`/beers/new`)}>
                                        + Add a Beer
                                    </h5>
                                }
                                {profileUser?.id === sessionUser?.id && showBreweries &&
                                    <h5 className="create-button show-button" onClick={() => navigate(`/breweries/new`)}>
                                        + Add a Brewery
                                    </h5>
                                }
                                <h5 class="show-button show-beer" onClick={enableShowBeers}>Beers</h5>
                                <h5 class="show-button show-brewery" onClick={enableShowBreweries}>Breweries</h5>
                            </div>
                        </div>
                    </div>
                    {
                        showBreweries &&
                        <UserBreweries profileUser={profileUser}/>
                    }
                    {
                        showBeers &&
                        <UserBeers profileUser={profileUser} />
                    }
                </div>
            </div>
        </div>
    )
}

export default UserProfile;
