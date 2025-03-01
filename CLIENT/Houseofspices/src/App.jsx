// import Frontpage from './componenets/front';
// import Signuppage from './componenets/signup';
// import Loginpage from './componenets/login';
// import { Route,Routes } from 'react-router-dom';
// import Aboutpage from './componenets/about';
// import Adding from './componenets/postroute';
// import UpdatingData from './componenets/update';
// import ReviewData from './componenets/review';
// import "./App.css"
// import Cart from "./componenets/Cart";
// import React from "react";


// function App() {

//   return (
//     <>
//     <Routes>
//       <Route path='/front' element={<Frontpage/>}></Route>
//       <Route path='/add' element={<Adding/>}></Route>
//       <Route path='/' element={<Signuppage/>}></Route>
//       <Route path='/login' element={<Loginpage/>}></Route>
//       <Route path='/about' element={<Aboutpage/>}></Route>
//       <Route path="/update/:key" element={<UpdatingData/>}></Route>
//       <Route path='/review' element={<ReviewData/>}></Route>
//       <Route path="/cart/get/:userid" element={<Cart/>}></Route>
//     </Routes>

//     </>
//   )
// }
// export default App
import React from "react";
import { Route, Routes } from "react-router-dom";
import Frontpage from "./componenets/front";
import Signuppage from "./componenets/signup";
import Loginpage from "./componenets/login";
import Aboutpage from "./componenets/about";
import Adding from "./componenets/postroute";
import UpdatingData from "./componenets/update";
import ReviewData from "./componenets/review";
import Cart from "./componenets/Cart";
import TestReport from "./componenets/testreport";  // Import the TestReport component
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/front" element={<Frontpage />} />
        <Route path="/add" element={<Adding />} />
        <Route path="/" element={<Signuppage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/update/:key" element={<UpdatingData />} />
        <Route path="/review" element={<ReviewData />} />
        <Route path="/cart/get/:userid" element={<Cart />} />
        <Route path="/test-report" element={<TestReport />} /> {/* New Route Added */}
      </Routes>
    </>
  );
}

export default App;
