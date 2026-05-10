// src/ContentApp/SuscriptionApp/PlanCards.jsx
import React from 'react';
import { Container, Typography, Box, Button, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function PlanCards({ onSelectPlan }) {

    const cardStyles = {
        bgcolor: '#000',
        p: { xs: 3, sm: 5 },
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0, 183, 255, 0.7)',
        display: 'flex',
        mb: 4,
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
            transform: 'scale(1.05)',
        }
    };

    const headingStyles = {
        fontWeight: 'bold',
        color: 'rgb(0, 179, 255)',
        mb: 1,
    };

    const featureStyles = {
        color: '#ccc',
        '& .MuiSvgIcon-root': { color: 'rgb(0, 179, 255)' },
    };

    const listScrollStyles = {
        width: '100%',
        maxHeight: 350,
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: '8px',
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 179, 255, 0.5)',
            borderRadius: '10px',
        },
    };

    return (
        <Container
            maxWidth="lg"
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                gap: { xs: 4, md: 8 }
            }}
        >
            <Box sx={{ ...cardStyles, maxWidth: 400, width: '100%' }}>
                <Typography fontSize={26}  fontWeight={'bold'} sx={headingStyles}>
                    Reps Básic
                </Typography>
                <Typography fontSize={20} fontWeight={'bold'} sx={{ color: '#888', mb: 2 }}>
                    $299 mxn/mes
                </Typography>
                <Box sx={listScrollStyles}>
                    <List sx={{ color: '#fff' }}>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Acceso a todos los programas de entrenamiento desarrollados." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CloseIcon />
                            </ListItemIcon>
                            <ListItemText primary="Programa de entrenamiento unico, 100% personalizado, a base de tus objetivos." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Programas con video, descripción e instrucciones." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Chat directa con el entrenador, para canalizarte al programa que mejor se adapta a tus necesidades." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Acceso a clases de todo tipo como funcionales, clases de Hiit, Tabata, Abdomen y mas." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CloseIcon />
                            </ListItemIcon>
                            <ListItemText primary="Plan de nutricion 100% personalizado, con menus personalizados, renovado cada 3 semanas, segun avances." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Acceso a un plan de nutricion mensual, calculado por nuestro algoritmo en base a tus datos corporales, historial medico y objetivos, para alcanzar tus metas." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Acceso a la sección de progreso, donde podras ver tus graficas y estadisticas de tu entrenamiento y progresion fisica." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Acceso a nuestro grupo de la comunidad REPS, donde podras interactuar con los usuarios de reps y derecho a participar en rifas de suplementos cada mes y premios en efectivo." />
                        </ListItem>
                    </List>
                </Box>
                <Button
                    variant="contained"
                    onClick={() => onSelectPlan('usuario')}
                    fullWidth
                    sx={{
                        bgcolor: 'rgb(0, 179, 255)',
                        '&:hover': { bgcolor: 'rgb(0, 179, 255)' },
                        mt: 2,
                        fontWeight: 'bold',
                    }}
                >
                    Seleccionar
                </Button>
            </Box>

            {/* Tarjeta Plan Pro */}
            <Box sx={{ ...cardStyles, maxWidth: 400, width: '100%' }}>
                <Typography fontSize={26} fontWeight={'bold'} sx={headingStyles}>
                    Reps Pro
                </Typography>
                <Typography fontSize={20} fontWeight={'bold'} sx={{ color: '#888', mb: 2 }}>
                    $499 mxn/mes
                </Typography>
                <Box sx={listScrollStyles}>
                    <List sx={{ color: '#fff' }}>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Acceso a todos los programas de entrenamiento desarrollados." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Programa de entrenamiento unico, 100% personalizado, a base de tus objetivos." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Programas con video, descripción e instrucciones." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Chat directa con el entrenador, para canalizarte al programa que mejor se adapta a tus necesidades." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Acceso a clases de todo tipo como funcionales, clases de Hiit, Tabata, Abdomen y mas." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Plan de nutricion 100% personalizado, con menus personalizados, renovado cada 3 semanas, segun avances." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Acceso a un plan de nutricion mensual, calculado por nuestro algoritmo en base a tus datos corporales, historial medico y objetivos, para alcanzar tus metas." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Acceso a la sección de progreso, donde podras ver tus graficas y estadisticas de tu entrenamiento y progresion fisica." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Acceso a nuestro grupo de la comunidad REPS, donde podras interactuar con los usuarios de reps y derecho a participar en rifas de suplementos cada mes y premios en efectivo." />
                        </ListItem>
                    </List>
                </Box>
                <Button
                    variant="contained"
                    onClick={() => onSelectPlan('pro')}
                    fullWidth
                    sx={{
                        bgcolor: 'rgb(0, 179, 255)',
                        '&:hover': { bgcolor: 'rgb(0, 179, 255)' },
                        mt: 2,
                        fontWeight: 'bold',
                    }}
                >
                    Seleccionar
                </Button>
            </Box>
            {/* Tarjeta Gyms*/}
            <Box sx={{ ...cardStyles, maxWidth: 400, width: '100%' }}>
                <Typography fontSize={26} fontWeight={'bold'} sx={headingStyles}>
                    Reps Gyms
                </Typography>
                <Typography fontSize={16}  sx={{ color: '#888', mb: 2 }}>
                    solicita cotizacion
                </Typography>
                <Box sx={listScrollStyles}>
                    <List sx={{ color: '#fff' }}>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Software de gestion y automatizacion de gimnasios + aplicacion de entrenamiento" />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Acceso a tus entrenadores para desarrollar programas de entrenamiento para tus usuarios." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Programa de entrenamineto personlizados para tus usuarios, preescritos por tus entrenadores." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Programas con video, descripción e instrucciones configuradas por tus entrenadores." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Chat directo usuarios/entrenadores, para canalizar y dar soporte online a tus usuarios." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Plan de nutricion 100% personalizado, automatizado con nuestro algoritmo reps." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Acceso a un plan de nutricion mensual, calculado por nuestro algoritmo en base a tus datos corporales, historial medico y objetivos, para alcanzar tus metas." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Medicion, graficos, analisis de resultados para tus usuarios y resumen para que puedas analizar los avances de tus usuarios y progresion fisica. " />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Software de gestion de tu gimnasio, gestion de usuarios, cobros automatizados y control de accesos meidante biometria." />
                        </ListItem>
                    </List>
                </Box>
                <Button
                    variant="contained"
                    onClick={() => onSelectPlan('pro')}
                    fullWidth
                    sx={{
                        bgcolor: 'rgb(0, 179, 255)',
                        '&:hover': { bgcolor: 'rgb(0, 179, 255)' },
                        mt: 2,
                        fontWeight: 'bold',
                    }}
                >
                    Cotizar
                </Button>
            </Box>
            {/* Tarjeta Company*/}
            <Box sx={{ ...cardStyles, maxWidth: 400, width: '100%' }}>
                <Typography fontSize={26} fontWeight={'bold'} sx={headingStyles}>
                    Reps Company
                </Typography>
                <Typography fontSize={16}  sx={{ color: '#888', mb: 2 }}>
                    Solicita cotizacion
                </Typography>
                <Box sx={listScrollStyles}>
                    <List sx={{ color: '#fff' }}>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Servicio de entrenamiento y nutricion digital para tus colaboradores, por nuestro equipo de entrenadores remotos disponibles 24/7." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Acceso a todos los programas de entrenamiento desarrollados por nuestro equipo de entrenadores remotos." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Programas de entrenamiento unicos, 100% personalizados para tus colaboradores." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Programas con video, descripción e instrucciones desarrollados por nuestros entrenadores remotos 24/7." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Soporte directo en tiempo real con nuestro equipo de entrenadores remotos disponibles 24/7." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Acceso a clases de todo tipo como funcionales, clases de Hiit, Tabata, Abdomen y mas." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Plan de nutricion 100% personalizado, automatizado con nuestro algoritmo reps." />
                        </ListItem>
                        <ListItem sx={featureStyles}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Acceso a la sección de progreso, donde podras ver tus graficas y estadisticas de tu entrenamiento y progresion fisica." />
                        </ListItem>
                    </List>
                </Box>
                <Button
                    variant="contained"
                    onClick={() => onSelectPlan('pro')}
                    fullWidth
                    sx={{
                        bgcolor: 'rgb(0, 179, 255)',
                        '&:hover': { bgcolor: 'rgb(0, 179, 255)' },
                        mt: 2,
                        fontWeight: 'bold',
                    }}
                >
                    Cotizar
                </Button>
            </Box>
        </Container>
    );
}