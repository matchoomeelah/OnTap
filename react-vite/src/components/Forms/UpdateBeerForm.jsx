import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select'

import { thunkGetBeers, thunkUpdateBeer } from "../../redux/beers";
import { thunkGetBreweries } from "../../redux/breweries";
import { validateBeerForm, styleOptions } from "./form-utils";

import { useTextInput } from "../../hooks/useTextInput";
import { useReactSelect } from "../../hooks/useReactSelect";
import FormField from "./FormField";
import "./Forms.css";

function UpdateBeerForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sessionUser = useSelector(state => state.session.user);
    const breweries = useSelector(state => state.breweries);
    const beers = useSelector(state => state.beers);
    const { beer_id } = useParams();
    const currBeer = beers[beer_id];
    const currStyle = {value: currBeer?.style, label:currBeer?.style}
    const currBrewery = { value: currBeer?.brewery_id, label: currBeer?.brewery_name }

    // Create array of brewery objects for the Select input
    const breweryOptions = Object.values(breweries).sort((a, b) => a.name > b.name ? 1 : -1).map(brewery => {
        return {
            value: brewery.id,
            label: brewery.name
        }
    })

    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const errorProps = { errors, setErrors };
    const nameProps = useTextInput("name", currBeer?.name, 50, errorProps);
    const breweryIdProps = useReactSelect("brewery_id", currBrewery, breweryOptions, errorProps);
    const abvProps = useTextInput("abv", currBeer?.abv.toString(), 6, errorProps);
    const ibuProps = useTextInput("ibu", currBeer?.ibu.toString(), 3, errorProps);
    const styleProps = useReactSelect("style", currStyle, styleOptions, errorProps);
    const descriptionProps = useTextInput("description", currBeer?.description, 1500, errorProps);

    // Retrieve the current beer and breweries data
    useEffect(() => {
        if (Object.values(beers).length === 0) {
            dispatch(thunkGetBeers())
        }
        dispatch(thunkGetBreweries());
    }, [beer_id, dispatch])


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


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
        const values = {
            name: nameProps.value,
            abv: abvProps.value,
            ibu: ibuProps.value,
            description: descriptionProps.value,
            style: styleProps.selectedValue,
            breweryId: breweryIdProps.selectedValue
        }
        const formErrors = validateBeerForm(values);

        if (Object.keys(formErrors).length > 0) {
            return setErrors(formErrors);
        }

        // Create form data to send to server
        const formData = new FormData();
        formData.append("name", nameProps.value.trim());
        formData.append("brewery_id", breweryIdProps.selectedValue);
        formData.append("abv", abvProps.value.trim());
        formData.append("ibu", ibuProps.value.trim());
        formData.append("style", styleProps.selectedValue.trim());
        formData.append("description", descriptionProps.value.trim());
        formData.append("image_url", image);
        setImageLoading(true);

        const newBeer = await dispatch(thunkUpdateBeer(currBeer.id, formData));

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
                <FormField label={"Beer Name*"} errors={errors} inputComponent={<input {...nameProps} />} />
                <FormField label={"Brewery*"} errors={errors} inputComponent={<Select {...breweryIdProps} />} />
                <FormField label={"ABV*"} errors={errors} inputComponent={<input {...abvProps} />} />
                <FormField label={"IBU*"} errors={errors} inputComponent={<input {...ibuProps} />} />
                <FormField label={"Style*"} errors={errors} inputComponent={<Select {...styleProps} />} />
                <FormField label={"Description*"} errors={errors} inputComponent={<textarea {...descriptionProps} rows={5} />} />
                <div id="description-char-count">{descriptionProps.value.length}/1500</div>
                <FormField label={"Logo Image"} errors={errors} inputComponent={
                    <>
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
                    </>
                } />
                {(imageLoading) && <p>Loading...</p>}
                <button className="submit-button" type="submit">Update Beer</button>
            </form>
        </div>
    )
}

export default UpdateBeerForm;
