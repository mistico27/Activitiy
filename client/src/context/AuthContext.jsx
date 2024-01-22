import { createContext,useState,useContext,useEffect} from "react";
import {registerRequest,loginRequest,verifyTokenRequest} from '../api/auth.js';
import Cookies from "js-cookie";

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
    const [loading,setLoading]=useState(true);

    const signUp =async (user)=>{
    try{    
    const response= await  registerRequest(user);
         console.log(response.data);
         setUser(response.data);
         setIsAuthenticated(true);
    }catch(error){
        console.log(error.response);
        setErrors(error.response.data);
    }
};


///signin Function
const signin = async (user)=>{
    try{
   const res = await loginRequest(user);
   console.log(res);
   setIsAuthenticated(true);
   setUser(res.data);
    }catch(error){
        console.log(error.response);
        setErrors(error.response.data);
   }
}

const logout = ()=>{
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
}


///clear timer
useEffect(()=>{
    if(errors.length>0){
      const timer =  setTimeout(()=>{
            setErrors([])
        },3000)
        return ()=>clearTimeout(timer);
    }
},[errors])

useEffect(()=>{
    async function checkLogin() {
    const cookies = Cookies.get();
    console.log(cookies);
    if(!cookies.token){
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
    }
       try{
       const res = await verifyTokenRequest(cookies.token);
        if(!res.data)  {
            setIsAuthenticated(false);
            setLoading(false);
            return;
        } 

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
       }catch(error){
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
       }
}  
checkLogin();
},[])


    return(
        <AuthContext.Provider value={{
            signUp,user,isAuthenticated,errors, signin,loading,logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}