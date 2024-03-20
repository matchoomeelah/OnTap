import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import EditDeleteButtons from "./EditDeleteButtons/EditDeleteButtons";

function BreweryTile({ brewery }) {
    const sessionUser = useSelector(state => state.session.user);
    const [showButtons, setShowButtons] = useState(false);
    const ellipsisRef = useRef();

    function setDefaultImage() {
        const breweryLogo = document.getElementById(`brewery-logo${brewery.id}`);
        breweryLogo.src = "https://i.ibb.co/ys9X0Jg/brewery-default.jpg";
    }

    function getRatingInfo(brewery) {
        let numRatings = 0;
        let totalMugs = 0;

        for (let check_in of brewery.check_ins) {
            numRatings++;
            totalMugs += check_in.rating;
        }

        const rating = numRatings === 0 || totalMugs === 0 ? "New" : parseFloat(totalMugs / numRatings).toFixed(1);

        return { rating, numRatings };
    }

    const breweryRatingInfo = getRatingInfo(brewery);

    useEffect(() => {
        if (!showButtons) return;

        const closeMenu = (e) => {
          if (ellipsisRef.current && !ellipsisRef.current.contains(e.target)) {
            setShowButtons(false);
          }
        };
        document.getElementById("options-button")?.addEventListener('click', closeMenu);
        document.getElementById("profile-button")?.addEventListener('click', closeMenu);
        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
      }, [showButtons]);


    return (
        <div className="brewery-tile">
            <div className="brewery-tile-top-content">
                <img id={`brewery-logo${brewery.id}`} className="brewery-tile-image" src={brewery.image_url} alt="Brewery Image" onError={setDefaultImage} />
                <div className="brewery-tile-top-info">
                    <NavLink to={`/breweries/${brewery.id}`} className="brewery-tile-name">{brewery.name}</NavLink>
                    <div id="city-state-country">{brewery.city}, {brewery.state_province}, {brewery.country}</div>
                    <div id="brewery-tile-type">{brewery.type}</div>
                </div>
            </div>
            {brewery.creator_id === sessionUser?.id &&
                <EditDeleteButtons brewery={brewery} />
            }
            <div>
                <div className="brewery-stats">
                    <div className="brewery-tile-bottom-section">
                        {brewery.beers.length} {brewery.beers.length === 1 ? "Beer" : "Beers"}
                    </div>
                    <div className="brewery-tile-vertical-line"></div>
                    <div className="brewery-tile-bottom-section">
                        <i id="brewery-tile-mug" className="fa-solid fa-beer-mug-empty"></i>{breweryRatingInfo.rating}
                    </div>
                    <div className="brewery-tile-vertical-line"></div>
                    <div className="brewery-tile-bottom-section">
                        {breweryRatingInfo.numRatings} {breweryRatingInfo.numRatings === 1 ? "Rating" : "Ratings"}
                    </div>
                </div>
            </div>
        </div>

    )



    // return (
    //     <div className="brewery-tile" onClick={() => navigate(`/breweries/${brewery.id}`)}>
    //         <img className="brewery-tile-image" src={brewery.image_url} alt="brewery Image" />
    //         <div className="brewery-tile-info">
    //             <div id="brewery-tile-name">{brewery.name}</div>
    //             <div id="city-state-country">{brewery.city}, {brewery.state_province}, {brewery.country}</div>
    //             <div>{brewery?.beers.length} {brewery?.beers.length === 1 ? "Beer" : "Beers"}</div>
    //             <div id="brewery-buttons-container">
    //                 {brewery?.creator_id === sessionUser?.id &&
    //                     <div className="brewery-buttons">
    //                         <button id="brewery-tile-edit" onClick={(e) => { e.stopPropagation(); navigate(`/breweries/${brewery.id}/edit`) }}>Edit</button>
    //                         <OpenModalButton
    //                             onButtonClick={(e) => e.stopPropagation()}
    //                             buttonId="brewery-tile-delete"
    //                             buttonText={'Delete'}
    //                             modalComponent={<DeleteBreweryModal brewery={brewery} />}
    //                         />
    //                     </div>
    //                 }
    //             </div>
    //         </div>
    //     </div>
    // )
}

export default BreweryTile;
