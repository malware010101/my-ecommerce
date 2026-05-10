// src/components/AppTrainingNavBar/AppTrainingMobileNavbar.jsx

import React, { useState } from 'react';
import { AppBar, Toolbar, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Button, Divider } from '@mui/material';
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
import AssessmentIcon from '@mui/icons-material/Assessment';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

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
        { text: 'Perfil', path: '/apptraining/profile', icon: <AssessmentIcon /> },
        { text: 'Programas', path: '/apptraining/workout', icon: <FitnessCenterIcon /> },
        { text: 'Usuarios', path: '/apptraining/usuarios', icon: <GroupAddIcon /> },
    ];

    const hndlLogout = () => {
        navigate('/apptraining/login');
    };

    const hndlGymklan = () => {
        navigate('/');
    };
    
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
                
                {/* <IconButton onClick={() => navigate('/apptraining/profile')} sx={{ color: 'rgb(0, 204, 255)' }}>
                    <PersonOutlineIcon />
                </IconButton> */}
            </Toolbar>

            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)} PaperProps={{ sx: { background: '#111', color: '#fff' } }}>
                <Box sx={{ width: 360 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                <Box sx={{  px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #333' }}>
                <img src={LogoReps} alt="AppTraining Logo" style={{ height: '70px'}}/>
                <IconButton onClick={toggleDrawer(false)} sx={{ color: 'rgb(0, 204, 255)' }}>
                    <CloseIcon />
                </IconButton>
            </Box>
                    <List sx={{ mt: 2 }}>
                    {menuItems.map((item) => {
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
                
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 35 }} >
                    <Button varaiant="contained" fullWidth sx={{ bgcolor: 'rgb(0, 179, 255)', color: '#fff' , '&:hover': { bgcolor: 'rgb(4, 159, 226)' },  fontWeight: 'bold', fontSize: '1rem', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 183, 255, 0.7)',  }} onClick={hndlGymklan}>
                    GYMKLAN
                </Button>
                </Box>
                
            </Drawer>
        </AppBar>
    );
}