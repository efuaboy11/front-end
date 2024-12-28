import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";


const PrivateRoute = ({requiredRole}) =>{
    const {user} = useContext(AuthContext)
    if(!user){
        return <Navigate to='/login' />
    }

    if(requiredRole && user.role !== requiredRole){
        return <Navigate to='/dashboard/home' />
    }

    return <Outlet />
}

export default PrivateRoute