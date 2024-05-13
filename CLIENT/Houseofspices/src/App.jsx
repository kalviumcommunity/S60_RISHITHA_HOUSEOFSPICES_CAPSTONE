import Frontpage from './componenets/front';
import Signuppage from './componenets/signup';
import Loginpage from './componenets/login';
import { Route,Routes } from 'react-router-dom';
import Aboutpage from './componenets/about';
import "./App.css"
import React from "react";


function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Frontpage/>}></Route>
      <Route path='/sign' element={<Signuppage/>}></Route>
      <Route path='/login' element={<Loginpage/>}></Route>
      <Route path='/about' element={<Aboutpage/>}></Route>
    </Routes>

    </>
  )
}
export default App
