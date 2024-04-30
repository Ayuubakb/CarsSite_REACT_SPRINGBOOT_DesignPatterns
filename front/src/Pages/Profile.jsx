import React, { useContext, useEffect, useState } from 'react'
import { profile } from '../Controllers/userController'
import FavandOffers from '../Components/FavandOffers'
import logContext from '../Controllers/AuthContext'
import Forbidden from '../Components/Forbidden'

const Profile = () => {
    const logCon=useContext(logContext);
    const [err,setErr]=useState("");
    const [data,setData]=useState({UserInfo:{Login:"",Phone:"",City:"",Favourites:[]},UsedCars:[]})
    useEffect(()=>{
        profile(setData);
    },[err])
    console.log(data);
  return (
    <>
    {
        logCon.isLogged?
            
        <section className='profile'>
            <div className='infos'>
                <p><span>Login : </span>{data.UserInfo.Login}</p>
                <p><span>City : </span>{data.UserInfo.City}</p>
                <p><span>Phone : </span>{data.UserInfo.Phone}</p>
            </div>
            <div className='nums'>
                <p><span>Favourites : </span><br></br>{data.UserInfo.Favourites.length}</p>
                <p><span>Posted Cars : </span><br></br>{data.UsedCars.length}</p>
            </div>
            <div className='favs'>
                <h1>Favourites <i class="fa-solid fa-heart " style={{color:"red"}}></i> :</h1>
                {
                    data.UserInfo.Favourites.length===0?
                        <h1 style={{marginTop:"45px",marginLeft:"30%"}}>No Favorites</h1>
                    :
                        data.UserInfo.Favourites.map((f)=>{
                            return(
                                <FavandOffers 
                                    id={null}
                                    maker={f.maker} 
                                    model={f.model} 
                                    year={f.year} 
                                    price={null}
                                    link={`/ViewCar/showCar/?model=${f.model}&maker=${f.maker}&year=${f.year}`}
                                    setErr={setErr}
                                    type="fav"
                                />
                            )
                        })
                }
            </div>
            <div className='posted'>
                <h1>Your Posts 	&#128663; :</h1>
                {
                    data.UsedCars.length===0?
                        <h1 style={{marginTop:"45px",marginLeft:"30%"}}>No Posts</h1>
                    :
                        data.UsedCars.map((f)=>{
                            return(
                                <FavandOffers
                                    id={f.id} 
                                    maker={f.maker} 
                                    model={f.model} 
                                    year={f.year} 
                                    price={f.price}
                                    link={`/ViewCar/showOffer/showCar?id=${f.id}`}
                                    setErr={setErr}
                                    type="offer"
                                />
                            )
                        })
                }
            </div>
        </section>:<Forbidden/>
    }
    </>
  )
}

export default Profile