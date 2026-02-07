import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase/firebase";

function Signuppage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [object,setobject] = useState(null);
    const[input,setinput]=useState(false);
    const [pin, setPin] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Updated regex to allow spaces
        const nameIsValid = /^[A-Za-z\s]+$/.test(name);
        const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        setIsFormValid(nameIsValid && emailIsValid && pin.length > 0);
    }, [name, email, pin]);

    const submit = () => {
        if (isFormValid) {
            axios.post("http://localhost:5000/sign/post", { name, email, pin })
                .then(res => {
                    console.log(res);
                    navigate("./front");
                    localStorage.setItem("storage", res.data.name);
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

    
    const error = () => {
        alert("Failed to signin!!");
    };
const handlegoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setobject(user);
            setinput(true);
            localStorage.setItem("storage", user.displayName);
            // navigate("./front"); 
        } catch (error) {
            console.error("Error during Google sign-in:", error);
        }
    }

    const Clicked = async()=>{
        if (object) {
            axios.post("http://localhost:5000/sign/post", { name:object.displayName, email:object.email, pin : pin })
                .then((res) => {
                    console.log(object)
                    console.log(res.data.name);
                    localStorage.setItem("storage", res.data.name);
                })
                 .catch((err) => {
                    console.log(err);
                    error();
                });
            }
        }



    return (
        <div className="enter">
            <div>
                <Link to="/about">
                    <button className="signup_aboutbutton">KNOW MORE ABOUT US</button>
                </Link>
            </div>
            <p>SIGNIN TO CONTINUE</p>
            <div className="signpage">
            {input? (
        <div>
      <input type="password" placeholder="Enter Password"  onChange={(e) => { userpin(e) }} value={pin}/>
      <button onClick={Clicked}>Signin</button>
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
                </div>
                <div> 
                    <button  onClick={handlegoogle}>
                        <img src="https://cdn.icon-icons.com/icons2/2119/PNG/512/google_icon_131222.png" alt="" width="25px"/> Sign in with Google
                    </button>
                </div>
                <div className="buttons">
                    <button onClick={submit} disabled={!isFormValid}>SignIn</button>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
    <button 
        onClick={() => navigate("/test-report")} 
        style={{
            backgroundColor: "#007BFF",
            color: "white",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px"
        }}
    >
        View Test Report
    </button>

    <button 
        onClick={() => navigate("/test-results")} 
        style={{
            backgroundColor: "#007BFF",
            color: "white",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px"
        }}
    >
        View Test Report Backend
    </button>
</div>

                </div>
            </div>
    );
}
// }
export default Signuppage;


