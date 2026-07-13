import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, CircularProgress, MenuItem } from "@mui/material";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api  from "../../api";
import { useSnackbar } from 'notistack';

export default function FormRegistro({  }) {
    const { enqueueSnackbar } = useSnackbar();

    const queryClient = useQueryClient();
    const [ formData, setFormData ] = useState({
        nombre: '',
        email: '',
        password: '',
        rol: 'usuario',
        membresia_plan: 'standard'
    })

    const mutation  = useMutation ({
        mutationFn: async (newUser) => {
            const {data} = await api.post('/auth/register', newUser);
            return data
        },
        onSuccess: () => {
            enqueueSnackbar('Usuario registrado correctamente', 
                { variant: 'success',
                 });
                 const notiSound = new Audio('/sounds/success.mp3');
                 notiSound.volume = 0.4;
                 notiSound.play();

                 queryClient.invalidateQueries({ queryKey: ["users"] });
                 setFormData({
                    nombre: '',
                    email: '',
                    password: '',
                    rol: 'usuario',
                    membresia_plan: 'standard'
                 });
        },
        onError: ( error) => {
            enqueueSnackbar(
                error.response?.data?.detail || "Error al registrar usuario",
                { variant: 'error' }
            );
        },
    });

    const hndlSubmit = async (e) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

 const roles = [
        { value: 'usuario', label: 'usuario' },
        { value: 'pro', label: 'pro' },
    ];

    const planes = [
        { value: 'trial', label: 'Prueba (7 días)' },
        { value: 'standard', label: 'Standard (30 días)' },
        { value: 'platinum', label: 'Platinum (90 días)' },
        { value: 'gold', label: 'Gold (180 días)' },
        { value: 'diamond', label: 'Diamond (365 días)' },
    ]

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
                    Inscripcion
                </Typography>
                <TextField
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    required
                    sx={{ 
                       mb: 3, 
                        
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(8, 8, 8, 1)',
                            color: '#fff',
                            '&:hover fieldset': {
                                borderColor: 'rgb(0, 179, 255) !important',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'rgb(0, 179, 255)',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: '#474747ff',
                        },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#000' }
                    }}

                />
                <TextField
                    label="Correo Electrónico"
                    variant="outlined"
                    fullWidth
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    sx={{ 
                    mb: 3, 
                        
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(8, 8, 8, 1)',
                            color: '#fff',
                            '&:hover fieldset': {
                                borderColor: 'rgb(0, 179, 255) !important',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'rgb(0, 179, 255)',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: '#474747ff',
                        },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#000' }
                    }}
                />
               
                <TextField
                    label="Contraseña"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    sx={{ 
                        mb: 4, 
                        
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(8, 8, 8, 1)',
                            color: '#fff',
                            '&:hover fieldset': {
                                borderColor: 'rgb(0, 179, 255) !important',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'rgb(0, 179, 255)',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: '#474747ff',
                        },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#000' }

                    }}
                />
                 <TextField
                label='rol'
                variant="outlined"
                select
                fullWidth
                value={ formData.rol }
                onChange={ (e) => setFormData({ ...formData, rol: e.target.value }) }
                required
                sx={{ 
                   mb: 3, 
                        
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(8, 8, 8, 1)',
                            color: '#fff',
                            '&:hover fieldset': {
                                borderColor: 'rgb(0, 179, 255) !important',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'rgb(0, 179, 255)',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: '#474747ff',
                        },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#000' }
                }}
                >
                    {roles.map((rol) => (
                        <MenuItem key={rol.value} value={rol.value}>
                            {rol.label}
                        </MenuItem>
                    ))}
                </TextField>
                 <TextField
                label='planes de membresia'
                variant="outlined"
                select
                fullWidth
                value={ formData.membresia_plan }
                onChange={ (e) => setFormData({ ...formData, membresia_plan: e.target.value }) }
                required
                sx={{ 
                   mb: 3, 
                        
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(8, 8, 8, 1)',
                            color: '#fff',
                            '&:hover fieldset': {
                                borderColor: 'rgb(0, 179, 255) !important',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'rgb(0, 179, 255)',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: '#474747ff',
                        },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#000' }
                }}
                >
                    {planes.map((plan) => (
                        <MenuItem key={plan.value} value={plan.value}>
                            {plan.label}
                        </MenuItem>
                    ))}
                </TextField>
                    

                <Button 
                type="submit" 
                variant="contained"  
                fullWidth 
                disabled={ mutation.isPending}
                sx={{
                    bgcolor: 'rgb(0, 179, 255)',
                    '&:hover': { bgcolor: 'rgb(0, 179, 255)' },
                    py: 1,
                    mb: 2,
                    fontWeight: 'bold',
                    '&:hover': { bgcolor: 'rgb(3, 160, 228)' },
                    borderRadius: '20px'

                }}
                >
                {mutation.isPending ? (
                    <CircularProgress size={24} color="inherit" />
                ) : (
                    'Registrar'
                )}
                </Button>
            </Box>
        </Container>
    );
}