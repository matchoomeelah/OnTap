import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { thunkGetBreweryById, thunkUpdateBrewery } from "../../redux/breweries";
import { useNavigate, useParams } from "react-router-dom";
import { thunkGetBeerById } from "../../redux/beers";

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
    const [image, setImage] = useState(null);
    const [breweryId, setBreweryId] = useState(0);
    const [imageLoading, setImageLoading] = useState(false);


    useEffect(() => {
        dispatch(thunkGetBeerById(beer_id));
    }, [beer_id])

    useEffect(() => {
        if (currBeer) {
            setName(currBeer.name);
            setType(currBeer.type);
            setCity(currBeer.city);
            setStateProvince(currBeer.state_province);
            setCountry(currBeer.country);
            setDescription(currBeer.description);
            setImage(currBeer.image_url);
            // console.log("Image: ", currBeer.image_url);
            setWebsiteUrl(currBeer.website_url);
        }
    }, [currBeer])
}

export default UpdateBeerForm;
