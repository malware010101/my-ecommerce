import React, { useState } from 'react';
import { Box, Drawer, Fab, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import MovilNavBar from './AppTrainingNavBar/MovilNavBar';
import AppSidebar from './AppTrainingNavBar/AppSidebar';
import AppTrainingFooter from './AppTrainingFooter';
import Chat from '../ContentApp/Chat';
import ChatIcon from '@mui/icons-material/Chat';

const drawerWidth = 240; 

export default function AppTrainingLayout() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [chatOpen, setChatOpen] = useState(false);

    const hndlToggleChat = () => {
        setChatOpen(!chatOpen);
    };


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
            <Fab
                
                aria-label="chat"
                onClick={hndlToggleChat}
                sx={{
                    bgcolor: ' rgb(0, 204, 255)',
                    position: 'fixed',
                    opacity: 0.7,
                    bottom: 50,
                    right: 26,

                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    '&:hover': { bgcolor: 'rgb(0, 204, 255)' },
                }}
            >
                <ChatIcon />
            </Fab>

            <Drawer
              anchor="right"
              open={chatOpen}
              onClose={hndlToggleChat}
              hideBackdrop={true} 
              PaperProps={{
                  sx: { 
                       width: isMobile ? '100%' : 400, 
                       bgcolor: '#000',
                       boxShadow: '-4px 0 10px rgba(0, 183, 255, 0.7)' 
        }
    }}
>
                <Chat onClose={hndlToggleChat} />
            </Drawer>
        </Box>
    );
}