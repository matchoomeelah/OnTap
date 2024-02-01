import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { thunkGetBeerById, thunkUpdateBeer } from "../../redux/beers";
import { thunkGetBreweries } from "../../redux/breweries";


import Select from 'react-select'
import "./Forms.css";

function UpdateBeerForm({preBrewery}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const sessionUser = useSelector(state => state.session.user);
    const breweries = useSelector(state => state.breweries);
    const beers = useSelector(state => state.beers);
    const { beer_id } = useParams();


    const currBeer = beers[beer_id];
    const currBrewery = breweries[currBeer?.brewery_id]
    console.log(currBeer);
    console.log(currBrewery);

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

    const initialValue = breweryOptions.find(opt => opt.value === breweryId);

    const BEER_STYLES = ["Ale", "Lager", "IPA", "Stout", "Pale Ale", "Witbier", "Pilsner", "Brown Ale", "Cream Ale", "Porter", "Hefeweizen", "Saison", "Bock", "Dunkel", "Barley Wine", "Amber Ale", "Red Ale", "Wheat Beer", "Double IPA", "Gose", "English IPA", "Scotch Ale", "Kölsch"];
    BEER_STYLES.sort();
    let styleOptions = BEER_STYLES.map(style => {
        return {
            value: style,
            label: style
        }
    });

    useEffect(() => {
        dispatch(thunkGetBeerById(beer_id));
        dispatch(thunkGetBreweries());
    }, [beer_id])

    useEffect(() => {
        if (currBeer) {
            setName(currBeer.name);
            setAbv(currBeer.abv);
            setIbu(currBeer.ibu);
            setStyle(currBeer.style);
            setDescription(currBeer.description);
            setImage(currBeer.image_url);
            setBreweryId(currBeer.brewery_id);
        }
    }, [currBeer])

     // Handle no logged in user
     if (!sessionUser) {
        // return <h1>Sign Up or Log In to Add Your Brewery!</h1>
        return navigate('/');
    }

    // Handle wrong user
    if (currBeer && sessionUser && currBeer?.creator_id !== sessionUser?.id) {
        return navigate('/');
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

        const newBeer = await dispatch(thunkUpdateBeer(beer_id, formData));

        console.log(newBeer)
        navigate(`/beers/${newBeer.id}`);
    }

    return (
        <div id="beer-form-container">
            <h1>Update Beer Form</h1>
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
                    defaultValue={{...initialValue}}
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

export default UpdateBeerForm;
