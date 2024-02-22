import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import "./EditDeleteButtons.css"
import OpenModalButton from "../../OpenModalButton";
import DeleteBreweryModal from "../../Modals/DeleteBreweryModal";


function EditDeleteButtons({brewery}) {
    const navigate = useNavigate();
    const [showButtons, setShowButtons] = useState(false);
    const ellipsisRef = useRef();

    useEffect(() => {
        if (!showButtons) return;

        const closeMenu = (e) => {
            if (!ellipsisRef.current.contains(e.target)) {
                setShowButtons(false);
            }
        };
        document.getElementById("options-button")?.addEventListener('click', closeMenu);
        document.getElementById("profile-button")?.addEventListener('click', closeMenu);
        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showButtons]);


    return (
        <div className="brewery-tile-ellipsis-button-container">
            <button className="brewery-tile-ellipsis-button" ref={ellipsisRef} onClick={() => setShowButtons(!showButtons)}>...</button>
            {showButtons && <div className="brewery-tile-buttons">
                <button id="brewery-tile-edit" onClick={(e) => navigate(`/breweries/${brewery.id}/edit`)}>Edit</button>
                <OpenModalButton
                    buttonId="brewery-tile-delete"
                    buttonText={'Delete'}
                    modalComponent={<DeleteBreweryModal brewery={brewery} />}
                />
            </div>
            }

        </div>
    )
}

export default EditDeleteButtons;
