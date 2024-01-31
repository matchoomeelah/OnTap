import { useNavigate, useParams } from "react-router-dom";
import UserProfileHeader from "./UserProfileHeader";

import "./UserProfile.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserById } from "../../redux/users";
import BreweryTile from "../Brewery/BreweryTile";
import OpenModalButton from "../OpenModalButton"
import DeleteBreweryModal from "../Modals/DeleteBreweryModal";

function UserProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user_id } = useParams();
    const profileUser = useSelector(state => state.users.profileUser);
    const breweries = useSelector(state => state.breweries);
    console.log(profileUser);


    useEffect(() => {
        dispatch(thunkGetUserById(user_id));
    }, [user_id, breweries])


    return (
        <div>
            <h1>User Profile</h1>
            <UserProfileHeader user={profileUser} />
            <div id="profile-content-container">
                <div id="profile-content">
                    <button onClick={() => navigate(`/breweries/new`)}>Create New Brewery</button>
                    {profileUser?.breweries.map(brewery => {
                        return (
                            <div>
                                <BreweryTile key={brewery.id} brewery={brewery} />
                                <div className="brewery-buttons">
                                    <OpenModalButton
                                        buttonText={'Delete'}
                                        modalComponent={<DeleteBreweryModal brewery={brewery} />}
                                    />
                                    <button onClick={() => navigate(`/breweries/${brewery.id}/edit`)}>Edit</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div id="profile-about">

                </div>
            </div>
        </div>
    )
}

export default UserProfile;
