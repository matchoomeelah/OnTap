import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import OpenModalButton from "../../OpenModalButton";
import DeleteBeerModal from "../../Modals/DeleteBeerModal";
import "./EditDeleteButtons.css"


function EditDeleteButtons({ beer }) {
    const navigate = useNavigate();
    const [showButtons, setShowButtons] = useState(false);
    const ellipsisRef = useRef();

    useEffect(() => {
        if (!showButtons) return;

        const closeMenu = (e) => {
            if (ellipsisRef.current && !ellipsisRef.current.contains(e.target)) {
                setShowButtons(false);
            }
        };

        document.querySelector("nav").addEventListener('click', closeMenu);
        document.addEventListener('click', closeMenu);

        return () => {
            document.removeEventListener("click", closeMenu);
            document.removeEventListener("click", closeMenu);
        }
    }, [showButtons]);


    return (
        <div className="brewery-tile-ellipsis-button-container">
            <button className="brewery-tile-ellipsis-button" ref={ellipsisRef} onClick={() => setShowButtons(!showButtons)}>...</button>
            {showButtons && <div className="brewery-tile-buttons">
                <button id="brewery-tile-edit" onClick={() => navigate(`/beers/${beer.id}/edit`)}>Edit</button>
                <OpenModalButton
                    buttonId="brewery-tile-delete"
                    buttonText={'Delete'}
                    modalComponent={<DeleteBeerModal beer={beer} />}
                />
            </div>
            }
        </div>
    )
}

export default EditDeleteButtons;
