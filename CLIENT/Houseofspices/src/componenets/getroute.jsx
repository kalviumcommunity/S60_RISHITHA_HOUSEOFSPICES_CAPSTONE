import axios from "axios";
import React, { useState, useEffect} from "react";
import {jwtDecode} from "jwt-decode";
import { Link,useNavigate } from "react-router-dom";

function FetchData() {
  const [spicesData, setSpicesData] = useState([]);
  const [count, setCount] = useState(0);
  const [selected,setselected]=useState(null)
  const [userid,setid]=useState("")
  const navigate=useNavigate();

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    const gettingData = async () => {
      try {
        const database = await axios.get("http://localhost:5000/get");
        // console.log(database.data.a);
        setSpicesData(database.data.a);
      } catch (err) {
        console.error("Error :", err);
      }
    };
    gettingData();
  }, []);

  const getToken=localStorage.getItem("usertoken")

  useEffect(
    ()=>{
      if(getToken){
        try{
           const decodetoken=jwtDecode(getToken);
           if(decodetoken && decodetoken.User && decodetoken.User.id){
            const userid=decodetoken.User.id
            setid(userid)
           }else{
            console.log("Invalid Token")
           }
          }catch(error){
              console.log("jwt token err:",error)
          }
        }
        else{
          console.log("no token in local storage.")
        }
    },[])

    const AddtoCart=async (id,event)=>{
      event.preventDefault()
      setselected(id)
      try{
        const getcart=await axios.get(`http://localhost:5000/cart/get/${userid}`)
        const getdata=getcart.data
        const list=getdata.spices.find(item=>item.id===id)
        if(list){
          const Incerement=list.Numberof+1 
          const makepost=await axios.post(`http://localhost:5000/cart/post/${userid}`,{spices:[{id,Numberof:Incerement}]})
          setCount(Incerement)
          console.log(makepost)
          navigate(`/cart/get/${userid}`)
        }else{
          const makepost=await axios.post(`http://localhost:5000/cart/post/${userid}`,{spices:[{id,Numberof:count}]})
          console.log(makepost)
          navigate(`/cart/get/${userid}`)
        }
      }catch(err){
       if(err.response.status===404){
        try{
          const postcart=await axios.post(`http://localhost:5000/cart/post/${userid}`,{spices:[{id,Numberof : count}]})
          console.log("new users cart",postcart.data)
          navigate(`/cart/get/${userid}`)
        }catch(err){
          console.log("err in 404",err)
        }
       }
      }
    }

  return (
    <div className="get">
      {spicesData.map((data) => (
        <div key={data._id}>
          <h3><b>Spice Name: </b> {data.spice}</h3>
          <img src={data.image} alt="" width="300px" />
          <p><b>Health Tip: </b> {data.health}</p>
          <p><b>Rarity: </b> {data.rarity}</p>
          <p><b>Common Availability: </b> {data.commonAvailability}</p>
          <button onClick={decrease}>-</button>
          <span>{count}</span>
          <button onClick={increase}>+</button>
          <Link to={`/update/${data._id}`}>
            <button>Update</button>
          </Link>
          <button onClick={(event)=> {AddtoCart(data._id,event)}}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default FetchData;