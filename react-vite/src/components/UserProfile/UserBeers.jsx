import BeerBrowseTile from "../Beer/BeerBrowseTile";
import BeerTile from "../Beer/BeerTile"

function UserBeers({ profileUser }) {
    return (
        <div id="user-beers-container">
            {profileUser?.beers.length === 0 ?
                <div id="no-beers-placeholder">
                    <div id="no-beers-text">No beers created yet!</div>
                </div>
            :
            <div>
                {profileUser?.beers.map(beer => {
                    return (
                        <div key={beer.id}>
                            {/* <BeerTile beer={beer} /> */}
                            <BeerBrowseTile beer={beer} />
                        </div>
                    )
                })}
            </div>
            }
        </div>
    )
}

export default UserBeers;
