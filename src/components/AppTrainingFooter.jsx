import React from 'react';
import { Box, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material';

export default function AppTrainingFooter() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            component="footer"
            sx={{
                // Fondo negro puro
                background: '#000',
                color: '#fff',
                py: { xs: 2, sm: 5 },
                // Sombra en la parte superior para el efecto de "corriente eléctrica"
                boxShadow: '0 -4px 10px rgba(0, 183, 255, 0.7)',
                // Estilos responsivos
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: { xs: 1, sm: 1 },
            }}
        >
            <Typography variant="body2" sx={{ color: 'rgb(0, 179, 255)', textAlign: 'center' }}>
                REPS BY GYMKLAN
            </Typography>
            <Typography variant="body2" sx={{ color: '#aaa', textAlign: 'center' }}>
                © {new Date().getFullYear()} Todos los derechos reservados.
            </Typography>
        </Box>
    );
}