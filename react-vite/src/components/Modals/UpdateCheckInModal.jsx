import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";

function UpdateCheckInModal() {

    return <h1>Update Check In</h1>
    // const dispatch = useDispatch();
    // const { closeModal } = useModal();

    // const [body, setBody] = useState("");
    // const [bodyCharCount, setBodyCharCount] = useState(0);
    // const [rating, setRating] = useState(null);
    // const [image, setImage] = useState(null);
    // const [errors, setErrors] = useState({});

    // async function handleSubmit(e) {
    //     e.preventDefault();
    //     setErrors({});

    //     const formData = new FormData();
    //     formData.append("body", body);
    //     formData.append("rating", rating);
    //     formData.append("image_url", image);

    //     const newCheckIn = await dispatch(thunkCreateCheckIn(beer.id, formData))

    //     if (newCheckIn.errors) {
    //         setErrors(newBeer.errors);
    //         setImageLoading(false);
    //     }
    //     else {
    //         closeModal();
    //     }
    // }



    // return (
    //     <div id='check-in-form-container'>
    //         <h1 id="check-in-form-heading">Check In!</h1>
    //         <form id='check-in-form' onSubmit={handleSubmit}>
    //             <textarea
    //                 id='check-in-body-input'
    //                 placeholder='Leave your review here...'
    //                 value={body}
    //                 onChange={e => {
    //                     setBody(e.target.value);
    //                     setBodyCharCount(e.target.value.length)
    //                 }}
    //                 maxLength={255}
    //             />
    //             <div id="body-char-count">{bodyCharCount}/255</div>

    //             <ul className="rating-list">
    //                 <li id='stars-word-list-item'>Mugs</li>
    //                 <li onClick={() => setRating(5)}><i className={`fa-solid fa-beer-mug-empty ${rating >= 5 ? "filled" : "empty"}`} title="Rate 5"></i></li>
    //                 <li onClick={() => setRating(4)}><i className={`fa-solid fa-beer-mug-empty ${rating >= 4 ? "filled" : "empty"}`} title="Rate 4"></i></li>
    //                 <li onClick={() => setRating(3)}><i className={`fa-solid fa-beer-mug-empty ${rating >= 3 ? "filled" : "empty"}`}></i></li>
    //                 <li onClick={() => setRating(2)}><i className={`fa-solid fa-beer-mug-empty ${rating >= 2 ? "filled" : "empty"}`}></i></li>
    //                 <li onClick={() => setRating(1)}><i className={`fa-solid fa-beer-mug-empty ${rating >= 1 ? "filled" : "empty"}`}></i></li>
    //             </ul>

    //             <input
    //                     id="image-input"
    //                     type="file"
    //                     accept="image/*"
    //                     onChange={(e) => {
    //                         setImage(e.target.files[0])
    //                         if (errors.image_url) {
    //                             const newErrors = { ...errors };
    //                             delete newErrors.image_url;
    //                             setErrors(newErrors);
    //                         }
    //                     }}
    //                 />

    //             <button className='submit-button'>Confirm</button>
    //         </form>
    //     </div>
    // )
}

export default UpdateCheckInModal;
