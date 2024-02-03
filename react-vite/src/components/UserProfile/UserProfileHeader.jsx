
function UserProfileHeader({ user }) {



    return (
        <div>
            <div id="profile-header">
                <img id="profile-banner-image" src="https://on-tap-bucket.s3.us-west-1.amazonaws.com/profile_banner1.jpeg" />
                <div>
                    <h2>{user?.username}</h2>
                </div>
            </div>
        </div>
    )
}

export default UserProfileHeader
