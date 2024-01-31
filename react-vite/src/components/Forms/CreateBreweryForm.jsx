import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateBrewery } from "../../redux/breweries";
import { useNavigate } from "react-router-dom";

import "./Forms.css";

function CreateBreweryForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sessionUser = useSelector(state => state.session.user);

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [city, setCity] = useState("");
    const [stateProvince, setStateProvince] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [imageLoading, setImageLoading] = useState(false);

    // Handle no logged in user
    if (!sessionUser) {
        // return <h1>Sign Up or Log In to Add Your Brewery!</h1>
        return navigate('/');
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("type", type);
        formData.append("city", city);
        formData.append("state_province", stateProvince);
        formData.append("country", country);
        formData.append("description", description);
        formData.append("image_url", image);
        formData.append("website_url", websiteUrl);
        setImageLoading(true);

        const newBrewery = await dispatch(thunkCreateBrewery(formData));

        navigate(`/breweries/${newBrewery.id}`);
    }

    return (
        <div id="brewery-form-container">
            <h1>Create Brewery Form</h1>
            <form className="brewery-form" onSubmit={handleSubmit} encType="multipart/form-data">
                <label htmlFor="name">
                    Name*
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                    required
                />

                <label htmlFor="type">
                    Type
                </label>
                <input
                    id="type"
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="input"
                    required
                />

                <label htmlFor="city">
                    City
                </label>
                <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="input"
                    required
                />

                <label htmlFor="state-province">
                    State/Province
                </label>
                <input
                    id="state-province"
                    type="text"
                    value={stateProvince}
                    onChange={(e) => setStateProvince(e.target.value)}
                    className="input"
                    required
                />
                <label htmlFor="country">
                    Country
                    </label>
                    <input
                        id="country"
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="input"
                        required
                    />
                <label htmlFor="description">
                    Description
                    </label>
                    <textarea
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input"
                        required
                    />
                <label>
                    Logo
                    </label>
                    <input
                        id="image-input"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                {(imageLoading) && <p>Loading...</p>}
                <label>
                    Website URL
                    </label>
                    <input
                        id="website-url"
                        type="text"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        className="input"
                    />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateBreweryForm;
