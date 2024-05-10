import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

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
            <div><button onClick={decrease}>-</button></div>
            <span>{count}</span>
            <div><button onClick={increase}>+</button></div>
        </div>
    )
}
export default Frontpage;