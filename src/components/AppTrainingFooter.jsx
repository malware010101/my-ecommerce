import React from 'react';
import { Box, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material';
import LogoReps from '../assets/LogoReps.webp';

export default function AppTrainingFooter() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            component="footer"
            
            sx={{
                background: '#000',
                color: '#fff',
                py: { xs: 2, sm: 5 },
                boxShadow: '0 -4px 10px rgba(0, 183, 255, 0.7)',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: { xs: 1, sm: 1 },
            }}
        >
            <Box
                component="img"
                src={LogoReps}
                alt="Reps"
                sx={{ maxWidth: 90, opacity: 0.5 }}
            />
            <Typography variant="body2" sx={{ color: '#aaa', textAlign: 'center' }}>
                © {new Date().getFullYear()} Todos los derechos reservados.
            </Typography>
        </Box>
    );
}