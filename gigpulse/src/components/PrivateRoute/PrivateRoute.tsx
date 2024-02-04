import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

interface PrivateRouteProps {
    children: ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
    const isLogged = useAppSelector((state) => state.user.logged);
    const location = useLocation();

    if (!isLogged) {
        return <Navigate to="/connexion" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}

export default PrivateRoute;
