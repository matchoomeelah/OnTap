import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import "./EditDeleteButtons.css"
import OpenModalButton from "../../OpenModalButton";
import DeleteCommentModal from "../../Modals/DeleteCommentModal"
import UpdateCommentModal from "../../Modals/UpdateCommentModal";


function EditDeleteButtons({ beerId, comment }) {
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
        <div className="comment-tile-ellipsis-button-container">
            <button className="comment-tile-ellipsis-button" ref={ellipsisRef} onClick={() => setShowButtons(!showButtons)}>...</button>
            {showButtons && <div className="comment-tile-buttons">
                <OpenModalButton
                    buttonId="comment-tile-edit"
                    buttonText={'Edit'}
                    modalComponent={<UpdateCommentModal beerId={beerId} comment={comment} />}
                />
                <OpenModalButton
                    buttonId="comment-tile-delete"
                    buttonText={'Delete'}
                    modalComponent={<DeleteCommentModal beerId={beerId} comment={comment} />}
                />
            </div>
            }
        </div>
    )
}

export default EditDeleteButtons;
