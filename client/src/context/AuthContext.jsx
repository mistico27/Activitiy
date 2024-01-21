import { createContext,useState,useContext} from "react";
import {registerRequest,loginRequest} from '../api/auth.js';
 
export const AuthContext =createContext();

///setting the hook
export const useAuth = ()=>{
   const context= useContext(AuthContext);
   if(!context){
        throw new Error("useAuth must be used within an authProvider")
   }
   return context;
};

export const AuthProvider =({children})=>{
    const [user,setUser]=useState(null);
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);

    const signUp =async (user)=>{
    try{    
    const response= await  registerRequest(user);
         console.log(response.data);
         setUser(response.data);
         setIsAuthenticated(true);
    }catch(error){
        setErrors(error.response.data);
    }
};


///signin Function
const signin = async (user)=>{
    try{
   const res = await loginRequest(user);
   console.log(res);
    }catch(error){
        setErrors(error.response.data);
   }
}


    return(
        <AuthContext.Provider value={{
            signUp,user,isAuthenticated,errors, signin,
        }}>
            {children}
        </AuthContext.Provider>
    )
}