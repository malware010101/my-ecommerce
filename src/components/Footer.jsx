// Footer.jsx
import React from 'react';
import { Box, Container, Typography, Link, IconButton, Grid } from '@mui/material';
import { AiOutlineTikTok } from 'react-icons/ai';
import { RiFacebookFill } from 'react-icons/ri';
import { FaInstagram } from 'react-icons/fa'; 
import LogoGymKlanC from '../assets/logogymklanc.png';


export default function Footer() { 

  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#000000', 
        color: '#ffffff', 
        mt: 'auto', 
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-around"  sx={{ py: 4 }}>
          <Grid item xs={12} sm={6} md={3} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Box 
            component="img" 
            src={LogoGymKlanC} 
            alt="GymKlan"
             sx={{ maxWidth: 120, mb: 2 }} />

            <Typography variant="body2" color="text.secondary" sx={{ color: 'rgba(255,255,255, 0.8)' }}>
              Una breve descripción de tu sitio o empresa.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ color: 'rgba(255,255,255, 0.8)' }}>
                <Link href="mailto:www.gymclan.com" color="inherit" sx={{ '&:hover': { color: '#FF4500' } }}>
                  <span style={{ marginRight: '8px' }}>&#9993;</span> gymclan@gmail.com
                  {/* O usar un icono si lo importas: <EmailIcon sx={{ verticalAlign: 'middle', mr: 0.5 }} /> */}
                </Link>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ color: 'rgba(255,255,255, 0.8)' }}>
                <Link 
                href="tel:+528445064464" 
                color="inherit"
                 sx={{ '&:hover': { color: '#FF4500' } }}>
                  <span 
                  style={{ marginRight: '8px' }}>&#9742;</span> +52 (844) 506 4464
                  {/* O usar un icono si lo importas: <PhoneIcon sx={{ verticalAlign: 'middle', mr: 0.5 }} /> */}
                </Link>
              </Typography>
            </Box>
          </Grid>

          {/* Sección Enlaces Rápidos */}
          <Grid item xs={12} sm={6} md={2} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#FF4500' }}>
              Enlaces 
            </Typography>
            <Box>
              <Link href="/about" color="inherit" display="block" sx={{ mb: 1, '&:hover': { color: '#FF4500' } }}>
                We are
              </Link>
              <Link href="/services" color="inherit" display="block" sx={{ mb: 1, '&:hover': { color: '#FF4500' } }}>
                Supplements
              </Link>
              <Link href="/portfolio" color="inherit" display="block" sx={{ mb: 1, '&:hover': { color: '#FF4500' } }}>
                Clothes
              </Link>
              <Link href="/blog" color="inherit" display="block" sx={{ mb: 1, '&:hover': { color: '#FF4500' } }}>
                App Training
              </Link>
              <Link href="/contact" color="inherit" display="block" sx={{ mb: 1, '&:hover': { color: '#FF4500' } }}>
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Sección Legal */}
          <Grid item xs={12} sm={6} md={2} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#FF4500' }}>
              Legal
            </Typography>
            <Box>
              <Link href="/privacy-policy" color="inherit" display="block" sx={{ mb: 1, '&:hover': { color: '#FF4500' } }}>
                Política de Privacidad
              </Link>
              <Link href="/terms-of-service" color="inherit" display="block" sx={{ mb: 1, '&:hover': { color: '#FF4500' } }}>
                Términos de Servicio
              </Link>
              <Link href="/cookie-policy" color="inherit" display="block" sx={{ mb: 1, '&:hover': { color: '#FF4500' } }}>
                Política de Cookies
              </Link>
            </Box>
          </Grid>

          {/* Sección Redes Sociales */}
          <Grid item xs={12} sm={6} md={2} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#FF4500' }}>
              Síguenos
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <IconButton
                aria-label="LinkedIn"
                href="https://linkedin.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: '#ffffff', '&:hover': { color: '#FF4500' } }}
              >
                <AiOutlineTikTok fontSize="large" />
              </IconButton>
              <IconButton
                aria-label="GitHub"
                href="https://github.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: '#ffffff', '&:hover': { color: '#FF4500' } }}
              >
                <RiFacebookFill fontSize="large" />
              </IconButton>
              <IconButton
                aria-label="X (Twitter)"
                href="https://x.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: '#ffffff', '&:hover': { color: '#FF4500' } }}
              >
                <FaInstagram fontSize="large" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        
        <Box sx={{ mt: 5, borderTop: '1px solid rgba(255,255,255, 0.1)', pt: 3, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255, 0.7)' }}>
            &copy; {currentYear} Gymklan. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}