import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import OpenModalButton from "../../OpenModalButton";
import DeleteBreweryModal from "../../Modals/DeleteBreweryModal";

import "./EditDeleteButtons.css"


function EditDeleteButtons({text, brewery}) {
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
            <button className="brewery-tile-ellipsis-button" ref={ellipsisRef} onClick={() => setShowButtons(!showButtons)}>{text || "..."}</button>
            {showButtons && <div className="brewery-tile-buttons">
                <button id="brewery-tile-edit" onClick={() => navigate(`/breweries/${brewery.id}/edit`)}>Edit</button>
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
