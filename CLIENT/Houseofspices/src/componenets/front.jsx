import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FetchData from "./getroute";
function Frontpage (){
  const getout = useNavigate();
  const signout =()=>{
  const out =  localStorage.getItem("storage");
    if (out){
      localStorage.removeItem("storage");
      getout("/");
    }
    else {
      alert("TRY AGAIN")
    }
  }
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
              <button onClick={signout}>Login Out</button>
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