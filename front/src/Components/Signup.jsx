import React,{useState} from 'react'
import Inputlog from './Inputlog';
import { signUp } from '../Controllers/AuthControllers';

const Signup = () => {
    const [logins,setLogins]=useState({login:"",password:"",phone:"",city:""});
    const [err,seterr]=useState("");
    const handleSubmit=(e)=>{
        e.preventDefault();
        signUp(logins,seterr);
    }
  return (
    <div className='login' id='signup'>
        <div className='log'>
            <form onSubmit={handleSubmit}>
            <div className='header'>
                <h1>SignUp</h1>
                {err!==""?<h1 className='err2'>{err}</h1>:null}
                <h1 style={{cursor:"pointer", backgroundColor:"black"}} onClick={()=>{document.getElementById("signup").style.display="none"}}>
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
            <Inputlog
                type="number"
                label="Phone :"
                name="phone"
                val={logins.phone}
                setVal={setLogins}
            />
            <Inputlog
                type="text"
                label="City :"
                name="city"
                val={logins.city}
                setVal={setLogins}
            />
            <button type='submit'>Signup</button>
            </form>
        </div>
    </div>
  )
}

export default Signup