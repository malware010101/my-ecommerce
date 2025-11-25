import React from 'react';
import { Drawer, Box, Toolbar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import LogoReps from '../../assets/LogoReps.webp';

export default function AppSidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();

    const menuItems = [
        { text: 'Inicio', path: '/apptraining/home', icon: <HomeIcon /> },
        { text: 'Mi Entrenamiento', path: '/apptraining/entrenamiento', icon: <FitnessCenterIcon /> },
        { text: 'Nutricion', path: '/apptraining/nutrition', icon: <RestaurantIcon /> },
        { text: 'Perfil', path: '/apptraining/profile', icon: <PersonOutlineIcon /> },
        { text: 'Programas', path: '/apptraining/workout', icon: <FitnessCenterIcon /> },
        { text: 'Configuracion', path: '/apptraining/configuracion', icon: <SettingsIcon /> },
    ];

    const hndlLogout = () => {
       
        navigate('/apptraining/login');
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { 
                    width: 240, 
                    boxSizing: 'border-box',
                    background: '#000',
                    color: '#fff',
                    boxShadow: '4px 0 10px rgba(0, 183, 255, 0.7)',
                },
            }}
        >
            <Toolbar sx={{ justifyContent: 'center', py: 1 }}>
                <img
                    src={LogoReps}
                    alt="AppTraining Logo"
                    style={{ height: '80px' }}
                />
            </Toolbar>
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {menuItems.map((item) => {
                        const isSelected = location.pathname === item.path;
                        return (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton onClick={() => navigate(item.path)}>
                                    <ListItemIcon sx={{ color: isSelected ? 'rgb(0, 179, 255)' : '#fff' }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} sx={{ color: isSelected ? 'rgb(0, 179, 255)' : '#fff' }} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
                <Divider sx={{ my: 1, borderColor: '#333' }} />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={hndlLogout}>
                            <ListItemIcon sx={{ color: 'rgb(0, 179, 255)' }}>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Cerrar Sesión" sx={{ color: '#fff' }} />
                        </ListItemButton>
                    </ListItem>
                </List>

            </Box>
        </Drawer>
    );
}