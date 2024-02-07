import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateCheckIn } from "../../redux/checkIns";
import { useModal } from "../../context/Modal";



function CreateCheckInModal({ beer }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();


    const [body, setBody] = useState("");
    const [bodyCharCount, setBodyCharCount] = useState(0);
    const [rating, setRating] = useState(null);
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});


    function chooseRating(num) {
        setRating(num);
        if (errors.rating) {
            const newErrors = { ...errors };
            delete newErrors.rating;
            setErrors(newErrors);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErrors({});

        if (!rating) {
            setErrors({ rating: "Mugs rating is required" })
            return;
        }

        const formData = new FormData();
        formData.append("body", body);
        formData.append("rating", rating);
        formData.append("image_url", image);


        const newCheckIn = await dispatch(thunkCreateCheckIn(beer.id, formData))

        if (newCheckIn.errors) {
            setErrors(newCheckIn.errors);
            // setImageLoading(false);
            console.log(newCheckIn.errors)
        }
        else {
            closeModal();
        }
    }

    return (
        <div id='check-in-form-container'>
            <h1 id="check-in-form-heading">Check In!</h1>
            <form id='check-in-form' onSubmit={handleSubmit}>
                <textarea
                    id='check-in-body-input'
                    placeholder='Leave your review here...'
                    value={body}
                    onChange={e => {
                        setBody(e.target.value);
                        setBodyCharCount(e.target.value.length)
                    }}
                    maxLength={255}
                />
                <div id="body-char-count">{bodyCharCount}/255</div>

                <label id="image-input-label" for="check-in-image-input">{image == null ? "+Add Photo"/*<img id="check-in-add-photo" src="https://i.ibb.co/5rYHfYk/Untitled-4.png />*/ : <img id="check-in-preview-image" src={URL.createObjectURL(image)} />}</label>
                <input
                    id="check-in-image-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        setImage(e.target.files[0])
                        if (errors.image_url) {
                            const newErrors = { ...errors };
                            delete newErrors.image_url;
                            setErrors(newErrors);
                        }
                    }}
                />
                <div id="image-error-container" className="error-container">
                    {errors.image_url && <span className="error-message">*{errors.image_url}</span>}
                </div>

                <ul className="rating-list">
                    <li id='stars-word-list-item'>Mugs*</li>
                    <li onClick={() => chooseRating(5)}><i className={`fa-solid fa-beer-mug-empty ${rating >= 5 ? "filled" : "empty"}`} title="Rate 5"></i></li>
                    <li onClick={() => chooseRating(4)}><i className={`fa-solid fa-beer-mug-empty ${rating >= 4 ? "filled" : "empty"}`} title="Rate 4"></i></li>
                    <li onClick={() => chooseRating(3)}><i className={`fa-solid fa-beer-mug-empty ${rating >= 3 ? "filled" : "empty"}`}></i></li>
                    <li onClick={() => chooseRating(2)}><i className={`fa-solid fa-beer-mug-empty ${rating >= 2 ? "filled" : "empty"}`}></i></li>
                    <li onClick={() => chooseRating(1)}><i className={`fa-solid fa-beer-mug-empty ${rating >= 1 ? "filled" : "empty"}`}></i></li>
                </ul>
                <div className="error-container">
                    {errors.rating && <span className="error-message">*{errors.rating}</span>}
                </div>

                <button className='submit-button'>Confirm</button>
            </form>
        </div>
    )

}

export default CreateCheckInModal;
