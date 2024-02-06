import BreweryTile from "../Brewery/BreweryTile";

function UserBreweries({profileUser}) {
    return (
        <div>
            {profileUser?.breweries.length === 0 ?
                <div id="no-breweries-placeholder">
                    <div id="no-breweries-text">No breweries created yet!</div>
                </div>
            :
            profileUser?.breweries.map(brewery => {
                return (
                    <div key={brewery.id}>
                        <BreweryTile brewery={brewery} />
                    </div>
                )
            })}
        </div>
    )
}

export default UserBreweries;
