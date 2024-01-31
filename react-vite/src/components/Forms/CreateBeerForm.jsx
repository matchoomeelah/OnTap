import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import Select from 'react-select'

import "./Forms.css";
import { thunkGetBreweries } from "../../redux/breweries";
import { thunkCreateBeer } from "../../redux/beers";


function CreateBeerForm() {
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const sessionUser = useSelector(state => state.session.user);
    const breweries = useSelector(state => state.breweries);

    const [name, setName] = useState("");
    const [abv, setAbv] = useState("");
    const [ibu, setIbu] = useState("");
    const [style, setStyle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [breweryId, setBreweryId] = useState(0);
    const [imageLoading, setImageLoading] = useState(false);


    const breweryOptions = Object.values(breweries).map(brewery => {
        return {
            value: brewery.id,
            label: brewery.name
        }
    })

    const BEER_STYLES = ["Ale", "Lager", "IPA", "Stout", "Pale Ale", "Witbier", "Pilsner", "Brown Ale", "Cream Ale", "Porter", "Hefeweizen", "Saison", "Bock", "Dunkel", "Barley Wine", "Amber Ale", "Red Ale", "Wheat Beer", "Double IPA", "Gose", "English IPA", "Scotch Ale", "Kölsch"];
    BEER_STYLES.sort();
    let styleOptions = BEER_STYLES.map(style => {
        return {
            value: style,
            label: style
        }
    });


    useEffect(() => {
        dispatch(thunkGetBreweries());
    }, [])

    // Handle no logged in user
    if (!sessionUser) {
        return <h1>Sign Up or Log In to Add Your Beer!</h1>
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("abv", abv);
        formData.append("ibu", ibu);
        formData.append("style", style);
        formData.append("description", description);
        formData.append("image_url", image);
        formData.append("brewery_id", breweryId);
        setImageLoading(true);

        console.log("submitting")

        const newBeer = await dispatch(thunkCreateBeer(formData));

        console.log(newBeer)
        navigate(`/beers/${newBeer.id}`);
    }


    return (
        <div id="beer-form-container">
            <h1>Create Beer Form</h1>
            <form className="beer-form" onSubmit={handleSubmit} encType="multipart/form-data">
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
                <label htmlFor="brewery">
                    Brewery*
                </label>
                <Select
                    id="brewery"
                    onChange={e => setBreweryId(e.value)}
                    options={breweryOptions}
                />
                <label htmlFor="abv">
                    ABV*
                </label>
                <input
                    id="abv"
                    type="text"
                    value={abv}
                    onChange={(e) => setAbv(e.target.value)}
                    className="input"
                    required
                />
                <label htmlFor="ibu">
                    IBU*
                </label>
                <input
                    id="ibu"
                    type="text"
                    value={ibu}
                    onChange={(e) => setIbu(e.target.value)}
                    className="input"
                    required
                />
                <label htmlFor="style">
                    Style*
                </label>
                <Select
                    id="brewery"
                    onChange={e => setStyle(e.value)}
                    options={styleOptions}
                />
                <label htmlFor="description">
                    Description*
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}>
                </textarea>
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
                <button type="submit">Submit</button>
            </form>

        </div>
    )
}

export default CreateBeerForm;
