import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Adding() {
    const navigate = useNavigate();
    const [spice, setSpice] = useState("");
    const [image, setImage] = useState("");
    const [health, setHealthData] = useState("");
    const [rarity, setRarityData] = useState("");
    const [commonAvailability, setCommonAvailabilityData] = useState("");

    function changeSpice(e) {
        setSpice(e.target.value);
    }

    function changeImage(e) {
        setImage(e.target.value);
    }

    function changeHealth(e) {
        setHealthData(e.target.value);
    }

    function changeRarity(e) {
        setRarityData(e.target.value);
    }

    function changeCommonAvailability(e) {
        setCommonAvailabilityData(e.target.value);
    }

    function recordSubmit(e) {
        e.preventDefault();
        axios.post("http://localhost:5000/post", { spice, image, health, rarity, commonAvailability })
            .then(() => {
                navigate("/front");
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="signpage">
            <form onSubmit={recordSubmit}>
                <div>
                    <input type="text" placeholder="Spice Name" onChange={changeSpice} value={spice} />
                </div>
                <div>
                    <input type="text" placeholder="Image" onChange={changeImage} />
                </div>
                <div>
                    <input type="text" placeholder="Health" onChange={changeHealth} value={health} />
                </div>
                <div>
                    <input type="text" placeholder="Rarity" onChange={changeRarity} value={rarity} />
                </div>
                <div>
                    <input type="text" placeholder="Common Availability" onChange={changeCommonAvailability} value={commonAvailability} />
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    );
}

export default Adding;
