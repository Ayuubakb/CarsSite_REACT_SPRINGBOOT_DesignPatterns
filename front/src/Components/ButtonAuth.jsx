import React from 'react'

const ButtonAuth = ({label,fct,color}) => {
  return (
    <button className="AuthButton" onClick={fct} style={{backgroundColor:color}}>
        {label}
    </button>
  )
}

export default ButtonAuth