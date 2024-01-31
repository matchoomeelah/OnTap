import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkCreateBeer } from "../../redux/beers";

import "./Forms.css";

function CreateBeerForm() {
    return (
        <div>
            <h1>Create Beer Form</h1>
        </div>
    )
}

export default CreateBeerForm;
