import { NavLink } from "react-router-dom";

import "./CheckIn.css"

function CheckInTile() {
    return (
        <div className="check-in-tile-container">
            <NavLink>User</NavLink> is drinking <NavLink>Beer</NavLink> by <NavLink>Brewery</NavLink>
        </div>
    )

}

export default CheckInTile;
