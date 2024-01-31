
function UserProfileHeader({ user }) {



    return (
        <div>
            <div id="profile-header">
                {/* <img src={currBrewery?.image_url} /> */}
                <div>
                    <h2>{user?.username}</h2>
                    {/* <p>{currBrewery?.city}, {currBrewery?.state_province}, {currBrewery?.country}</p>
                    <p>{currBrewery?.type}</p>
                    <a href={currBrewery?.website_url}>{currBrewery?.website_url}</a> */}
                </div>
            </div>
        </div>
    )
}

export default UserProfileHeader
