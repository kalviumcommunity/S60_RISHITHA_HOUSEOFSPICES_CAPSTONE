import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Loginpage() {
    const [name , setName ] = useState("")
    const [email, setEmail] = useState("")
    const [pin , setPin] = useState("")
    const navigate = useNavigate();
    const submit =(event)=>{
        event.preventDefault()
    axios.post("http://localhost:8080/login",{name,email,pin})
       .then((res)=>{console.log(res.data.message)
        if(res.data.message==="User Login"){
            navigate("/fetch")
            document.cookie=`name=${name}; expires Sun, 31 Dec 2034 00:00:00 GMT`
            document.cookie=`email=${email}; expires Sun, 31 Dec 2034 00:00:00 GMT`
        }else if(res.data.message==="Invalid user details, Prefer to signup"){
            error()
        }
    })
       .catch((err)=>{console.log(err)
        error()    
    })}
    function error (){
        alert("falied to login!!")
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
<Link to="/fetch">
<button onClick={submit}>Login</button>
</Link>
</div>
)
}
export default Loginpage