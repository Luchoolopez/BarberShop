import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const AdminRoute = () => {
    const { isAuthenticated, user, loading } = useAuthContext();
    if(loading){
        return<div>Verificando sesion...</div>
    }

    if(!isAuthenticated){
        return <Navigate to='/iniciar-sesion' replace/>
    }

    if(user?.role !== 'admin'){
        return <Navigate to='/' replace/>
    }

    return <Outlet/>
}