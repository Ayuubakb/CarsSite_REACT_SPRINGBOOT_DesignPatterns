import React,{useContext} from 'react'
import Card from '../Components/Card';
import logContext from '../Controllers/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    var logCon=useContext(logContext);
    const navigate=useNavigate()
    const handlePost=(e)=>{
        e.preventDefault();
        if(logCon.isLogged)
            navigate("/AddCar")
        else
            document.getElementById("login").style.display="block";
    }
  return (
    <section className='homeSection'>
        <div className='Home'>
            <Card
                img="Assets/Compare.webp"
                desc="Compare Cars"
                link="CompareCars"
                style={{borderTopRightRadius:"0px", borderBottomRightRadius:"0px"}}
            />
            <Card
                img="Assets/Middle.webp"
                desc="Post Car"
                link="AddCar"
                fct={handlePost}
                style={{borderRadius:"0px"}}
            />
            <Card 
                img="Assets/View.webp"
                desc="View Car"
                link="ViewCar"
                style={{borderTopLeftRadius:"0px", borderBottomLeftRadius:"0px"}}
            />
        </div>
    </section>

  )
}

export default Home;