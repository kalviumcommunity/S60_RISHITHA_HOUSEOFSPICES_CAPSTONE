import React from "react";
import { useState } from "react";
import axios from "axios";

function Adding(){
    const [spice, setspice] = useState("");
    const [image, setImage] = useState("");
    const [health, setHealthData] = useState("");
    const [rarity, setrarityData] = useState("");
    const [commonAvailability, setcommonAvailabilityData] = useState("");

    function changespice(e){
      setspice(e.target.value);
    }

    function changeImage(e){
        setImage(e.target.value);
    }

    function changeHealth(e){
        setHealthData(e.target.value);
    }

    function changerarity(e){
        setrarityData(e.target.value);
    }

    function changecommonAvailability(e){
        setcommonAvailabilityData(e.target.value);
    }
    function recordSubmit(e){
        e.preventDefault();
        axios.post("http://localhost:5000/post", {spice, image, health, rarity, commonAvailability})
             .then(data => console.log(data))
             .catch(error => console.log(error));
    }
    return(
        <div>
            <form>
                <div>
                    <input type="text" placeholder="Spice Name" onChange={changespice} />
                </div>
                <div>
                    <input type="text" placeholder="Image" onChange={changeImage} />
                </div>
                <div>
                    <input type="text" placeholder="Health" onChange={changeHealth} />
                </div>
                <div>
                    <input type="text" placeholder="Rarity" onChange={changerarity} />
                </div>
                <div>
                    <input type="text" placeholder="CommonAvailability" onChange={changecommonAvailability} />
                </div>
            </form>
            <button onClick={recordSubmit}>Add</button>
        </div>
    );
}

export default Adding;