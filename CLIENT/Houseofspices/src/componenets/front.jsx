import React from "react";
import { Link } from "react-router-dom";
import FetchData from "./getroute";
function Frontpage (){
    return(
        <div>
            <div className="navbar" >
               <div>
                <Link to="/about">                
                <button>ABOUT</button>
                </Link>
              </div>
              <div>
              <Link to="/add">
              <button>ADD DATA</button>
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
            <input  className="filter"  type="text" placeholder="Filter the data" />
            <div>
            <div>
              <FetchData/>
            </div>
            </div>
        </div>
    )
}
export default Frontpage;