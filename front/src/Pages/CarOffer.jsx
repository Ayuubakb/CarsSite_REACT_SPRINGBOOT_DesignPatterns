import React, { useEffect, useState } from 'react'
import CarOfferCard from '../Components/CarOfferCard';
import { getCars } from '../Controllers/CarsController';
import Waiting from '../Components/Waiting';

const CarOffer = () => {
  const params= new URLSearchParams(document.location.search);
  const maker=params.get("maker");
  const model=params.get("model");
  const year=parseInt(params.get("year"),10);
  const [loaded,setLoaded]=useState(false)
  const [Cars,setCars]=useState([])
  console.log(Cars);
  useEffect(()=>{
    getCars(maker,model,year,setCars);
    let idT=setTimeout(()=>{
      setLoaded(true);
    },1000)
    return() => clearTimeout(idT)
  },[maker,model,year])
  return (
    <section className='carOffer'>
      <h1><span>Car Offers For :</span> {`${maker} ${model} (${year})`}</h1>
      <div className='cardsContainer'>
        {
          loaded?
           (Cars.length!=0?
            Cars.map((car)=>{
            return(
              car.photo!==null?
              <CarOfferCard
                  id={car.id}
                  ext={car.photo.extension}
                  img={car.photo.photoBase}
                  maker={maker}
                  model={model}
                  year={year}
                  price={car.price}
              />
              :
              <CarOfferCard
                  id={car.id}
                  ext={null}
                  img={null}
                  maker={maker}
                  model={model}
                  year={year}
                  price={car.price}
              />
            )
          }):<h1 style={{marginLeft:"35%",marginTop:"30px"}}>No Offers For the Moment</h1>
          )
          :<Waiting/>
        }
      </div>
    </section>
  )
}

export default CarOffer