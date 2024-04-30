import React,{useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import logContext from '../Controllers/AuthContext';
const Footer = () => {
    var imageBasePath = window.location.protocol + "//" + window.location.host + "/Assets/";
    var logCon=useContext(logContext);
    const navigate=useNavigate()
    const handlePost=()=>{
        if(logCon.isLogged)
            navigate("AddCar")
        else
            document.getElementById("login").style.display="block"
    }
  return (
    <footer>
        <div>
            <div className='imgHolder'>
                <img src={imageBasePath+'pngegg (1).webp'}/>
            </div>
            <div className='sponsor'>
                <p>Sponsored By: EL HARCH LLC </p>
            </div>
        </div>
        <div className='slogan'>
            <h1>"From <span className='car'>Car</span> <span className='ent'>Enthusiasts</span><br></br> to <span className='car'>Car</span> <span className='ent'>Enthusiasts</span>"</h1>
        </div>
        <div className='links'>
            <ul>
                <Link to="/ViewCar" className='link'><li>View Car</li></Link>
                <Link to="/CompareCars" className='link'><li>Compare Cars</li></Link>
                <Link onClick={handlePost} className='link'><li>Post Offer</li></Link>
            </ul>
        </div>
    </footer>
  )
}

export default Footer