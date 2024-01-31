import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetBreweryById, thunkUpdateBrewery } from "../../redux/breweries";
import { useNavigate, useParams } from "react-router-dom";

import "./Forms.css";


function UpdateBreweryForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sessionUser = useSelector(state => state.session.user);
    const breweries = useSelector(state => state.breweries);
    const { brewery_id } = useParams();
    const currBrewery = breweries[brewery_id];
    console.log(breweries);
    console.log(currBrewery);


    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [city, setCity] = useState("");
    const [stateProvince, setStateProvince] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [imageLoading, setImageLoading] = useState(false);


    useEffect(() => {
        dispatch(thunkGetBreweryById(brewery_id));
    }, [brewery_id])

    useEffect(() => {
        if (currBrewery) {
            setName(currBrewery.name);
            setType(currBrewery.type);
            setCity(currBrewery.city);
            setStateProvince(currBrewery.state_province);
            setCountry(currBrewery.country);
            setDescription(currBrewery.description);
            setImage(currBrewery.image_url);
            // console.log("Image: ", currBrewery.image_url);
            setWebsiteUrl(currBrewery.website_url);
        }
    }, [currBrewery])

    // Handle no logged in user
    if (!sessionUser) {
        return <h1>Sign Up or Log In to Add Your Brewery!</h1>
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
        formData.append("website_url", websiteUrl);
        formData.append("image_url", image);
        setImageLoading(true);

        await dispatch(thunkUpdateBrewery(brewery_id, formData));

        navigate(`/breweries/${brewery_id}`);
    }

    return (
        <div>
            <h1>Update Brewery Form</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label htmlFor="name">
                    Name:
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input"
                        required
                    />
                </label>
                <label htmlFor="type">
                    Type:
                    <input
                        id="type"
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="input"
                        required
                    />
                </label>
                <label htmlFor="city">
                    City:
                    <input
                        id="city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="input"
                        required
                    />
                </label>
                <label htmlFor="state-province">
                    State/Province:
                    <input
                        id="state-province"
                        type="text"
                        value={stateProvince}
                        onChange={(e) => setStateProvince(e.target.value)}
                        className="input"
                        required
                    />
                </label>
                <label htmlFor="country">
                    Country:
                    <input
                        id="country"
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="input"
                        required
                    />
                </label>
                <label htmlFor="description">
                    Description:
                    <textarea
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input"
                        required
                    />
                </label>
                <label>
                    Image:
                    <input
                        id="image-input"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </label>
                {(imageLoading)&& <p>Loading...</p>}
                <label>
                    Website URL:
                    <input
                        id="website-url"
                        type="text"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        className="input"
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default UpdateBreweryForm;
