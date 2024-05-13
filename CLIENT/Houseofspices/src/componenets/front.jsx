import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Dummydata from "./dummy";

function Frontpage (){
    const [count, setCount] = useState(0);
    const increase = () => {
        setCount(count + 1);
      };
    
      const decrease = () => {
        if (count > 0) {
          setCount(count - 1);
        }
      };
    return(
        <div>
            <div className="navbar" >
            <div>
                <Link to="/about">                
                <button>ABOUT</button>
                </Link>
            </div>
            <div>
                <Link to="/sign">
                <button>SIGNUP</button>
                </Link>
                </div>
                <div>
                <Link to="/login">
                <button>LOGIN</button>
                </Link>
            </div>
            </div>
            <div>
              
            <div>
      <h2>Spice: {Dummydata.spice}</h2>
      <img src={Dummydata.image} width="500px"/>
      <h4>Health: {Dummydata.health}</h4>
      <h4>Rarity: {Dummydata.rarity}</h4>
      <h4>CommonAvailability: {Dummydata.commonAvailability}</h4>
    </div><button onClick={decrease}>-</button>
            <span>{count}</span>
          <button onClick={increase}>+</button>
            </div>
        </div>
    )
}
export default Frontpage;