import { useNavigate } from "react-router-dom";
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
                {/* <img id="landing-page-banner-image" src="https://i.ibb.co/rQW6BxX/beer-banner.jpg" /> */}
                {/* <img id="landing-page-banner-image" src="https://i.ibb.co/2Ky7V2D/beer-banner-new-1.jpg" /> */}
                <div id="landing-page-banner-image">
                    {/* <img id="landing-page-banner-image-content" src="https://i.ibb.co/VQcFcWW/beer-flight-2.jpg" /> */}
                    <img id="landing-page-banner-image-content" src="https://i.ibb.co/GdhLNPt/beer-flight-1.jpg" />
                </div>
                <div id="landing-page-banner-text">
                    <div id="beer-lovers">Beer Lovers Unite</div>
                    <div id="tagline">Whether you're a sipper or a chugger, we're all here for the love of beer</div>
                </div>
            </div>
            <div id="landing-page-info-tiles">
                <div className="info-tile">
                    <div className="info-tile-title">Beers</div>
                    <div className="info-tile-text">Discover new and trending beers, or kick back with your old favorites.</div>
                    <div className="info-tile-link" onClick={() => navigate("/beers")}>Browse Beers</div>
                </div>
                <div className="info-tile">
                    <div className="info-tile-title">Breweries</div>
                    <div className="info-tile-text">Browse our list of breweries and what they brew. Maybe you'll learn a thing or two along the way.</div>
                    <div className="info-tile-link" onClick={() => navigate("/breweries")}>Browse Breweries</div>
                </div>
                <div className="info-tile">
                    <div className="info-tile-title">Check-Ins</div>
                    <div className="info-tile-text">Let your friends know what you're drinking and see what they're putting down, because beer is better with friends.</div>
                    <div id="get-started-container">{!sessionUser && <OpenModalButton
                        buttonId="get-started-button"
                        buttonText={'Get Started'}
                        modalComponent={<SignupFormModal />}
                    />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;
