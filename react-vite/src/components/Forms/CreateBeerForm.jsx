import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from 'react-select'

import { thunkGetBreweries } from "../../redux/breweries";
import { thunkCreateBeer } from "../../redux/beers";
import { validateBeerForm, styleOptions } from "./form-utils";

import { useTextInput } from "../../hooks/useTextInput";
import { useReactSelect } from "../../hooks/useReactSelect";
import FormField from "./FormField";
import "./Forms.css";

function CreateBeerForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sessionUser = useSelector(state => state.session.user);
    const breweries = useSelector(state => state.breweries);
    const [errors, setErrors] = useState({});

    // Create array of brewery objects for Select input
    const breweryOptions = Object.values(breweries).sort((a, b) => a.name > b.name ? 1 : -1).map(brewery => {
        return {
            value: brewery.id,
            label: brewery.name
        }
    });

    const errorProps = { errors, setErrors };
    const nameProps = useTextInput("name", "", 50, errorProps);
    const breweryIdProps = useReactSelect("brewery_id", null, breweryOptions, errorProps);
    const abvProps = useTextInput("abv", "", 6, errorProps);
    const ibuProps = useTextInput("ibu", "", 3, errorProps);
    const styleProps = useReactSelect("style", null, styleOptions, errorProps);
    const descriptionProps = useTextInput("description", "", 1500, errorProps);


    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    // Populate Breweries in store
    useEffect(() => {
        dispatch(thunkGetBreweries());
    }, [dispatch])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

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

        // Submit form
        const formData = new FormData();
        formData.append("name", nameProps.value.trim());
        formData.append("abv", abvProps.value.trim());
        formData.append("ibu", ibuProps.value.trim());
        formData.append("style", styleProps.selectedValue.trim());
        formData.append("description", descriptionProps.value.trim());
        formData.append("image_url", image);
        formData.append("brewery_id", breweryIdProps.selectedValue);
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
                <FormField label={"Beer Name*"} errors={errors} inputComponent={<input {...nameProps} />} />
                <FormField label={"Brewery*"} errors={errors} inputComponent={<Select {...breweryIdProps} />} />
                <FormField label={"ABV*"} errors={errors} inputComponent={<input {...abvProps} />} />
                <FormField label={"IBU*"} errors={errors} inputComponent={<input {...ibuProps} />} />
                <FormField label={"Style*"} errors={errors} inputComponent={<Select {...styleProps} />} />
                <FormField label={"Description*"} errors={errors} inputComponent={<textarea {...descriptionProps} rows={5} />} />
                <div id="description-char-count">{descriptionProps.value.length}/1500</div>
                <FormField label={"Logo Image"} errors={errors} inputComponent={
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
                } />
                {(imageLoading) && <p>Loading...</p>}
                <button className="submit-button" type="submit">Create Beer</button>
            </form>
        </div>
    )
}

export default CreateBeerForm;
