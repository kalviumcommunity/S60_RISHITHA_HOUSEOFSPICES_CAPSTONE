import React from "react";
import { Link } from "react-router-dom";
function Aboutpage (){
    return(
        <div className="about">
<h1>ABOUT APP:</h1>
<img src="https://www.tastingtable.com/img/gallery/tips-you-need-when-cooking-with-spices/intro-1683560012.jpg" alt="" width="600px"
 />
<h3>
    Here, this app is beinging introduced to show you all types of spices which are rarest and their are also few things
     which are commonly available. In this we can see the spice we want and also can update your cart. we also have add to cart option 
     and also have incremenent option where we cna have a button to add more quantity. It is user friendly we have sign in and login in
     page if we are already did sign in then we can give login in. If not we have to first give sign in and then we should give login.
     It already provides few spices data. If we want more we can click on add button then add the data we want in it.
</h3>
<Link to='/'>
<button>BACK</button>
</Link>

        </div>
    )
}
export default Aboutpage;