import React from 'react'
import CarCard from '../Components/CarCard'

const ComparePage = () => {
    const params=new URLSearchParams(document.location.search);
    const model1=params.get("model1")
    const maker1=params.get("maker1")
    const year1=params.get("year1")
    const model2=params.get("model2")
    const maker2=params.get("maker2")
    const year2=params.get("year2")
    const imageBasePath=window.location.protocol+"//"+window.location.host+"/Assets/";
  return (
    <section className='comparePage'>
       <CarCard
        maker={maker1}
        model={model1}
        year={year1}
       />
       <div className='slash'></div>
       <CarCard
         maker={maker2}
         model={model2}
         year={year2}
       />
    </section>
  )
}

export default ComparePage