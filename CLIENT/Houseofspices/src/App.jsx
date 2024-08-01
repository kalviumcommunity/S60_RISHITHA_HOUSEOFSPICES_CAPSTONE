import Frontpage from './componenets/front';
import Signuppage from './componenets/signup';
import Loginpage from './componenets/login';
import { Route,Routes } from 'react-router-dom';
import Aboutpage from './componenets/about';
import Adding from './componenets/postroute';
import UpdatingData from './componenets/update';
import ReviewData from './componenets/review';
import "./App.css"
import React from "react";


function App() {

  return (
    <>
    <Routes>
      <Route path='/front' element={<Frontpage/>}></Route>
      <Route path='/add' element={<Adding/>}></Route>
      <Route path='/' element={<Signuppage/>}></Route>
      <Route path='/login' element={<Loginpage/>}></Route>
      <Route path='/about' element={<Aboutpage/>}></Route>
      <Route path="/update/:key" element={<UpdatingData/>}></Route>
      <Route path='/review' element={<ReviewData/>}></Route>
    </Routes>

    </>
  )
}
export default App
