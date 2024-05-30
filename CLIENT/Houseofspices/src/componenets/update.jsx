import { useState } from "react";
import React from "react";
import axios from "axios";
import {useNavigate,useParams} from "react-router-dom"

function UpdatingData(){
    const navigate = useNavigate()
    const {key} = useParams()
    const[spice,Setspice]=useState("")
    const[image,SetdataImage]=useState("")
    const[health,sethealthData]=useState("")
    const[commonAvailability,setcommonAvailabilityData]=useState("")
    const[rarity,setrarityData] = useState("")
    function changeCateogory(e){
      Setspice(e.target.value)
    }
    function changeImage(e){
        SetdataImage(e.target.value)
    }
      function changeHealth(e){
        sethealthData(e.target.value)
      }
      function changecommonAvailability(e){
        setcommonAvailabilityData(e.target.value)
      }
      function changerarity (e){
        setrarityData(e.target.value)
      }

      function RecordSubmit(e){
         e.preventDefault();
         console.log({spice, image, health, commonAvailability, rarity })
         axios.put("http://localhost:5000/put/"+key,{spice, image, health, commonAvailability, rarity })
         .then(()=>{ navigate("/")})
         .catch(error=>console.log(error))  
      }
    return(
       <div>
        <form>
            <div>
            <input type="text" placeholder="Spice Name" onChange={changeCateogory} />
            </div>
            <div>
            <input type="text" placeholder="Image" onChange={changeImage} />
            </div>
            <div>
            <input type="text" placeholder="health" onChange={changeHealth}/>
            </div>
            <div>
            <input type="text" placeholder="commonAvailability" onChange={changecommonAvailability} />
            </div>
            <div>
              <input type="text" placeholder="rarity" onChange={changerarity}/>
            </div>
            <div>
            <button onClick={RecordSubmit}>update</button>
            </div>
        </form>
       </div>
    )
}
export default UpdatingData