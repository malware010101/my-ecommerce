// Footer.jsx
import React from 'react';
import { Box, Container, Typography, Link, IconButton, Grid } from '@mui/material';
import { AiOutlineTikTok } from 'react-icons/ai';
import { RiFacebookFill } from 'react-icons/ri';
import { FaInstagram } from 'react-icons/fa'; 
import LogoReps from '../assets/LogoReps.webp';
import { Socials } from '../Config/socials';


export default function Footer() { 

  const Year = new Date().getFullYear();

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
        <Grid container spacing={4} justifyContent="space-around"  sx={{ py: 1 }}>
          <Grid item xs={12} sm={12} md={12} sx={{ textAlign: { xs: 'center'} }}>
            <Box 
            component="img" 
            src={LogoReps} 
            alt="Reps"
             sx={{ maxWidth: 120, opacity: 0.5 }} />
          </Grid>
          
           <Grid item xs={12} sm={12} md={12} sx={{ textAlign: { xs: 'center', md: 'center' } }}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'center' } }}>
              <IconButton
                componeny='a'
                href={Socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: '#4B96FF',
              '&:hover': {
                color: '#76B3FF',
              }, }}
              >
                <AiOutlineTikTok fontSize="large" />
              </IconButton>
              <IconButton
                componeny='a'
                href={Socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: '#4B96FF',
              '&:hover': {
                color: '#76B3FF',
              }, }}
              >
                <RiFacebookFill fontSize="large" />
              </IconButton>
              <IconButton
                componeny='a'
                href={Socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: '#4B96FF',
              '&:hover': {
                color: '#76B3FF',
              },}}
              >
                <FaInstagram fontSize="large" />
              </IconButton>
            </Box>
          </Grid> 
        </Grid>

        
        <Box sx={{ mt: 5, borderTop: '1px solid rgba(255,255,255, 0.1)', pt: 3, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255, 0.7)' }}>
            &copy; {Year} REPS. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}