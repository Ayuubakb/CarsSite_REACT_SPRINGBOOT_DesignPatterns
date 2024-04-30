import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({img,desc,link,style,fct}) => {
  var action;
  return (
    <Link to={link} onClick={fct} className='link' style={style}>
        <div className='Card'>
            <div className='imgHolder'>
                <img src={img}/>
            </div>
            <div className='desc'>
                <h1>{desc}</h1>
            </div>
        </div>
    </Link>
  )
}

export default Card