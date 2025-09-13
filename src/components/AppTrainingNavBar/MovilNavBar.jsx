// src/components/AppTrainingNavBar/AppTrainingMobileNavbar.jsx

import React, { useState } from 'react';
import { AppBar, Toolbar, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LogoReps from '../../assets/LogoReps.webp';
import CloseIcon from '@mui/icons-material/Close';
import RestaurantIcon from '@mui/icons-material/Restaurant';

export default function MovilNavBar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const location= useLocation();

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const menuItems = [
        { text: 'Inicio', path: '/apptraining/home', icon: <HomeIcon /> },
        { text: 'Mi Entrenamiento', path: '/apptraining/entrenamiento', icon: <FitnessCenterIcon /> },
        { text: 'Mi Nutricion', path: '/apptraining/nutrition', icon: <RestaurantIcon /> },
        { text: 'Perfil', path: '/apptraining/profile', icon: <PersonOutlineIcon /> },
        { text: 'Programas', path: '/apptraining/workout', icon: <FitnessCenterIcon /> },
        { text: 'Configuracion', path: '/apptraining/settings', icon: <SettingsIcon /> },
    ];

    const hndlLogout = () => {
        // Lógica para cerrar sesión
        navigate('/apptraining/login');
    };

    const hndlGymklan = () => {
        navigate('/');
    };
    
    // Puedes reemplazar esto con el estado real del usuario logueado
    const loggedInUser = "nombreusuario@gmail.com"; 

    return (
        <AppBar 
            position="sticky" 
            sx={{ 
                background: '#000', 
                bgcolor: '#000', 
                color: '#fff', 
                boxShadow: '0 4px 10px rgba(0, 183, 255, 0.7)' 
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <IconButton onClick={toggleDrawer(true)} sx={{ color: 'rgb(0, 204, 255)' }}>
                    <MenuIcon />
                </IconButton>

                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                    <img src={LogoReps} alt="AppTraining Logo" style={{ height: '80px',  }}/>
                </Box>
                
                {/* Ícono de usuario para móvil */}
                <IconButton onClick={() => navigate('/apptraining/profile')} sx={{ color: 'rgb(0, 204, 255)' }}>
                    <PersonOutlineIcon />
                </IconButton>
            </Toolbar>

            {/* Drawer */}
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)} PaperProps={{ sx: { background: '#111', color: '#fff' } }}>
                <Box sx={{ width: 360 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                <Box sx={{  px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #333' }}>
                <img src={LogoReps} alt="AppTraining Logo" style={{ height: '70px'}}/>
                {/* ➡️ Agrega el nuevo botón de cierre aquí */}
                <IconButton onClick={toggleDrawer(false)} sx={{ color: 'rgb(0, 204, 255)' }}>
                    <CloseIcon />
                </IconButton>
            </Box>
                    <List sx={{ mt: 2 }}>
                    {menuItems.map((item) => {
                            // Verificar si la ruta coincide con la ubicación actual
                            const isSelected = location.pathname.startsWith(item.path);
                            return (
                                <ListItem key={item.text} disablePadding>
                                    <ListItemButton
                                        onClick={() => navigate(item.path)}
                                        sx={{
                                            bgcolor: isSelected ? 'rgba(0, 179, 255, 0.2)' : 'transparent',
                                            '&:hover': {
                                                bgcolor: 'rgba(0, 179, 255, 0.1)'
                                            },
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: isSelected ? 'rgb(0, 179, 255)' : '#fff' }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.text} sx={{ color: isSelected ? 'rgb(0, 179, 255)' : '#fff' }}/>
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 35 }} >
                    <Button varaiant="contained" fullWidth sx={{ bgcolor: 'rgb(0, 179, 255)', color: '#fff' , '&:hover': { bgcolor: 'rgb(4, 159, 226)' },  fontWeight: 'bold', fontSize: '1rem', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 183, 255, 0.7)',  }} onClick={hndlGymklan}>
                    GYMKLAN
                </Button>
                </Box>
                
            </Drawer>
        </AppBar>
    );
}