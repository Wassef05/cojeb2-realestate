import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ user, children }) => {
    if(!localStorage.getItem('user') && !user) {
        return <Navigate to={"/connexion"} replace />
    }
    return children
};

export default ProtectedRoute;