import React from 'react';
import { AppBar, Toolbar, Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import LogoReps from '../../assets/LogoReps.webp';

export default function SuscriptionNavbar() {
    const navigate = useNavigate();

    const hndlBackLogin = () => {
        navigate('/apptraining/login'); 
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
                    <IconButton onClick={hndlBackLogin} sx={{ color: '#fff' }}>
                        <ArrowBackIosNewIcon style ={{ color: 'rgb(0, 204, 255)' ,fontSize: '2rem', filter: 'drop-shadow(0 0 5px rgb(92, 214, 245))'  }}/>
                    </IconButton>
                </Box>
                
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                    <img
                        src={LogoReps}
                        alt="AppTraining Logo"
                        style={{ 
                            height: '120px', 
                        }}
                    />
                </Box>
                
                <Box sx={{ flexGrow: 1 }} />
            </Toolbar>
        </AppBar>
    );
}