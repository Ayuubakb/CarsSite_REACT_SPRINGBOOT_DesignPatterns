import React from 'react'
import {Link} from 'react-router-dom'

const CarOfferCard = ({id,ext,img,maker,model,year,price}) => {
    const imageBasePath=window.location.protocol+"//"+window.location.host+"/Assets/"
  return (
    <Link to={`showCar?id=${id}`} style={{textDecoration:"none"}} className='carOff'>
        <div className="carOfferCard">
            <div>
            {img!==null?
                <img src={`data:image/${ext};base64,${img}`}/> 
            :
                <img src={`${imageBasePath}128.jpg`}/>
            }
            </div>
            <div>
            <h1>{`${maker} ${model} (${year})`}</h1>
            <p>{price} DH</p>
            </div>
        </div>
    </Link>
  )
}

export default CarOfferCard