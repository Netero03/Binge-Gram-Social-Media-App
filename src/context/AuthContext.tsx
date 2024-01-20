import { IContextType, IUser } from "@/types";
import { createContext,useContext,useEffect,useState } from "react"


export const INITIAL_USER={
    id:'',
    name:'',
    username:'',
    email:'',
    imageUrl:'',
    bio:''
};

const INITIAL_STATE = {
    user:INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async() => false as boolean,
};

type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

const AuthContext=createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({children}:{children:React.ReactNode}) => {
  const [user,setUser]=useState<IUser>(INITIAL_USER);

  return (
    <div>AuthContext</div>
  )
}

export default AuthContext