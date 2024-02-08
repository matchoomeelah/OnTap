import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../Modals/LoginFormModal/LoginFormModal";
import SignupFormModal from "../Modals/SignupFormModal/SignupFormModal";
import OptionsButton from "./OptionsButton";


function Navigation() {
  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav>
      <OptionsButton />
      <img onClick={() => navigate("/")} id="logo" src={"https://i.ibb.co/n1RDxpj/On-Tap-Logo.png"} alt="Home" />
      <div id="nav-links-div">
        <NavLink to="/beers" className="nav-link">Beers</NavLink>
        <NavLink to="/breweries" className="nav-link">Breweries</NavLink>
      </div>
      <div id="nav-right-content">
        {
          sessionUser ? <ProfileButton id='profile-button' user={sessionUser} />
            :
            <div id="nav-bar-login-signup-buttons">
              <OpenModalButton
                buttonId="nav-bar-login-button"
                buttonText={'Log In'}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalButton
                buttonId="nav-bar-signup-button"
                buttonText={'Sign Up'}
                modalComponent={<SignupFormModal />}
              />
            </div>
        }
      </div>
    </nav >
  );
}

export default Navigation;
