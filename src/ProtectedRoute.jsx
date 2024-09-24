import { Navigate } from "react-router-dom";

// Component to protect routes
const ProtectedRoute = ({ children }) => {

    const token = localStorage.getItem('token');// Check for token

    if (!token) {
        return <Navigate to='/login' />; // Redirect to login if not authenticated
    }

    return children; // Render the child component if authenticated
}

export default ProtectedRoute;