import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteFav } from '../Controllers/userController'
import { deletCar } from "../Controllers/CarsController"

const FavandOffers = ({id,maker,model,year,price,link,setErr,type}) => {
    const handleRemove=()=>{
        deleteFav(setErr,{maker:maker,model:model,year:year})
    }
    const handleRemove2=(id)=>{
        deletCar(setErr,id)
    }
  return (
    <div className='favDiv'>
    <Link to={link} className="favLink" style={{textDecoration:"none"}}>
    <div className='FavandOffer'>
        <div>
            <p>{maker}</p>
        </div>
        <div>
            <p>{model}</p>
        </div>
        <div>
            <p>{year}</p>
        </div>
        {
            price!==null?
            <div>
                <p>{price} DH</p>
            </div>
            :null
        }
        
    </div>
    </Link>
    <div className='btn' onClick={type==='fav'?handleRemove:()=>handleRemove2(id)}>
        <button><i class="fa-solid fa-trash fa-lg"></i></button>
    </div>
    </div>
  )
}

export default FavandOffers