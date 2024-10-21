import React, {useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Cart(){
const {userid}=useParams()
const [cartdata,setcartdata]=useState(null);

const token=localStorage.getItem("usertoken");

useEffect(()=>{
    if(token){
        const getdata=async()=>{
            try{
                const spicesdata=await axios.get(`http://localhost:5000/cart/get/${userid}`)
                console.log(spicesdata.data)
                setcartdata(spicesdata.data.spices)
            }catch(err){
                console.log("error in Cart.jsx",err)
            }
        }
        getdata()
    }
},[token,userid])
return(
    <div>
        {cartdata && cartdata.map((i)=>{
            return(
            <div key={i._id}>
             <p>{i.id._id}</p>
             <p>{i.id.spice}</p>
             <p>{i.Numberof}</p>
            </div>
        )
        })}
    </div>
)
}

export default Cart;
