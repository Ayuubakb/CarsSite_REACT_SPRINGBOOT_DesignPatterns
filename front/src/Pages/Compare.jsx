import React, { useState } from 'react'
import Search from '../Components/Search'
import { useNavigate } from 'react-router-dom';

const Compare = () => {
  const [cars1,setCars1]=useState({maker:"",model:"",year:""});
  const [cars2,setCars2]=useState({maker:"",model:"",year:""});
  const [err,setErr]=useState("");
  const navigate=useNavigate();
  const handleClick=()=>{
    if(cars1.maker==="" || cars1.model==="" || cars1.year==="" || cars2.maker==="" || cars2.model==="" || cars2.year==="" ){
      setErr("Fill All Fields To Get The Wanted Result ");
    }else{
      const carsF={cars1:cars1,cars2,cars2}
      console.log(carsF);
      navigate("compare?model1="+cars1.model+"&maker1="+cars1.maker+"&year1="+cars1.year+"&model2="+cars2.model+"&maker2="+cars2.maker+"&year2="+cars2.year+"")
    }
  }
  return (
    <section style={{background:"url(Assets/bg.webp)",backgroundPosition:"center"}}>
        <div className='compare'>
            <Search setNext={null} setQuery={setCars1} query={cars1} />
            <div className='vs'>
                <h1>VS</h1>
            </div>
            <Search setNext={null} setQuery={setCars2} query={cars2} />
        </div>
        <div className='Compbtn'>
          <button onClick={handleClick}>Compare</button>
          {err!==""?<p className='err'>{err}&#128221;</p>:null}
        </div>
    </section>
  )
}

export default Compare