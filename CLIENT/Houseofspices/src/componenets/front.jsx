import React from "react";
import { Link } from "react-router-dom";
import FetchData from "./getroute";
function Frontpage (){
    return(
        <div className="frontpage">
            <div className="navbar" >
              <div>
              <Link to="/add">
              <button>ADD DATA</button>
              </Link>
              <Link to="/review">
              <button>REVIEW</button>
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