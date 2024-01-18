import { createContext,useContext,useEffect,useState } from "react"

export const INITIAL_USER={
    id:'',
    name:'',
    username:'',
    email:'',
    imageUrl:'',
    bio:''
};

const INITIAL_STATE={
    user:INITIAL_USER,
    isLoading:false,
    isAuthenticated:false,
    setUser:()=>{},
    setIsAuthentication:()=>{},
    checkAuthUser:async()=>false as boolean,
}

const AuthContext=createContext<IContextType>(INITIAL_STATE);

const AuthContext = ({children}:{children:React.ReactNode}) => {

    

  return (
    <div>AuthContext</div>
  )
}

export default AuthContext