import React, { useState } from 'react'

const Search = ({setNext,query,setQuery}) => {
    const [err,setErr]=useState("")
    const handleClick=()=>{
        const inputs=document.getElementById("searchForm").querySelectorAll("input");
        if(query.maker==="" && query.model==="" && query.year===""){
            setErr("Give us a hint ")
            inputs.forEach(input => {
                input.style.border="solid 3px red";
            });
        }else{
            inputs.forEach(input => {
                input.style.border="none";
            });
            setNext(true);
        }
    }
  return (
    <div className='search' id='searchForm'>
        <input
            type='text'
            name='maker'
            value={query.maker}
            placeholder='Maker...'
            onChange={(e)=>{setQuery((q)=>{return {...q,['maker']:e.target.value}})}}
        />
        <input
            type='text'
            name='model'
            value={query.model}
            placeholder='Model...'
            onChange={(e)=>{setQuery((q)=>{return {...q,['model']:e.target.value}})}}
        />
        <input
            type='number'
            name='year'
            value={query.year}
            placeholder='Year...'
            onChange={(e)=>{setQuery((q)=>{return {...q,['year']:e.target.value}})}}
        />
        {setNext!=null?
            <>
                <button onClick={handleClick}>Search</button>
                {err!==""?<p className='err'>{err} &#128543;</p>:null}
            </>
        :
            null
        }
    </div>
  )
}

export default Search