const login=async(login,password,setErr,setIsLogged)=>{
    const response=await fetch("http://localhost:9090/auth/login",{
        method:'POST',
        credentials:'include',
        body:JSON.stringify({login:login,password:password}),
        headers:{
            'Content-Type':'application/json'
        }
    })
    await response.text().then((data)=>{
        if(data==="Logged"){
            setIsLogged(true);
        }else{
            setErr(data);
        }
    })
}
const signUp=async(infos,setErr)=>{
    const response=await fetch("http://localhost:9090/auth/signup",{
        method:"POST",
        credentials:"include",
        body:JSON.stringify(infos),
        headers:{
            'Content-Type':'application/json'
        }
    })
    await response.text().then((data)=>{
        if(data==="Signed Up Successfully"){
            document.getElementById('signup').style.display="none"
            document.getElementById('login').style.display="none"
        }else{
            setErr(data)
        }
    })
}
const checkConnexion=async(setIsLogged)=>{
    const response=await fetch("http://localhost:9090/auth/checkSession",{
        method:"GET",
        credentials:"include",
    })
    await response.json().then((data)=>{
        if(data.status==="logged"){
            console.log(data);
            setIsLogged(true)
        }else{
            setIsLogged(false)
        }
    })
}
const logout=async(setIsLogged)=>{
    const response=await fetch("http://localhost:9090/auth/logout",{
        method:"DELETE",
        credentials:"include",
    })
    await response.text().then((data)=>{
        setIsLogged(false);
    })
}

module.exports={
    login,
    signUp,
    checkConnexion,
    logout
}