import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'; 
import logContext from './Controllers/AuthContext'
import Nav from './Components/Nav';
import Home from './Pages/Home';
import AddCar from './Pages/AddCar';
import ViewCar from './Pages/ViewCar';
import Compare from './Pages/Compare';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Signup from './Components/Signup';
import CarSpecs from './Pages/CarSpecs';
import CarOffer from './Pages/CarOffer';
import OneCarOffer from './Pages/OneCarOffer'
import ComparePage from './Pages/ComparePage';
import { useState,useEffect } from 'react';
import { checkConnexion } from './Controllers/AuthControllers';
import Waiting from './Components/Waiting';
import Profile from './Pages/Profile';

function App() {
  const [isLogged,setIsLogged]=useState(null);
  let Idt;
  useEffect(()=>{
    Idt=setTimeout(()=>{
      checkConnexion(setIsLogged);
    },1000);
    return ()=>clearTimeout(Idt)
  },[])
  return (
    <div className="App">
      {
        isLogged!==null?
        <BrowserRouter>
        <logContext.Provider value={{isLogged:isLogged,setIsLogged:setIsLogged}}>
        <Login/>
        <Signup/>
        <Nav/>
          <Routes>
            <Route path='/'>
              <Route index element={<Home/>}></Route>
              <Route path='AddCar' element={<AddCar/>}></Route>
              <Route path='ViewCar'>
                <Route index element={<ViewCar/>}></Route>
                <Route path='showCar' element={<CarSpecs/>}></Route>
                <Route path='showOffer'>
                  <Route index element={<CarOffer/>}></Route>
                  <Route path='showCar' element={<OneCarOffer/>}></Route>
                </Route>
              </Route>
              <Route path='/CompareCars'>
                  <Route index element={<Compare/>}></Route>
                  <Route path='compare' element={<ComparePage/>}></Route>
              </Route>
              <Route path='/Profile' element={<Profile/>}></Route>
            </Route>
          </Routes>
          <Footer/>
        </logContext.Provider>
        </BrowserRouter>
        :
        <Waiting/>
      }
    </div>
  );
}
export default App;
