import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateBrewery } from "../../redux/breweries";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import "./Forms.css";

function CreateBreweryForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sessionUser = useSelector(state => state.session.user);

    // State variables
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [city, setCity] = useState("");
    const [stateProvince, setStateProvince] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Create array of brewery type objects for the Select input
    const breweryTypes = ["Microbrewery", "Macrobrewery", "Nanobrewery", "Regional Brewery", "Brewpub", "Taproom", "Craft Brewery", "Contract Brewing Company"];
    const breweryTypeOptions = breweryTypes.sort().map(type => {
        return {
            value: type,
            label: type
        }
    })

    // Executes when form is submitted
    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({});

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

        console.log(newBrewery);

        if (newBrewery.errors) {
            setErrors(newBrewery.errors);
            setImageLoading(false);
        }
        else {
            navigate(`/breweries/${newBrewery.id}`);
        }
    }

    // Handle no logged in user
    if (!sessionUser) {
        return <h1>Sign Up or Log In to Add Your Brewery!</h1>
    }

    return (
        <div id="brewery-form-container">
            <h1>Create Brewery</h1>

            <form className="brewery-form" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="field-container">
                    <div className="form-label-container">
                        <label htmlFor="name">
                            Brewery Name*
                        </label>
                        <div className="error-container">
                            {errors.name && <span className="error-message">{errors.name}</span>}
                        </div>
                    </div>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            if (errors.name) {
                                const newErrors = { ...errors };
                                delete newErrors.name;
                                setErrors(newErrors);
                            }
                        }}
                        className="input"
                    />
                </div>

                <div className="field-container">
                    <div className="form-label-container">
                        <label htmlFor="type">
                            Type*
                        </label>
                        <div className="error-container">
                            {errors.type && <span className="error-message">{errors.type}</span>}
                        </div>
                    </div>
                    <Select
                        id="type"
                        options={breweryTypeOptions}
                        className="input"
                        onChange={(e) => {
                            setType(e.value);
                            if (errors.type) {
                                const newErrors = { ...errors };
                                delete newErrors.type;
                                setErrors(newErrors);
                            }
                        }}
                    />
                </div>

                <div className="field-container">
                    <div className="form-label-container">
                        <label htmlFor="city">
                            City*
                        </label>
                        <div className="error-container">
                            {errors.city && <span className="error-message">{errors.city}</span>}
                        </div>
                    </div>
                    <input
                        id="city"
                        type="text"
                        value={city}
                        className="input"
                        onChange={(e) => {
                            setCity(e.target.value);
                            if (errors.city) {
                                const newErrors = { ...errors };
                                delete newErrors.city;
                                setErrors(newErrors);
                            }
                        }}
                    />
                </div>

                <div className="field-container">
                    <div className="form-label-container">
                        <label htmlFor="state-province">
                            State/Province*
                        </label>
                        <div className="error-container">
                            {errors.state_province && <span className="error-message">{errors.state_province}</span>}
                        </div>
                    </div>
                    <input
                        id="state-province"
                        type="text"
                        value={stateProvince}
                        className="input"
                        onChange={(e) => {
                            setStateProvince(e.target.value);
                            if (errors.state_province) {
                                const newErrors = { ...errors };
                                delete newErrors.state_province;
                                setErrors(newErrors);
                            }
                        }}
                    />
                </div>

                <div className="field-container">
                    <div className="form-label-container">
                        <label htmlFor="country">
                            Country*
                        </label>
                        <div className="error-container">
                            {errors.country && <span className="error-message">{errors.country}</span>}
                        </div>
                    </div>
                    <input
                        id="country"
                        className="input"
                        type="text"
                        value={country}
                        onChange={(e) => {
                            setCountry(e.target.value);
                            if (errors.country) {
                                const newErrors = { ...errors };
                                delete newErrors.country;
                                setErrors(newErrors);
                            }
                        }}
                    />
                </div>

                <div className="field-container">
                    <div className="form-label-container">
                        <label htmlFor="description">
                            Description*
                        </label>
                        <div className="error-container">
                            {errors.description && <span className="error-message">{errors.description}</span>}
                        </div>
                    </div>
                    <textarea
                        id="description"
                        type="text"
                        value={description}
                        className="input"
                        onChange={(e) => {
                            setDescription(e.target.value);
                            if (errors.description) {
                                const newErrors = { ...errors };
                                delete newErrors.description;
                                setErrors(newErrors);
                            }
                        }}
                    />
                </div>

                <div className="field-container">
                    <div className="form-label-container">
                        <label>
                            Website URL
                        </label>
                        <div className="error-container">
                            {errors.website_url && <span className="error-message">{errors.website_url}</span>}
                        </div>
                    </div>
                    <input
                        id="website-url"
                        type="text"
                        value={websiteUrl}
                        className="input"
                        onChange={(e) => {
                            setWebsiteUrl(e.target.value);
                            if (errors.website_url) {
                                const newErrors = { ...errors };
                                delete newErrors.website_url;
                                setErrors(newErrors);
                            }
                        }}
                    />
                </div>

                <div className="field-container">
                    <div className="form-label-container">
                        <label>
                            Logo Image
                        </label>
                        <div className="error-container">
                            {errors.image_url && <span className="error-message">{errors.image_url}</span>}
                        </div>
                    </div>
                    <input
                        id="image-input"
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
                </div>
                {(imageLoading) && <p>Loading...</p>}
                <button className="submit-button" type="submit">Create Brewery</button>
            </form>
        </div>
    )
}

export default CreateBreweryForm;
