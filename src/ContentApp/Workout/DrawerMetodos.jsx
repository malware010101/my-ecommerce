import React, { useState } from 'react';
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Card,
    CardContent,
    Stack
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';


const metodos = [
    { id: "1", nombre: 'Serie', descripcion: 'Ejercicio normal, con su respectivo descanso.' },
    { id: "2", nombre: 'Biserie', descripcion: 'Realiza dos ejercicios uno seguido del otro, sin descanso. El descanso a tomar vendra en el segundo ejercicio.' },
    { id: "3", nombre: 'Triserie', descripcion: 'Realiza tres ejercicios seguidos sin descanso entre ellos. El descanso a tomar vendra en el 3er ejercicio' },
    { id: "1", nombre: 'Circuito', descripcion: 'Ronda de 4 o mas ejercicios consecutivos sin descanso. El descanso a tomar vendra en el ultimo ejercicio.' },
    { id: "4", nombre: 'Cluster Set', descripcion: 'Realiza un número de repeticiones, descansa brevemente y repite hasta completar la serie.' },
    { id: "5", nombre: 'Superserie', descripcion: 'Combina dos ejercicios opuestos, realizandolos uno seguido del otro sin descanso. El descanso a tomar vendra en el segundo ejercicio.' },
    { id: "6", nombre: 'Cardio Continuo', descripcion: 'Realizar una sesion cardiovascular continua a una frecuencia moderada.' },

];

const MethodLibraryCard = ({ method, onSelect }) => {
    return (
        <Card
            onClick={() => onSelect(method)}
            sx={{
                bgcolor: '#1c1c1e',
                borderRadius: '10px',
                color: '#fff',
                border: '1px solid #333',
                cursor: 'pointer',
                '&:hover': {
                    border: '1px solid rgb(0, 204, 255)',
                    bgcolor: '#28282b'
                }
            }}
        >
            <CardContent>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {method.nombre}
                </Typography>
                <Typography variant="body3" color="#bbb" >
                    {method.descripcion}
                </Typography>
            </CardContent>
        </Card>
    );
};


export default function DrawerMetodos({ open, onClose, onSelectMethod }) {
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            hideBackdrop={true}
            elevation= {0}
            sx={{
                '& .MuiDrawer-paper': {
                    width: { xs: '90%', sm: '70%', md: '450px' },
                    bgcolor: '#000',
                    color: '#fff',
                    boxSizing: 'border-box',
                    boxShadow: '-4px 0px 10px rgba(0, 204, 255, 0.7)',
                },
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, bgcolor: 'rgb(0, 204, 255)', p: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Añadir método</Typography>
                <IconButton onClick={onClose} color="inherit">
                    <CloseIcon />
                </IconButton>
            </Box>

            <Box sx={{ p: 2 }}>
                <Stack direction="column" spacing={2}>
                    {metodos.map(method => (
                        <MethodLibraryCard
                            key={method.id}
                            method={method}
                            onSelect={onSelectMethod}
                        />
                    ))}
                </Stack>
            </Box>
        </Drawer>
    );
}