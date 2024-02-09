import "./UserProfile.css";


function UserProfileHeader({ user }) {
    return (
        <div id="profile-header">
            <img id="profile-banner-image" src="https://on-tap-bucket.s3.us-west-1.amazonaws.com/profile_banner1.jpeg" />
            <div id="profile-header-info">
                <div id='banner-profile-picture'>
                    <i className="fas fa-user-circle fa-lg" />
                </div>
                <div>
                    <div id="profile-header-name">{user?.first_name} {user?.last_name}</div>
                    <div id="profile-header-username">@{user?.username}</div>
                </div>
            </div>
        </div >
    )
}

export default UserProfileHeader
