import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
function Signuppage() {
    const [name , setName ] = useState("")
    const [email, setEmail] = useState("")
    const [pin , setPin] = useState("")
    const navigate = useNavigate();
    const submit=()=>{
    navigate("/fetch")
    axios.post("http://localhost:5000/sign",{name, email , pin})
       .then(res=>console.log(res))
       .catch(err=>console.log(err))
    }
    function username (e){
        setName(e.target.value)
    }
    function usermail (e){
        setEmail(e.target.value)
    }
    function userpin (e){
        setPin(e.target.value)
    }
return(
<div className="signpage">
    <div>
<input type="text" placeholder="Name"  onChange={(e)=>{username(e)}}/>
</div>
<div>
<input type="text" placeholder="Email" onChange={(e)=>{usermail(e)}}/>
</div>
<div>
<input type="text" placeholder="Enter Pin" onChange={(e)=>{userpin(e)}}/>
</div>
    <button onClick={submit}>SignUp</button>
    <Link to="/login">
    <button>Login</button>
    </Link>
</div>
)
}
export default Signuppage;