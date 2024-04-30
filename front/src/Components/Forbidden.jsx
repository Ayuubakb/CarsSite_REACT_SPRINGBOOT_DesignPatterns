import React from 'react'
import { Link } from 'react-router-dom'

const Forbidden = () => {
    const imageBasePath=window.location.protocol+"//"+window.location.host+"/Assets/";
    const handleClick=()=>{
        document.getElementById('login').style.display="block"
    }
  return (
    <section >
        <div className='forbidden'>
            <div>
                <img src={`${imageBasePath}big-no-waiting-sign.jpg`}></img>
            </div>
            <div>
                <h1>You Are Not Allowed To Browse To This Page<br></br> Without Being Logged In </h1>
                <Link to="/"><button>Go Home</button></Link>
                <button onClick={handleClick}>Login</button>
            </div>
        </div>
    </section>
  )
}

export default Forbidden