import React, { useState } from 'react'
import Search from '../Components/Search'
import { Link } from 'react-router-dom';

const ViewCar = () => {
    const [query,setQuery]=useState({maker:"",model:"",year:""});
    const [next,setNext]=useState(false)
  return (
    <section className='viewCar'>
        {!next?
        <>
            <div id="search">
                <Search 
                    setNext={setNext} 
                    query={query} 
                    setQuery={setQuery}
                />
            </div>
            <div id='img'>
                <img src='Assets/carBack.webp' ></img>
            </div>
        </>
        :
        <>
            <div id='img'>
                <img src='Assets/carInt.webp' loading='lazy'></img>
            </div>
            <div id="sub" className='lastChoice'>
                    <button><Link to={`showCar/?model=${query.model}&maker=${query.maker}&year=${query.year}`} className='link'><i class="fa-solid fa-file fa-lg"></i> Show Car Specs</Link></button>
                    <button><Link to={`showOffer/?model=${query.model}&maker=${query.maker}&year=${query.year}`} className='link'><i class="fa-solid fa-shop fa-lg"></i> Show car offers </Link></button>
                    <button onClick={()=>setNext(false)}><i class="fa-solid fa-arrow-left fa-xl"></i></button>
            </div>
        </>
        }
    </section>
  )
}

export default ViewCar