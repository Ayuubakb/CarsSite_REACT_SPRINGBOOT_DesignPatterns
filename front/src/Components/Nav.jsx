import React, { useContext, useEffect } from 'react'
import ButtonAuth from './ButtonAuth'
import { checkConnexion, login, signUp,logout } from '../Controllers/AuthControllers'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import logContext from '../Controllers/AuthContext'

const Nav = () => {
    var imageBasePath = window.location.protocol + "//" + window.location.host + "/Assets/";
    var logCon=useContext(logContext);
    const navigate=useNavigate()
    const handlePost=(e)=>{
        e.preventDefault()
        if(logCon.isLogged)
            navigate('AddCar')
        else
            document.getElementById("login").style.display="block";
    }
  return (
    <>
        <nav>
            
            <div className='buttons'>
            {!logCon.isLogged?
                <>
                    <ButtonAuth
                        label="Login"
                        color="#CF0A0A"
                        fct={()=>{document.getElementById("login").style.display="block"}}
                    />
                    <ButtonAuth
                        label="SignUp"
                        color="#DC5F00"
                        fct={()=>{document.getElementById("signup").style.display="block"}}
                    />
                </>
                :
                <>
                    <Link to="Profile" className='link' >
                    <div>
                        <p>Profile</p>
                    </div>
                </Link>
                    <ButtonAuth
                        label="LogOut"
                        color="#CF0A0A"
                        fct={()=>logout(logCon.setIsLogged)}
                    />
                </>
              }
            </div>
            <div className='logo'>
                <Link to="/">
                    <img src={imageBasePath+"pngegg (1).webp"}></img>
                </Link>
            </div>
            <div className='links'>
                <Link to="CompareCars" className='link' >
                    <div>
                        <p>Compare Cars</p>
                    </div>
                </Link>
                <Link to="ViewCar" className='link'>
                    <div>
                        <p>Check Car</p>
                    </div>
                </Link>
                <Link to="AddCar" className='link' onClick={handlePost}>
                    <div>
                        <p>Post Offer</p>
                    </div>
                </Link>
            </div>
        </nav>
        <Outlet/>
    </>
  )
}

export default Nav