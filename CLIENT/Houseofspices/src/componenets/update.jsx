import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdatingData() {
    const navigate = useNavigate();
    const { key } = useParams();
    const [spice, setSpice] = useState("");
    const [image, setImage] = useState("");
    const [health, setHealth] = useState("");
    const [commonAvailability, setCommonAvailability] = useState("");
    const [rarity, setRarity] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/get/${key}`);
                const { spice, image, health, commonAvailability, rarity } = response.data;
                setSpice(spice);
                setImage(image);
                setHealth(health);
                setCommonAvailability(commonAvailability);
                setRarity(rarity);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [key]);

    const changeCategory = (e) => {
        setSpice(e.target.value);
    };

    const changeImage = (e) => {
        setImage(e.target.value);
    };

    const changeHealth = (e) => {
        setHealth(e.target.value);
    };

    const changeCommonAvailability = (e) => {
        setCommonAvailability(e.target.value);
    };

    const changeRarity = (e) => {
        setRarity(e.target.value);
    };

    const recordSubmit = (e) => {
        e.preventDefault();
        console.log({ spice, image, health, commonAvailability, rarity });
        axios.put(`http://localhost:5000/put/${key}`, { spice, image, health, commonAvailability, rarity })
            .then(() => { navigate("/front"); })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <form>
                <div>
                    <input type="text" placeholder="Spice Name" onChange={changeCategory} value={spice} />
                </div>
                <div>
                    <input type="text" placeholder="Image" onChange={changeImage} />
                </div>
                <div>
                    <input type="text" placeholder="Health" onChange={changeHealth} value={health} />
                </div>
                <div>
                    <input type="text" placeholder="Common Availability" onChange={changeCommonAvailability} value={commonAvailability} />
                </div>
                <div>
                    <input type="text" placeholder="Rarity" onChange={changeRarity} value={rarity} />
                </div>
                <div>
                    <button onClick={recordSubmit}>Update</button>
                </div>
            </form>
        </div>
    );
}

export default UpdatingData;
