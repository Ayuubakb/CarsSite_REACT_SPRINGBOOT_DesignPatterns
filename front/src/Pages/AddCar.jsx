import React, { useContext, useEffect, useState } from 'react'
import { addCar } from '../Controllers/CarsController';
import logContext from '../Controllers/AuthContext';
import { useNavigate } from 'react-router-dom';
import Forbidden from '../Components/Forbidden';

const AddCar = () => {
  const basePath=window.location.protocol+"//"+window.location.host+"/Assets/"
  const [infos,setInfos]=useState({maker:"",model:"",year:"",mileage:null,description:"",price:null,image:null})
  const [err,setErr]=useState("");
  const navigate=useNavigate();
  const logCon=useContext(logContext)
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(infos.maker==="" || infos.model==="" || infos.year==="" || infos.mileage===null || infos.price===null ){
      setErr("Please fill all non Optional fields");
    }else{
      
      addCar(infos,setErr);
    }
  }
  const handleChange=(e)=>{
    setInfos((i)=>{return({...i,[e.target.name]:e.target.value})})
  }
  /*useEffect(()=>{
    if(!logCon.isLogged)
      navigate("/")
  },[logCon.isLogged])*/
  return (
    <>
    {logCon.isLogged===true?
    <section className='addCar'>
        <div className='carInfos'>
          <form onSubmit={handleSubmit} method='post' encType='multipart/form-data'>
            <h1>We Help You Sell Your Car 🤝</h1>
            <div className='container'>
              <div>
                <h2>Identify the Car : </h2>
                <input type='text' name='maker' placeholder='Maker' onChange={handleChange} value={infos.maker}/>
                <br></br>
                <input type='text' name='model' placeholder='Model' onChange={handleChange} value={infos.model}/>
                <br></br>
                <input type='number' name='year' placeholder='Year' onChange={handleChange} value={infos.year}/>
              </div>
              <div>
                <h2>Tell the customers about it : </h2>
                <input type='number' name='mileage' placeholder='mileage' onChange={handleChange} value={infos.mileage}/> <span style={{fontFamily:"Trebuchet MS",fontSize:20,color:'rgb(129,129,129)'}}>Km</span>
                <br></br>
                <textarea cols={29} rows={5} placeholder='Describe It....(Optional)' name='description'  onChange={handleChange} value={infos.description}></textarea>
              </div>
            </div>
            <div className='container'>
              <div>
                <h2>What's The Price : </h2>
                <input type='number' name='price' placeholder='Price...'  onChange={handleChange} value={infos.price}/> <span style={{fontFamily:"Trebuchet MS",fontSize:20,color:'rgb(129,129,129)'}}>Dh</span>
              </div> 
              <div className='btns'>
              <div className='imageUpload'>
                  <label>
                    <i class="fa-solid fa-upload fa-lg"></i> Car's Image
                    <input type='file' accept='image/*' name='image'  onChange={(e)=>{setInfos((i)=>{return({...i,["image"]:e.target.files[0]})})}}/>
                  </label>
                </div>
                <div>
                  <button><i class="fa-solid fa-check fa-xl"></i></button>
                </div>
              </div> 
            </div>
            {err!==""?<p className='err'>{err}</p>:null}
          </form>
        </div>
        <div className='imgHolder'>
          <img src={`${basePath}Sell.webp`}></img>
        </div>
    </section>
    :
    <Forbidden/>
    }
    </>
  )
}

export default AddCar