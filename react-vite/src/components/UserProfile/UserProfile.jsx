import { useParams } from "react-router-dom";
import UserProfileHeader from "./UserProfileHeader";

import "./UserProfile.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserById } from "../../redux/users";

function UserProfile() {
    const dispatch = useDispatch();
    const { user_id } = useParams();
    const profileUser = useSelector(state => state.users.profileUser);
    console.log(profileUser);


    useEffect(() => {
        dispatch(thunkGetUserById(user_id));
    }, [user_id])


    return (
        <div>
            <h1>User Profile</h1>
            <UserProfileHeader user={profileUser} />
            <div id="profile-content-container">
                <div id="profile-content">
                    {profileUser?.breweries.map(brewery => {
                        return <div key={brewery.id}>{brewery.name}</div>
                    })}
                </div>
                <div id="profile-about">

                </div>
            </div>
        </div>
    )
}

export default UserProfile;
