import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { addFav,checkFav,deleteFav } from '../Controllers/userController'
import { getCarSpecs } from '../Controllers/CarsController';
import Waiting from './Waiting';

const CarCard = ({img,maker,model,year}) => {
    const [spec,setSpec]=useState({class:"",cylinders:0,fuel_type:"",transmission:"",drive:"",combination_mpg:"",img:""});
    const [loaded,setLoaded]=useState(false)
    const [isFavorite,setIsFavorite]=useState(false);
    const [err,setErr]=useState("");
    const addFavorite=(e)=>{
        if(!isFavorite)
            addFav(setErr,{maker:maker,model:model,year:year})
        else
            deleteFav(setErr,{maker:maker,model:model,year:year})
    }
    const animation = [
        { opacity: "0" },
        { opacity: "1" },
        { opacity: "1" },
        { opacity: "1" },
        { opacity: "0"}
      ];
    const animationTiming = {
        duration: 4000,
        iterations: 1,
    };
    useEffect(()=>{
        getCarSpecs(maker,model,parseInt(year),setSpec);
        let idT=setTimeout(()=>{
            setLoaded(true)
        },1500)
        return ()=>clearTimeout(idT)
    },[])
    /*useEffect(()=>{
        getCarimg(maker,model,parseInt(year),setSpec);
    },[])*/
    useEffect(()=>{
        if(err!=="")
            document.getElementById("popErr").animate(animation,animationTiming)
        if(err === "Added")
            setIsFavorite(true);
        if(err === "Removed")
            setIsFavorite(false);
    },[err])
    useEffect(()=>{
        checkFav(setIsFavorite,{maker:maker,model:model,year:year})
    },[])
  return (
    loaded?
        spec.indispo==null?
            <div className='cardSpec'>
                    <div className='popErr' id='popErr'>
                        <p>{err}</p>
                    </div>
                <div className='header'>
                    <h1>{`${maker} ${model} (${year})`}</h1>
                </div>
                <div className='imgHolder'>
                
                </div>
                <div className='specs'>
                    <div>
                        <p><span>Car Class :</span>{spec.class}</p>
                        <p><span>Cylinders :</span>{spec.cylinders} Cylinders</p>
                        <p><span>Fuel Type :</span>{spec.fuel_type}</p>
                        <p><span>Trany :</span>{spec.transmission=="a"?"Automatic":"Manual"}</p>
                    </div>
                    <div> 
                        <p><span>Drive :</span>{spec.drive}</p>
                        <p><span>consumption :</span>{spec.combination_mpg}(miles/galon)</p>
                    </div>
                </div>
                <div className='favor'>
                <p onClick={addFavorite} style={{cursor:'pointer'}}>
                        <i id="fav" class="fa-solid fa-heart fa-lg" style={!isFavorite?{color:'white'}:{color:"red"}}></i> {!isFavorite?"Add To Favorites":"Remove From Favorites"}
                    </p>
                <Link to={`http://localhost:3000/ViewCar/showOffer?maker=${maker}&model=${model}&year=${year}`} style={{textDecoration:"none"}}>
                        <p>
                            <i class="fa-solid fa-magnifying-glass fa-lg" style={{color:'white'}}></i> See Offers
                        </p>
                    </Link>
                </div>
            </div>
        :
        <div className='cardSpec'>
            <div className='header'>
                <h1>{`${maker} ${model} (${year})`}</h1>
                <h1>We don't have informations on this car</h1>
                <Link to={`http://localhost:3000/ViewCar/showOffer?maker=${maker}&model=${model}&year=${year}`} style={{textDecoration:"none"}}>
                        <p style={{color:"red",marginTop:"30px", fontSize:"35px", fontFamily:"Trebuchet MS"}}>
                            <i class="fa-solid fa-magnifying-glass fa-xl"></i> See Offers
                        </p>
                </Link>
            </div>
            
        </div>
    :<Waiting/>

  )
}

export default CarCard