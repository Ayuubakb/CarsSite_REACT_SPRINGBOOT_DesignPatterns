const addFav=async(setErr,favCar)=>{
    const response=await fetch(`http://localhost:9090/user/AddFav`,{
        method:'POST', 
        credentials:'include',
        body:JSON.stringify(favCar),
        headers:{
            'Content-Type':'application/json'
        }
    })
    await response.text().then(
        (data)=>{
            setErr(data);
        }
    )
}

const deleteFav=async(setErr,favCar)=>{
    const response=await fetch(`http://localhost:9090/user/deleteFav`,{
        method:'DELETE', 
        credentials:'include',
        body:JSON.stringify(favCar),
        headers:{
            'Content-Type':'application/json'
        }
    })
    await response.text().then(
        (data)=>{
            setErr(data);
        }
    )
}

const checkFav=async(setIsfavorite,favCar)=>{
    const response=await fetch(`http://localhost:9090/user/checkFav`,{
        method:'POST', 
        credentials:'include',
        body:JSON.stringify(favCar),
        headers:{
            'Content-Type':'application/json'
        }
    })
    await response.text().then(
        (data)=>{
            console.log("check: "+data);
            data==="0"?setIsfavorite(false):setIsfavorite(true)
        }
    )
}

const profile=async(setData)=>{
    const response=await fetch(`http://localhost:9090/user/profile`,{
        method:'GET', 
        credentials:'include'
    })
    await response.json().then(
        (data)=>{
            console.log(data);
            if(data.Response!==null){
                if(data.UserInfo.Favourites==null)
                    data.UserInfo.Favourites=[];
                setData(data)
            }
        }
    )
}

module.exports={
    addFav,
    deleteFav,
    checkFav,
    profile
}