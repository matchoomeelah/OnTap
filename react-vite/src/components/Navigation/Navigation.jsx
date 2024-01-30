import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate();

  return (
    <nav>
      <div id="left-nav-content">
        <img onClick={() => navigate("/")} id="logo" src={"https://i.ibb.co/n1RDxpj/On-Tap-Logo.png"} alt="Home" />
        <div id="nav-links-div">
          <NavLink to="/beers" className="nav-link">Beers</NavLink>
          <NavLink to="/breweries" className="nav-link">Breweries</NavLink>
        </div>
      </div>

      <ProfileButton />
    </nav>
  );
}

export default Navigation;
