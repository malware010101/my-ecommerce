import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; 
import { useAuth } from '../AuthContext';

export default function LoginApp() {
     const navigate = useNavigate();
     const {login} = useAuth();
    // const setUsuario = useSetRecoilState(userState);
    const [credenciales, setCredenciales] = useState({
        email: '',
        password: ''
    });

    const hndlChange = (e) => {
        const { name, value } = e.target;
        setCredenciales({ ...credenciales, [name]: value });
    };

    const hndlIniciarSesion = async () => {
        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: credenciales.email,
                    password: credenciales.password
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("¡Inicio de sesión exitoso!", data);
                login(data);
                // setUsuario({
                //      id: data.user_id,
                //      nombre: data.nombre,
                //      rol: data.rol });
                navigate('/apptraining/home');
            } else {
                let errorDetail = `Error HTTP: ${response.status} - ${response.statusText}. Ruta incorrecta o servidor caído.`;
                
                try {
                    const text = await response.text();
                    
                    if (text) {
                        const errorData = JSON.parse(text);
                        errorDetail = errorData.detail || errorDetail; 
                    }
                } catch (e) {
                    console.warn("La respuesta de error no fue JSON. Posiblemente un 404 con cuerpo vacío.");
                }
            
                console.error(`Error de autenticación: ${errorDetail}`);
            }
        } catch (error) {
            console.error("Hubo un error al iniciar sesión:", error.message || error);
        }
    };
    return (
        <Container 
            maxWidth="lg" 
            sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh',
            }}
        >
            <Box 
                sx={{
                    bgcolor: '#000', 
                    p: { xs: 3, sm: 5 },
                    borderRadius: '10px',
                    boxShadow: '0 4px 20px rgba(0, 183, 255, 0.7)',
                    maxWidth: 400,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography 
                    variant="h4" 
                    component="h1" 
                    gutterBottom 
                    sx={{ fontWeight: 'bold', color: 'rgb(0, 179, 255)' }}
                >
                    Iniciar Sesión
                </Typography>

                <TextField
                    label="Correo Electrónico"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name='email'
                    value={credenciales.email}
                    onChange={hndlChange}
                    sx={{ 
                        mb: 2, 
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: '#000',
                            color: '#fff',
                            boxShadow: '0 0 5px rgba(0, 183, 255, 0.7)',
                            '&:hover fieldset': {
                                borderColor: 'rgb(0, 179, 255) !important',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'rgb(0, 179, 255)',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'rgb(0, 179, 255)',
                        },
                    }}
                        
                />

                <TextField
                    label="Contraseña"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    name='password'
                    value={credenciales.password}
                    onChange={hndlChange}
                    sx={{ 
                        mb: 3, 
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: '#000',
                            color: '#fff',
                            boxShadow: '0 0 5px rgba(0, 183, 255, 0.7)',
                            
                            '&:hover fieldset': {
                                borderColor: 'rgb(0, 179, 255) !important',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'rgb(0, 179, 255)',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'rgb(0, 179, 255)',
                        },
                    }}
                />
                
                <Button
                    variant="contained"
                    onClick={hndlIniciarSesion}
                    fullWidth
                    sx={{
                        bgcolor: 'rgb(0, 179, 255)',
                        '&:hover': { bgcolor: 'rgb(0, 179, 255)' },
                        py: 1.5,
                        mb: 2,
                        fontWeight: 'bold',
                    }}
                >
                    Acceder
                </Button>

                <Typography variant="body2" sx={{ color: '#fff', textAlign: 'center' }}>
                    ¿No tienes una cuenta? {' '}
                    <Link to="/apptraining/suscription" style={{ textDecoration: 'none', color: 'rgb(0, 179, 255)', fontWeight: 'bold' }}>
                        Suscribirse
                    </Link>
                </Typography>
                <Typography variant="body2" sx={{ color: '#fff', textAlign: 'center', mt: 2 }}>
                    ¿Olvidaste tu contraseña? {' '}
                    <Link to="/apptraining/forgot-password" style={{ textDecoration: 'none', color: 'rgb(0, 179, 255)', fontWeight: 'bold' }}>
                        Recuperar
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
}