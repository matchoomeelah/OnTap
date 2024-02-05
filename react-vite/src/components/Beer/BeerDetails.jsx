import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { thunkGetBeerById } from "../../redux/beers";
import CheckInTile from "../CheckIn/CheckInTile";
import OpenModalButton from "../OpenModalButton";
import CreateCheckInModal from "../Modals/CreateCheckInModal";
// import CheckInTile from "../CheckIn/CheckInTile";

function BeerDetails() {
    const dispatch = useDispatch();

    const beers = useSelector(state => state.beers);
    const checkIns = useSelector(state => state.checkIns)
    const { beer_id } = useParams();
    const currBeer = beers[beer_id];

    console.log(currBeer)


    useEffect(() => {
        dispatch(thunkGetBeerById(beer_id));

    }, [beer_id, checkIns])

    return (
        <div id="beer-details-container">
            <div id="beer-header">
                <img src={currBeer?.image_url} />
                <div id="beer-header-info">
                    <div id="beer-name">{currBeer?.name}</div>
                    <div style={{ textDecoration: "none" }}><NavLink to={`/breweries/${currBeer?.brewery_id}`} id="brewery-nav-link">{currBeer?.brewery_name}</NavLink></div>
                    <div>{currBeer?.style}</div>
                    <div id="bottom-info">
                        <div id="abv-ibu-rating">
                            <div>
                                <div>ABV</div>
                                <div>{currBeer?.abv}%</div>
                            </div>
                            <div>
                                <div>IBU</div>
                                <div>{currBeer?.ibu}
                                </div>
                            </div>
                            <div>
                                <div>Rating</div>
                                <div><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></div>
                            </div>
                        </div>
                        <button id="wishlist-button" onClick={() => alert("Feature Coming Soon!")}> Add to WishList</button>
                    </div>
                </div>
            </div>
            <div id="beer-content-container">
                <div id="beer-content-left">
                    <div id="beer-about">
                        <h4>About</h4>
                        <div>{currBeer?.description}</div>
                    </div>
                    {/* <button id="check-in-button" onClick={() => alert("Feature Coming Soon!")}>Check In!</button> */}
                    <OpenModalButton
                                // onButtonClick={(e) => e.stopPropagation()}
                                buttonId="check-in-button"
                                buttonText={'Check In!'}
                                modalComponent={<CreateCheckInModal beer={currBeer} />}
                    />
                    <div id="check-in-container">
                        {currBeer?.check_ins.reverse().map(checkIn => {
                            return <CheckInTile checkIn={checkIn}/>
                        })}
                    </div>
                </div>
                <div id="beer-photos-container">
                    <h4>Photos</h4>
                    <div id="beer-photos">
                        <img className="beer-side-photo" src={"https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/ex_beer_1.jpeg"} />
                        <img className="beer-side-photo" src={"https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/ex_beer_2.jpeg"} />
                        <img className="beer-side-photo" src={"https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/ex_beer_3.webp"} />
                        <img className="beer-side-photo" src={"https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/ex_beer_9.jpeg"} />
                        <img className="beer-side-photo" src={"https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/ex_beer_6.jpeg"} />
                        <img className="beer-side-photo" src={"https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/ex_beer_8.avif"} />
                        <img className="beer-side-photo" src={"https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/ex_beer_4.jpeg"} />
                        <img className="beer-side-photo" src={"https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/ex_beer_5.webp"} />
                        <img className="beer-side-photo" src={"https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/ex_beer_7.jpeg"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BeerDetails;
