import React from "react";
import { useAuth } from "../ContentApp/AuthContext";
import { Navigate, Outlet } from "react-router-dom";


export default function ProtectedRoute() {
    
    const { obtenerUsuarioActual } = useAuth();

    const usuario = obtenerUsuarioActual();

    const tieneMembresia =
    !["admin","coach"].includes(usuario?.rol?.toLowerCase());

    const requiereRenovacion = tieneMembresia && usuario?.membresia_estado === "vencida";

   if (requiereRenovacion) {
    return (<Navigate 
    to="/apptraining/membresia" 
    replace
    />
   );
   }
    return <Outlet />; 
}