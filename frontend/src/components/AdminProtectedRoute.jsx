import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoute = () => {
    const { loginContext } = useAuthContext();
    return (
        <div>
            {
                loginContext?(
                    loginContext?.role==="admin" ? <Outlet /> : <Navigate to='/courses' replace />
                ):<Navigate to='/login' replace />
            }
        </div>
    )
}

export default AdminProtectedRoute