import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Select from 'react-select'

import { thunkGetBeerById, thunkUpdateBeer } from "../../redux/beers";
import { thunkGetBreweries } from "../../redux/breweries";
import { validateBeerForm } from "./validation";

import "./Forms.css";

function UpdateBeerForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sessionUser = useSelector(state => state.session.user);
    const breweries = useSelector(state => state.breweries);
    const beers = useSelector(state => state.beers);
    const { beer_id } = useParams();
    const currBeer = beers[beer_id];

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

    // Retrieve the current beer and breweries data
    useEffect(() => {
        dispatch(thunkGetBeerById(beer_id));
        dispatch(thunkGetBreweries());
    }, [beer_id])

    // Prepopulate the form fields
    useEffect(() => {
        if (currBeer) {
            setName(currBeer.name);
            setAbv(currBeer.abv.toString());
            setIbu(currBeer.ibu.toString());
            setStyle(currBeer.style);
            setDescription(currBeer.description);
            setDescriptionCharCount(currBeer.description.length)
            setImage(currBeer.image_url);
            setBreweryId(currBeer.brewery_id);
        }
    }, [currBeer])


    // Create array of brewery objects for the Select input
    const breweryOptions = Object.values(breweries).sort((a, b) => a.name > b.name ? 1 : -1).map(brewery => {
        return {
            value: brewery.id,
            label: brewery.name
        }
    })

    // Create array of beer style object for the Select input
    const BEER_STYLES = ["American IPA", "American Strong Ale", "Ale", "Lager", "IPA", "Stout", "Pale Ale", "Witbier", "Pilsner", "Brown Ale", "Cream Ale", "Porter", "Hefeweizen", "Saison", "Bock", "Dunkel", "Barley Wine", "Amber Ale", "Red Ale", "Wheat Beer", "Double IPA", "Gose", "English IPA", "Scotch Ale", "Kölsch"];
    let styleOptions = BEER_STYLES.sort().map(style => {
        return {
            value: style,
            label: style
        }
    });

    // Changes image title
    const changeImageTitle = () => {
        const imageInput = document.getElementById("image-input");
        const origUrl = document.getElementById("orig-url");
        imageInput.classList.toggle("hidden-image-title");
        origUrl.classList.toggle("hidden-image-title");
    }


    // Executes when form is submitted
    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({});

        // Check for front end form errors
        const formErrors = validateBeerForm(name, abv, ibu, style, description, breweryId);

        if (Object.keys(formErrors).length > 0) {
            console.log(formErrors)
            setErrors(formErrors);
            return;
        }

        // Create form data to send to server
        const formData = new FormData();
        formData.append("name", name.trim());
        formData.append("abv", abv.trim());
        formData.append("ibu", ibu.trim());
        formData.append("style", style.trim());
        formData.append("description", description.trim());
        formData.append("image_url", image);
        formData.append("brewery_id", breweryId);
        setImageLoading(true);

        const newBeer = await dispatch(thunkUpdateBeer(breweryId, formData));

        // Backend error handling
        if (newBeer.errors) {
            setErrors(newBeer.errors);
            setImageLoading(false);
        }
        else {
            navigate(`/beers/${newBeer.id}`);
        }
    }

    // Handle wrong user
    if (!sessionUser || currBeer?.creator_id !== sessionUser?.id) {
        return null;
    }

    return (
        <div id="beer-form-container">
            <h1>Update Beer</h1>

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
                        defaultValue={{ value: currBeer?.brewery_id, label: currBeer?.brewery_name }}
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
                        id="abv"
                        type="text"
                        value={abv}
                        className="input"
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
                        id="ibu"
                        type="text"
                        value={ibu}
                        className="input"
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
                        defaultValue={{value: currBeer.style, label:currBeer.style}}
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
                        id="description"
                        type="text"
                        value={description}
                        rows={5}
                        className="input"
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
                        id="image-input"
                        type="file"
                        accept="image/*"
                        className="hidden-image-title"
                        onChange={(e) => {
                            setImage(e.target.files[0])
                            if (errors.image_url) {
                                const newErrors = { ...errors };
                                delete newErrors.image_url;
                                setErrors(newErrors);
                            }
                            changeImageTitle();
                        }}
                    />
                    <span id="orig-url">{currBeer?.orig_image_url}</span>
                </div>
                {(imageLoading) && <p>Loading...</p>}
                <button className="submit-button" type="submit">Update Beer</button>
            </form>
        </div>
    )
}

export default UpdateBeerForm;
