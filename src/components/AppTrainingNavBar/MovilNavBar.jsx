// src/components/AppTrainingNavBar/AppTrainingMobileNavbar.jsx

import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AssessmentIcon from '@mui/icons-material/Assessment';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../ContentApp/AuthContext';

import LogoReps from '../../assets/LogoReps.webp';

export default function MovilNavBar() {

    const [drawerOpen, setDrawerOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const { obtenerUsuarioActual } = useAuth();

    const user = obtenerUsuarioActual();
    const rol = user?.rol?.toLowerCase();

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const menuItems = [
        {
            text: 'Inicio',
            path: '/apptraining/home',
            icon: <HomeIcon />
        },
        {
            text: 'Mi Entrenamiento',
            path: '/apptraining/entrenamiento',
            icon: <FitnessCenterIcon />
        },
        {
            text: 'Mi Nutrición',
            path: '/apptraining/nutrition',
            icon: <RestaurantIcon />
        },
        {
            text: 'Perfil',
            path: '/apptraining/profile',
            icon: <AssessmentIcon />
        },

        ...(rol === 'admin' || rol === 'coach'
            ? [
                  {
                      text: 'Programas',
                      path: '/apptraining/workout',
                      icon: <FitnessCenterIcon />,
                  },
                  {
                      text: 'Usuarios',
                      path: '/apptraining/usuarios',
                      icon: <GroupAddIcon />,
                  },
              ]
            : []),
    ];

    const hndlLogout = () => {
        navigate('/apptraining/login');
    };

    return (
        <AppBar
            position="sticky"
            sx={{
                background: '#000',
                color: '#fff',
                boxShadow: '0 4px 10px rgba(0,183,255,.45)',
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <IconButton
                    onClick={toggleDrawer(true)}
                    sx={{ color: '#4EA8FF' }}
                >
                    <MenuIcon />
                </IconButton>

                <Box
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <img
                        src={LogoReps}
                        alt="Logo"
                        style={{
                            height: 80,
                        }}
                    />
                </Box>
            </Toolbar>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: {
                        width: 360,

                        overflow: 'hidden',

                        color: '#fff',

                        background: 'rgba(8,8,8,.72)',

                        backdropFilter: 'blur(28px)',
                        WebkitBackdropFilter: 'blur(28px)',

                        borderRight:
                            '1px solid rgba(255,255,255,.05)',

                        boxShadow:
                            '0 30px 70px rgba(0,0,0,.65)',

                        position: 'relative',

                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            inset: 0,

                            background:
                                'linear-gradient(to bottom, rgba(255,255,255,.03), transparent)',

                            pointerEvents: 'none',
                        },
                    },
                }}
            >
                <Box
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                    sx={{
                        position: 'relative',
                        zIndex: 2,
                        height: '100%',
                    }}
                >
                    {/* Header */}

                    <Box
                        sx={{
                            px: 2.5,
                            py: 1,

                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',

                            borderBottom:
                                '1px solid rgba(255,255,255,.06)',

                            background:
                                'linear-gradient(180deg, rgba(255,255,255,.02), transparent)',
                        }}
                    >
                        <img
                            src={LogoReps}
                            alt="Logo"
                            style={{
                                height: 70,
                            }}
                        />

                        <IconButton
                            onClick={toggleDrawer(false)}
                            sx={{
                                color: '#5EA6FF',
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Menu */}

                    <List sx={{ mt: 2 }}>
                        {menuItems.map((item) => {

                            const isSelected =
                                location.pathname.startsWith(item.path);

                            return (
                                <ListItem
                                    key={item.text}
                                    disablePadding
                                >
                                    <ListItemButton
                                        onClick={() =>
                                            navigate(item.path)
                                        }
                                        sx={{
                                            mx: 1.3,
                                            mb: .8,

                                            borderRadius: 3,

                                            transition: '.25s',

                                            bgcolor: isSelected
                                                ? 'rgba(65,145,255,.15)'
                                                : 'transparent',

                                            border: isSelected
                                                ? '1px solid rgba(94,166,255,.18)'
                                                : '1px solid transparent',

                                            '&:hover': {
                                                bgcolor:
                                                    'rgba(65,145,255,.08)',

                                                transform:
                                                    'translateX(5px)',

                                                borderColor:
                                                    'rgba(94,166,255,.15)',
                                            },
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 42,

                                                color: isSelected
                                                    ? '#5EA6FF'
                                                    : 'rgba(255,255,255,.82)',
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>

                                        <ListItemText
                                            primary={item.text}
                                            primaryTypographyProps={{
                                                fontWeight: isSelected
                                                    ? 700
                                                    : 500,
                                            }}
                                            sx={{
                                                color: isSelected
                                                    ? '#5EA6FF'
                                                    : 'rgba(255,255,255,.82)',
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>

                    <Divider
                        sx={{
                            my: 2,
                            mx: 2,
                            borderColor:
                                'rgba(255,255,255,.06)',
                        }}
                    />

                    {/* Logout */}

                    <List>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={hndlLogout}
                                sx={{
                                    mx: 1.3,
                                    borderRadius: 3,

                                    '&:hover': {
                                        bgcolor:
                                            'rgba(255,255,255,.04)',
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: '#5EA6FF',
                                    }}
                                >
                                    <LogoutIcon />
                                </ListItemIcon>

                                <ListItemText
                                    primary="Cerrar Sesión"
                                    sx={{
                                        color: '#fff',
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    </List>

                </Box>
            </Drawer>

        </AppBar>
    );
}