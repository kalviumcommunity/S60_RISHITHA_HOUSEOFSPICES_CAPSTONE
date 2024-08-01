import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signuppage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pin, setPin] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const nameIsValid = /^[A-Za-z]+$/.test(name);
        const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        setIsFormValid(nameIsValid && emailIsValid && pin.length > 0);
    }, [name, email, pin]);

    const submit = () => {
        if (isFormValid) {
            axios.post("http://localhost:5000/sign", { name, email, pin })
                .then(res => {
                    console.log(res);
                    navigate("./front");
                    localStorage.setItem("storage",res.data.name);
                })
                .catch(err => console.log(err));
        }
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

    return (
        <div className="enter">
            <div>
                <Link to="/about">
                    <button className="signup_aboutbutton">KNOW MORE ABOUT US</button>
                </Link>
            </div>
            <p>SIGNIN TO CONTINUE</p>
            <div className="signpage">
                <div>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        onChange={username} 
                        value={name}
                        pattern="[A-Za-z]+"
                        title="Only alphabets allowed"
                    />
                </div>
                <div>
                    <input 
                        type="text" 
                        placeholder="Email" 
                        onChange={usermail} 
                        value={email}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        title="Enter a valid email"
                    />
                </div>
                <div>
                    <input 
                        type="text" 
                        placeholder="Enter Pin" 
                        onChange={userpin} 
                        value={pin}
                    />
                </div>
                <div className="buttons">
                    <button onClick={submit} disabled={!isFormValid}>SignIn</button>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Signuppage;
