import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import "./EditDeleteButtons.css"
import OpenModalButton from "../../OpenModalButton";
import DeleteCheckInModal from "../../Modals/DeleteCheckInModal"


function EditDeleteButtons({checkIn}) {
    // const navigate = useNavigate();
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
        <div className="checkin-tile-ellipsis-button-container">
            <button className="checkin-tile-ellipsis-button" ref={ellipsisRef} onClick={() => setShowButtons(!showButtons)}>...</button>
            {showButtons && <div className="checkin-tile-buttons">
                <OpenModalButton
                    buttonId="checkin-tile-delete"
                    buttonText={'Delete'}
                    modalComponent={<DeleteCheckInModal checkIn={checkIn} />}
                />
            </div>
            }
        </div>
    )
}

export default EditDeleteButtons;
