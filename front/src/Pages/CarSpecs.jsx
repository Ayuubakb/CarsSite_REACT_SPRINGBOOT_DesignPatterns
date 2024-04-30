import React from 'react'
import CarCard from '../Components/CarCard'

const CarSpecs = () => {
    const params=new URLSearchParams(document.location.search);
    const maker=params.get("maker")
    const model=params.get("model")
    const year=parseInt(params.get("year"),10)
    var imageBasePath = window.location.protocol + "//" + window.location.host + "/Assets/";
  return (
    <section>
        <CarCard
           img={imageBasePath+"Compare.webp"}
           maker={maker}
           model={model}
           year={year}
        />
    </section>
  )
}

export default CarSpecs