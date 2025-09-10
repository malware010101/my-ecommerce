// src/ContentApp/LoginApp/index.jsx
import React from 'react';
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; 

export default function LoginApp() {
    const navigate = useNavigate();

    const hndlIniciarSesion = () => {
        navigate('/apptraining/home'); 
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
                    label="Usuario"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    placeholder="Ingresa tu nombre de usuario o correo"
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
                    placeholder="Ingresa tu contraseña"
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