import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading, authError } = useAuth();

    if (loading) {
        return <div>Cargando...</div>;
    }
    if (!user) {
        return <Navigate to="/login"/>;
    }
    if (authError) {
        return <p role="alert">{authError} No se habilitó el acceso a Gestión. Revisá la conexión y las reglas de Firestore.</p>;
    }
    if (allowedRoles && !allowedRoles.includes(user.rol)) {
        return (
            <p role="alert">
                Tu cuenta no tiene permisos de administrador. Para habilitar Gestión,
                asigná el rol <code>admin</code> al documento <code>usuarios/{user.uid}</code> en Firestore.
            </p>
        );
    }
    return <>{children}</>;
};

export default ProtectedRoute;