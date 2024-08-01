import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Loginpage() {
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

    const submit = (event) => {
        event.preventDefault();
        if (isFormValid) {
            axios.post("http://localhost:5000/login", { name, email, pin })
                .then((res) => {
                    console.log(res.data.message);
                    if (res.data.message === "User Login") {
                        navigate("/front");
                        document.cookie = `name=${name}; expires=Sun, 31 Dec 2034 00:00:00 GMT`;
                        document.cookie = `email=${email}; expires=Sun, 31 Dec 2034 00:00:00 GMT`;
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

    return (
        <div className="signpage">
            <div>
                <input 
                    type="text" 
                    placeholder="Name" 
                    onChange={(e) => { username(e) }} 
                    value={name}
                    pattern="[A-Za-z]+"
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
                    type="text" 
                    placeholder="Enter Pin" 
                    onChange={(e) => { userpin(e) }} 
                    value={pin}
                />
            </div>
            <button onClick={submit} disabled={!isFormValid}>Login</button>
        </div>
    );
}

export default Loginpage;
