import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button } from "@mui/material";

export default function RegistroForm({ onNext }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);

    const hndlSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true); 

        const userData = {
            nombre: name,
            email: email,
            password: password,
            rol: "usuario", 
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Registro exitoso:", data);
                // Si el registro es exitoso, avanzamos al siguiente paso
                onNext(email, parseInt(data.user_id, 10));
            } else {
                console.error("Error en el registro:", data.detail);
                alert(`Error en el registro: ${data.detail}`);
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            alert("Error de conexión con el servidor. Inténtalo de nuevo.");
        } finally {
            setIsLoading(false); 
        }
    };


    return (
        <Container maxWidth="lg" 
        sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            mt: 5
        }}
        >
            <Box
                component="form"
                onSubmit={hndlSubmit}
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
                    mb: 5
                }}
            >
                <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'rgb(0, 204, 255)', mb: 4}}>
                    Regístrate 
                </Typography>
                <TextField
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
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
                <TextField
                    label="Correo Electrónico"
                    variant="outlined"
                    fullWidth
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
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
                <TextField
                    label="Contraseña"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    sx={{ 
                        mb: 4, 
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
                <Button type="submit" variant="contained"  fullWidth 
                sx={{
                    bgcolor: 'rgb(0, 179, 255)',
                    '&:hover': { bgcolor: 'rgb(0, 179, 255)' },
                    py: 1,
                    mb: 2,
                    fontWeight: 'bold',
                    '&:hover': { bgcolor: 'rgb(3, 160, 228)' },

                }}
                >
                    Siguiente
                </Button>
            </Box>
        </Container>
    );
}