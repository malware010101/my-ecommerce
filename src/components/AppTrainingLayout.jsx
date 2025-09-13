import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import MovilNavBar from './AppTrainingNavBar/MovilNavBar';
import AppSidebar from './AppTrainingNavBar/AppSidebar';
import AppTrainingFooter from './AppTrainingFooter';

const drawerWidth = 240; 

export default function AppTrainingLayout() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

            {/* Navbar para movil o Sidebar para escritorio */}
            {isMobile ? <MovilNavBar /> : <AppSidebar />}

            <Box 
                component="main" 
                sx={{ 
                    flexGrow: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    ml: isMobile ? 0 : `${drawerWidth}px`, 
                    pt: isMobile ? '64px' : 0
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}