import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const LOCAL_STORAGE_KEY = 'authData'; 

/**
 * Función para obtener los datos de autenticación iniciales desde localStorage.
 */
const getInitialAuthData = () => {
  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (storedData) {
    try {
      // Intentamos parsear la data (token, userId, rol, nombre)
      return JSON.parse(storedData);
    } catch (e) {
      console.error("Error al parsear datos de autenticación:", e);
      return null;
    }
  }
  return null;
};


export const AuthProvider = ({ children }) => {
  // Estado que guarda la información de sesión: { token: '...', userId: 1, rol: 'coach', nombre: '...' }
  const [authData, setAuthData] = useState(getInitialAuthData());

  // Sincroniza el estado de React con localStorage cada vez que authData cambia
  useEffect(() => {
    if (authData && authData.token) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(authData));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [authData]);


  // Guarda la data de la respuesta de /auth/login
  const login = (data) => {
    setAuthData({
      token: data.access_token,
      userId: data.user_id,
      rol: data.rol,
      nombre: data.nombre // Asumimos que el backend devuelve 'nombre'
    });
  };

  // Cierra sesión
  const logout = () => {
    setAuthData(null);
  };

  // Función para pasar el Token en los Headers de FastAPI
  const obtenerTokenActual = () => authData?.token;
  
  // Función para obtener el ID y Rol del usuario logueado
  const obtenerUsuarioActual = () => ({
      id: authData?.userId,
      rol: authData?.rol,
      nombre: authData?.nombre
  });
  
  const isAuthenticated = !!authData?.token;

  return (
    <AuthContext.Provider value={{ 
      authData, 
      isAuthenticated, 
      login, // Usado en el componente Login
      logout, // Usado en el botón de cerrar sesión
      obtenerTokenActual, // Usado en fetch requests (CrearPrograma, HomeApp)
      obtenerUsuarioActual // Usado en fetch requests (CrearPrograma, HomeApp)
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // Esto previene errores si el hook se usa fuera del Provider
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};