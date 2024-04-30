import { createContext } from "react";

const isLogged={isLogged:false,setIsLogged:()=>{}};

const logContext=createContext(isLogged);

export default logContext;