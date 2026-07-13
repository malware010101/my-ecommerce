import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; 
import { useAuth } from '../AuthContext';
import { useSnackbar } from "notistack";
import api from '../../api';

export default function LoginApp() {
    const { enqueueSnackbar } = useSnackbar();
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
        const { data } = await api.post("/auth/login", {
            email: credenciales.email,
            password: credenciales.password,
        });

        localStorage.setItem("access_token", data.access_token);

        login(data);

        navigate("/apptraining/home");

        enqueueSnackbar("¡Bienvenido a Reps!", {
         variant: "success",
         autoHideDuration: 3000,
        });

    } catch (error) {
        enqueueSnackbar(
            error.response?.data?.detail || "Error al iniciar sesión",
            { variant: "error" }
        );
    }
};

    useEffect(() => {
        const mensaje = sessionStorage.getItem('message');
        if (mensaje) {
            enqueueSnackbar(mensaje, { variant: 'error' });
            sessionStorage.removeItem('message');
        }
    }, []);

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
                        borderRadius: '20px',
                        bgcolor: 'rgb(0, 179, 255)',
                        '&:hover': { bgcolor: 'rgb(0, 179, 255)' },
                        py: 1.5,
                        mb: 2,
                        fontWeight: 'bold',

                    }}
                >
                    Acceder
                </Button>

                {/* <Typography variant="body2" sx={{ color: '#fff', textAlign: 'center' }}>
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
                </Typography> */}
            </Box>
        </Container>
    );
}