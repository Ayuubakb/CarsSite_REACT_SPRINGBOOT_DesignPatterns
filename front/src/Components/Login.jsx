import React, { useContext, useEffect, useState } from 'react'
import Inputlog from './Inputlog';
import logContext from '../Controllers/AuthContext';
import { login } from '../Controllers/AuthControllers';

const Login = () => {
    const [logins,setLogins]=useState({login:"", password:""});
    const [err,setErr]=useState("");
    const logCon=useContext(logContext)
    const handleSubmit=(e)=>{
        e.preventDefault();
        login(logins.login,logins.password,setErr,logCon.setIsLogged)
    }
    useEffect(()=>{
        if(logCon.isLogged){
            document.getElementById("login").style.display="none";
        }
    },[logCon.isLogged])
    
  return (
    <div className='login' id='login'>
        <div className='log'>
            <form onSubmit={handleSubmit}>
            <div className='header'>
                <h1>Login</h1>
                {err!==""?<h1 className="err2">{err}</h1>:null}
                <h1 style={{cursor:"pointer", backgroundColor:"black"}} onClick={()=>{document.getElementById("login").style.display="none"}}>
                <i class="fa-solid fa-square-xmark"></i>
                </h1>
            </div>
            <Inputlog
                type="text"
                label="Login :"
                name="login"
                val={logins.login}
                setVal={setLogins}
            />
            <Inputlog
                type="password"
                label="Password :"
                name="password"
                val={logins.password}
                setVal={setLogins}
            />
            <button type='submit'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login