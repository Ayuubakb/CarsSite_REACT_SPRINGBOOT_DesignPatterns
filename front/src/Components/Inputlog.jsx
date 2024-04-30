import React from 'react'

const Inputlog = ({type,label,name,val,setVal}) => {
  return (
    <div className='inputLog'>
        <label>{label}</label>
            <input
                type={type}
                name={name}
                value={val}
                onChange={(e)=>{setVal((v)=>{return {...v,[name]:e.target.value}})}}
            />
    </div>
  )
}

export default Inputlog