import { useAuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";



const ProtectedRoute = () => {
    const { loginContext } = useAuthContext();
    return (
        <div>
            {
                loginContext ? <Outlet /> : <Navigate to='/login' replace />
            }
        </div>
    )
}

export default ProtectedRoute