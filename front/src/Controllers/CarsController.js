

const getCars=async(maker,model,year,setCars)=>{
    const response=await fetch(`http://localhost:9090/usedCar/getCars/${model}/${maker}/${year}`,{
        method:'GET', 
        credentials:'include'
    })
    await response.json().then(
        (data)=>{
            setCars(data);
        }
    )
}

const getCar=async(id,setCar)=>{
    const response=await fetch(`http://localhost:9090/usedCar/getCar/${id}`,{
        method:'GET', 
        credentials:'include'
    })
    await response.json().then(
        (data)=>{
            setCar(data);
        }
    )
}

const addCar=async(infos,setErr)=>{
    var formData=new FormData();
      const usedCar={
          maker:infos.maker,
          model:infos.model,
          year:parseInt(infos.year),
          price:parseFloat(infos.price),
          mileage:parseInt(infos.mileage)
      }
      const blob=new Blob(
        [JSON.stringify(usedCar)],
        {type: "application/json"}
      );
      let description;
      if(infos.description==="")
        description="No Description Given"
      else
        description=infos.description

      formData.append("usedcar",blob);
      formData.append("description",description);
      formData.append("photo",infos.image);
    const response=await fetch(`http://localhost:9090/usedCar/add`,{
        method:'POST', 
        credentials:'include',
        body:formData
    })
    await response.text().then(
        (data)=>{
            setErr(data);
        }
    )
}

const deletCar=async(setErr,id)=>{
    console.log(id);
    const response=await fetch(`http://localhost:9090/usedCar/deleteCar/${id}`,{
        method:'DELETE', 
        credentials:'include'
    })
    await response.text().then(
        (data)=>{
            setErr(data);
        }
    )
}

const getCarSpecs=async(maker,model,year,setSpecs)=>{
    const response=await fetch('https://api.api-ninjas.com/v1/cars?model=' + model +'&make='+ maker +'&year='+year+'&limit=1',{
        method:"GET",
        headers:{
            'X-Api-Key': 'Wg5tJUa8HhGgl01GuNNAlQ==zazHSmoiuuSLXTkI',
            'Content-Type':'application/json'
        }
    });
    await response.json().then(
        (data)=>{
            if(data.length!==0){
                setSpecs((s)=>{
                    return({
                    ...s,
                    class:data[0].class,
                    cylinders:data[0].cylinders,
                    fuel_type:data[0].fuel_type,
                    transmission:data[0].transmission,
                    drive:data[0].drive,
                    combination_mpg:data[0].combination_mpg
                    })
                })
            }else{
                setSpecs({indispo:true})
            }
        }
    )
}

/*const getCarimg=async(maker,model,year,setSpecs)=>{
    const response2=await fetch("https://serpapi.com/search.json?engine=google_images&q="+maker+" "+model+" "+year+"&api_key=2526a4f46452d1cfb1015284e551c6ffcdeaab9e3929fce8a60f7058413afa38",{
        method:"GET",
        headers:{
            'Content-Type':'application/json'
        }
    });
    await response2.json().then(
        (data)=>{
            for(let i=0;i<data.suggested_searches.length;i++){
                console.log(data.suggested_searches[i]);
                if(data.suggested_searches[i].thumbnail!==null){
                    setSpecs((s)=>{
                        return({
                            ...s,
                            img:data.suggested_searches[i].thumbnail
                        })
                    })
                    break;
                }
            }
        }
    )
}*/

module.exports={
    getCars,
    getCar,
    addCar,
    deletCar,
    getCarSpecs
}