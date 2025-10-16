import React from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes';
import LoginNavbar from './components/AppTrainingNavBar/LoginNavbar';
import SuscriptionNavbar from './components/AppTrainingNavBar/SuscriptionNavbar';
import { useLocation } from 'react-router-dom';
import AppTrainingFooter from './components/AppTrainingFooter';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#FF4500' },
    secondary: { main: '#000000' },
    background: { default: '#000000', paper: '#000000' },
    text: { primary: '#ffffff', secondary: 'rgba(255, 255, 255, 0.7)' },
  },
});

export default function App() {
  const location = useLocation();
  const currentPath = location.pathname;

  let activeNavbar;
  let activeFooter;
  let paddingTop = '100px';

  if (currentPath.startsWith('/apptraining/login')) {
    activeNavbar = <LoginNavbar />;
    activeFooter = <AppTrainingFooter />;
  } else if (currentPath.startsWith('/apptraining/suscription')) {
    activeNavbar = <SuscriptionNavbar />;
    activeFooter = <AppTrainingFooter />;
  } else if (currentPath.startsWith('/apptraining')) {
    activeNavbar = null; 
    activeFooter = <AppTrainingFooter />;
    paddingTop = '0px'; 
  } else {
    activeNavbar = <Navbar />;
    activeFooter = <Footer />;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {activeNavbar}
        <Box component="main" sx={{ flexGrow: 1, pt: paddingTop }}>
          <AppRoutes />
        </Box>
        {activeFooter}
      </Box>
    </ThemeProvider>
  );
}
