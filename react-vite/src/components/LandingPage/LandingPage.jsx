import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SignupFormModal from "../Modals/SignupFormModal/SignupFormModal";
import "./LandingPage.css"

function LandingPage() {
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div id="landing-page-container">
            <div id="landing-page-banner">
                {/* <img id="landing-page-banner-image" src="https://on-tap-bucket.s3.us-west-1.amazonaws.com/Screenshot+2024-02-04+at+8.48.48+PM.png" /> */}
                <img id="landing-page-banner-image" src="https://on-tap-bucket.s3.us-west-1.amazonaws.com/Screenshot+2024-02-04+at+8.47.30+PM.png" />
                {/* <img id="landing-page-banner-image" src="https://on-tap-bucket.s3.us-west-1.amazonaws.com/Screenshot+2024-02-04+at+8.41.26+PM.png" /> */}
                {/* <img id="landing-page-banner-image" src="https://on-tap-bucket.s3.us-west-1.amazonaws.com/landing_page1.jpeg" /> */}
                {/* <div id="landing-page-banner-text">
                    <h1>Beer Lovers Unite</h1>
                    <div>Whether you're a sipper or a chugger, we're all here for the love of beer.</div>
                </div> */}
            </div>
            <div id="landing-page-info-tiles">
                <div className="info-tile">
                    <div className="info-tile-title">Beers</div>
                    <div className="info-tile-text">Discover new and trending beers, or kick back with your old favorites.</div>
                    <div className="info-tile-link" onClick={() => navigate("/beers")}>Browse Beer</div>
                </div>
                <div className="info-tile">
                    <div className="info-tile-title">Breweries</div>
                    <div className="info-tile-text">Browse our list of breweries and what they brew. Maybe you'll learn a thing or two along the way.</div>
                    <div className="info-tile-link" onClick={() => navigate("/breweries")}>Browse Breweries</div>
                </div>
                <div className="info-tile">
                    <div className="info-tile-title">Check-Ins</div>
                    <div className="info-tile-text">Let your friends know what you're drinking and see what they're putting down, because beer is better with friends.</div>
                    {/* <div className="info-tile-link">Get Started</div> */}
                    {!sessionUser && <OpenModalButton
                        buttonId="get-started-button"
                        buttonText={'Get Started'}
                        modalComponent={<SignupFormModal />}
                    />}
                </div>

            </div>

        </div>
    )
}

export default LandingPage;
