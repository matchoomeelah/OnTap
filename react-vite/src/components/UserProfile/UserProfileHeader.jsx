
function UserProfileHeader({ user }) {



    return (
        <div>
            <div id="profile-header">
                <div>
                    <h2>{user?.username}</h2>
                </div>
            </div>
        </div>
    )
}

export default UserProfileHeader
