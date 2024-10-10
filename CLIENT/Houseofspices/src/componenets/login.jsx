import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase/firebase";

function Loginpage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [object,setobject] =useState(null);
    const [input,setinput] = useState(false);
    const [pin, setPin] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const nameIsValid = /^[A-Za-z\s]+$/.test(name);
        const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        setIsFormValid(nameIsValid && emailIsValid && pin.length > 0);
    }, [name, email, pin]);

    const submit = (event) => {
        event.preventDefault();
        if (isFormValid) {
            axios.post("http://localhost:5000/login", { name, email, pin })
                .then((res) => {
                    console.log(res.data);
                    if (res.data.message === "User Login") {
                        navigate("/front");
                        localStorage.setItem("storage",res.data.name);
                        // localStorage.setItem("")
                        console.log(res.data)
                    } else if (res.data.message === "Invalid user details, Prefer to signup") {
                        error();
                    }
                })
                 .catch((err) => {
                    console.log(err);
                    error();
                });
            }
    };

    const error = () => {
        alert("Failed to login!!");
    };

    const username = (e) => {
        setName(e.target.value);
    };

    const usermail = (e) => {
        setEmail(e.target.value);
    };

    const userpin = (e) => {
        setPin(e.target.value);
    };

    const handlegoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setinput(true);
            setobject(user)
            // localStorage.setItem("storage",user.displayName);
            // navigate("/front")
        } catch (error) {
            console.error("Error during Google sign-in:", error);
        }
    }

    const loginClicked=()=>{
        if (object) {
            axios.post("http://localhost:5000/login", { name:object.displayName, email:object.email, pin : pin })
                .then((res) => {
                    console.log(object)
                    console.log(res.data.name);
                    if (res.data.message === "User Login") {
                        localStorage.setItem("storage",res.data.name);
                        navigate('/front')
                    } else if (res.data.message === "Invalid user details, Prefer to signup") {
                        error();
                    }
                })
                 .catch((err) => {
                    console.log(err);
                    // error();
                });
            }
    }


    return (
        <div className="signpage">
            {input? (
        <div>
      <input type="password" placeholder="Enter Password"  onChange={(e) => { userpin(e) }} value={pin}/>
      <button onClick={loginClicked}>Login</button>
        </div>
            ):(
                <>
            <div>
                <input 
                    type="text" 
                    placeholder="Name" 
                    onChange={(e) => { username(e) }} 
                    value={name}
                    pattern="[A-Za-z\s]+" 
                    title="Only alphabets allowed"
                />
            </div>
            <div>
                <input 
                    type="text" 
                    placeholder="Email" 
                    onChange={(e) => { usermail(e) }} 
                    value={email}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Enter a valid email"
                />
            </div>
            <div>
                <input 
                    type="password" 
                    placeholder="Enter Pin" 
                    onChange={(e) => { userpin(e) }} 
                    value={pin}
                />
            </div>
        </>)}
            <div> 
                    <button  onClick={handlegoogle}>
                        <img src="https://cdn.icon-icons.com/icons2/2119/PNG/512/google_icon_131222.png" alt="" width="25px"/>Sign in with Google
                        </button>
                </div>
            <button onClick={submit} disabled={!isFormValid}>Login</button>
        </div>
    );
}

export default Loginpage;
