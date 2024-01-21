import { Navigate,Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";


function ProtectedRoute(){
    const{user,isAuthenticated} = useAuth();
    console.log(user,isAuthenticated);
    if(!isAuthenticated){
        return <Navigate to='/login' replace/>
    }
    return <Outlet />;
    
}


export default ProtectedRoute;