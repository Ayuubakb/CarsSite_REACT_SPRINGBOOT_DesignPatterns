import React,{useEffect, useState} from 'react'
import { getCar } from '../Controllers/CarsController';
import Waiting from '../Components/Waiting';

const OneCarOffer = () => {
    const imageBasePath=window.location.protocol+"//"+window.location.host+"/Assets/"
    const params=new URLSearchParams(document.location.search);
    const id=params.get('id')
    const [car,setCar]=useState({Car:{}, Seller:{}});
    const [loaded,setLoaded]=useState(false)
    useEffect(()=>{
        getCar(id,setCar);
        console.log(car);
        let idT=setTimeout(()=>{
            setLoaded(true)
        },1000)
        return ()=>clearTimeout(idT)
    },[])
  return (    
    <section>
    {
        loaded?
        <div className='oneCarOffer'>
            <div>
                {car.Car.photo!==null?
                    <img src={`data:image/${car.Car.photo.extenesion};base64,${car.Car.photo.photoBase}`}></img>
                :
                    <img src={`${imageBasePath}128.jpg`}/>
                }
            </div>
            <div>
                <h1><i class="fa-solid fa-car"></i> {`${car.Car.maker} ${car.Car.model}`}</h1>
                <p><span><i class="fa-solid fa-calendar-days"></i> Year :</span> {car.Car.year}</p>
                <p><span><i class="fa-solid fa-gauge"></i> Distance :</span> {car.Car.mileage} Km</p>
                <p className='price'><span><i class="fa-solid fa-money-bill"></i> Price :</span> {car.Car.price!=null?car.Car.price:"-"} DH</p>
            </div>
            <div>
                <h1><i class="fa-solid fa-circle-info"></i> Description : </h1>
                <p>{car.Car.description}</p>
            </div>
            <div>
                <p><i class="fa-solid fa-user-tie"></i> {car.Car.seller}</p>
                <p><i class="fa-solid fa-location-dot"></i> {car.Seller.city}</p>
                <p className='price' style={{color:"green"}}><i class="fa-solid fa-phone" style={{color:"black"}}></i> {car.Seller.phone}</p>
            </div>
        </div>
        :<Waiting/>
    }
    </section>
  )
}

export default OneCarOffer