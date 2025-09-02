// src/components/AppTrainingNavBar/LoginNavbar.jsx

import React from 'react';
import { AppBar, Toolbar, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoReps from '../../assets/LogoReps.webp';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function LoginNavbar() {
    const navigate = useNavigate();

    const hndlBackStore = () => {
        navigate('/'); 
    };

    return (
        <AppBar 
            position="sticky" 
            sx={{ 
                background: '#000', 
                bgcolor: '#000', 
                color: '#fff',
                boxShadow: '0 4px 10px rgba(0, 183, 255, 0.7)',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start' }}>
                    <IconButton onClick={hndlBackStore} sx={{ color: '#fff' }}>
                        <ArrowBackIosNewIcon style ={{ color: 'rgb(0, 204, 255)' ,fontSize: '2rem', filter: 'drop-shadow(0 0 5px rgb(92, 214, 245))'  }}/>
                    </IconButton>
                </Box>
                
                {/* ➡️ Contenedor para el logo centrado */}
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                    <img
                        src={LogoReps}
                        alt="AppTraining Logo"
                        style={{ 
                            height: '120px', 
                        }}
                    />
                </Box>
                
                {/* Un Box vacío para empujar el logo al centro */}
                <Box sx={{ flexGrow: 1 }} />
            </Toolbar>
        </AppBar>
    );
}