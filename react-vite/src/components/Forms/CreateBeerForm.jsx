import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from 'react-select'

import { thunkGetBreweries } from "../../redux/breweries";
import { thunkCreateBeer } from "../../redux/beers";
import { validateBeerForm } from "./validation";

import "./Forms.css";

function CreateBeerForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sessionUser = useSelector(state => state.session.user);
    const breweries = useSelector(state => state.breweries);

    const [name, setName] = useState("");
    const [abv, setAbv] = useState("");
    const [ibu, setIbu] = useState("");
    const [style, setStyle] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionCharCount, setDescriptionCharCount] = useState(0);
    const [image, setImage] = useState(null);
    const [breweryId, setBreweryId] = useState(0);
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Create array of brewery objects for Select input
    const breweryOptions = Object.values(breweries).sort((a, b) => a.name > b.name ? 1 : -1).map(brewery => {
        return {
            value: brewery.id,
            label: brewery.name
        }
    })

    // Create array of beer style objects for Select input
    const BEER_STYLES = ["Hazy IPA", "American IPA", "American Strong Ale", "Ale", "Lager", "IPA", "Stout", "Pale Ale", "Witbier", "Pilsner", "Brown Ale", "Cream Ale", "Porter", "Hefeweizen", "Saison", "Bock", "Dunkel", "Barley Wine", "Amber Ale", "Red Ale", "Wheat Beer", "Double IPA", "Gose", "English IPA", "Scotch Ale", "Kölsch"];
    let styleOptions = BEER_STYLES.sort().map(style => {
        return {
            value: style,
            label: style
        }
    });

    // Populate Breweries in store
    useEffect(() => {
        dispatch(thunkGetBreweries());
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({});

        // Check for front end form errors
        const formErrors = validateBeerForm(name, abv, ibu, style, description, breweryId);

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const formData = new FormData();
        formData.append("name", name.trim());
        formData.append("abv", abv.trim());
        formData.append("ibu", ibu.trim());
        formData.append("style", style.trim());
        formData.append("description", description.trim());
        formData.append("image_url", image);
        formData.append("brewery_id", breweryId);
        setImageLoading(true);

        const newBeer = await dispatch(thunkCreateBeer(formData));

        if (newBeer.errors) {
            setErrors(newBeer.errors);
            setImageLoading(false);
        }
        else {
            navigate(`/beers/${newBeer.id}`);
        }
    }

    // Handle no logged in user
    if (!sessionUser) {
        return <h1>Sign Up or Log In to Add Your Beer!</h1>
    }

    return (
        <div id="beer-form-container">
            <h1>Add a Beer</h1>

            <form className="beer-form" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="field-container">
                    <div className="form-label-container">
                        <label htmlFor="name">
                            Beer Name*
                        </label>
                        <div className="error-container">
                            {errors.name && <span className="error-message">{errors.name}</span>}
                        </div>
                    </div>
                    <input
                        type="text"
                        id="name"
                        className="input"
                        maxLength={50}
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            if (errors.name) {
                                const newErrors = { ...errors };
                                delete newErrors.name;
                                setErrors(newErrors);
                            }
                        }}
                    />
                </div>

                <div className="field-container">
                    <div className="form-label-container">
                        <label htmlFor="brewery_id">
                            Brewery*
                        </label>
                        <div className="error-container">
                            {errors.brewery_id && <span className="error-message">{errors.brewery_id}</span>}
                        </div>
                    </div>
                    <Select
                        id="brewery_id"
                        className="input"
                        options={breweryOptions}
                        onChange={(e) => {
                            setBreweryId(e.value);
                            if (errors.brewery_id) {
                                const newErrors = { ...errors };
                                delete newErrors.brewery_id;
                                setErrors(newErrors);
                            }
                        }}
                    />
                </div>

                <div className="field-container">
                    <div className="form-label-container">
                        <label htmlFor="abv">
                            ABV*
                        </label>
                        <div className="error-container">
                            {errors.abv && <span className="error-message">{errors.abv}</span>}
                        </div>
                    </div>
                    <input
                        type="text"
                        id="abv"
                        className="input"
                        maxLength={6}
                        value={abv}
                        onChange={(e) => {
                            setAbv(e.target.value);
                            if (errors.abv) {
                                const newErrors = { ...errors };
                                delete newErrors.abv;
                                setErrors(newErrors);
                            }
                        }}
                    />
                </div>

                <div className="field-container">
                    <div className="form-label-container">
                        <label htmlFor="ibu">
                            IBU*
                        </label>
                        <div className="error-container">
                            {errors.ibu && <span className="error-message">{errors.ibu}</span>}
                        </div>
                    </div>
                    <input
                        type="text"
                        id="ibu"
                        className="input"
                        maxLength={3}
                        value={ibu}
                        onChange={(e) => {
                            setIbu(e.target.value);
                            if (errors.ibu) {
                                const newErrors = { ...errors };
                                delete newErrors.ibu;
                                setErrors(newErrors);
                            }
                        }}
                    />
                </div>

                <div className="field-container">
                    <div className="form-label-container">
                        <label htmlFor="style">
                            Style*
                        </label>
                        <div className="error-container">
                            {errors.style && <span className="error-message">{errors.style}</span>}
                        </div>
                    </div>
                    <Select
                        id="style"
                        className="input"
                        options={styleOptions}
                        onChange={(e) => {
                            setStyle(e.value);
                            if (errors.style) {
                                const newErrors = { ...errors };
                                delete newErrors.style;
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
                        type="text"
                        id="description"
                        className="input"
                        maxLength={1500}
                        rows={5}
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                            setDescriptionCharCount(e.target.value.length)
                            if (errors.description) {
                                const newErrors = { ...errors };
                                delete newErrors.description;
                                setErrors(newErrors);
                            }
                        }}
                    />
                    <div id="description-char-count">{descriptionCharCount}/1500</div>
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
                        type="file"
                        id="image-input"
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
                <button className="submit-button" type="submit">Create Beer</button>
            </form>
        </div>
    )
}

export default CreateBeerForm;
