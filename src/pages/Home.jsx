import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import ImageCarousel from '../components/ImageCarousel/ImageCarousel.jsx';
import ProductTabs from '../components/ProductTabs/ProductTabs.jsx';
import ProfileCard from '../components/ProfileCard.jsx';
import Footer from '../components/Footer.jsx';
import LightRays from '../components/LightRays/LightRays.jsx';
import FadeContent from '../components/Animations/FadeContent/FadeContent.jsx';

export default function Home() {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ImageCarousel />
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 2, color: 'text.primary',bgcolor: 'rgba(0,0,0,0.5)', }}>
        <ProductTabs/>
      </Box>
      

      {/* About Us  */}
      
      <Box
        sx={{
          position: 'relative', 
          display: 'flex',
          justifyContent: 'center',
          py: { xs: 3, md: 6 },
          width: '100%',
          overflow: 'hidden', 
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0, 
          }}
        >
          <LightRays
            raysOrigin="top-center"
            raysColor="#FF0000"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
          />
        </Box>
        
        <Grid
          container
          spacing={4}
          sx={{
            maxWidth: 'xl',
            mx: 'auto',
            alignItems: 'center',
            zIndex: 1, 
          }}
        >
          {/* Columna Izquierda: Texto */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                mt: { xs: 8, md: 8 },
                p: { xs: 3, md: 4, },
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                align="center"
                sx={{
                  fontWeight: 'bold',
                  fontFamily: 'tu-fuente-de-titulos, sans-serif',
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  color: 'text.primary',
                  mb: 3,
                }}
              >
                WE ARE GYMKLAN
              </Typography>

              <Typography
                variant="body1"
                paragraph
                sx={{
                  fontFamily: 'tu-fuente-de-cuerpo, sans-serif',
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.7,
                  color: 'text.secondary',
                  mb: 3,
                  mt: 8,
                  textAlign: 'center',
                }}
              >
                GYMKLAN no es solo una marca, es un estilo de vida.
                Nacimos en la calle, entre fierros, sudor y respeto. No venimos a encajar, venimos a imponer estilo mientras entrenas como bestia y nuestros suplementos te dan ese pum! de fuerza y estilo
              </Typography>

              <Typography
                variant="body1"
                paragraph
                sx={{
                  fontFamily: 'tu-fuente-de-cuerpo, sans-serif',
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.7,
                  color: 'text.secondary',
                  mb: 3,
                  textAlign: 'center',
                }}
              >
                Cada suplemento que creamos y cada prenda que diseñamos lleva el <strong>ADN</strong> de la calle.
                No vendemos moda: vendemos fuerza, garra, y presencia. Nuestra ropa no solo se usa… se impone.
                Nuestros suplelmentos no son para cualquiera: son para los que entrenan como gorilas.
                <strong>El gorila</strong> es nuestro emblema. Fuerte, imponente, dominante. No necesita hablar para hacerse respetar.
                Así somos. Así se siente GYMKLAN.
              </Typography>

              <Typography
                variant="body1"
                paragraph
                sx={{
                  fontFamily: 'tu-fuente-de-cuerpo, sans-serif',
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.7,
                  color: 'text.secondary',
                  mb: 4,
                  textAlign: 'center',
                }}
              >
                Asi que al momento que uses algun producto de nosotros, eres ya eres parte del klan. BIENVENIDO A <strong>GYMKLAN</strong>!.
              </Typography>

              <Button
                variant="contained"
                sx={{
                  bgcolor: 'red',
                  color: '#fff',
                  '&:hover': {
                    bgcolor: '#222',
                  },
                  px: 4,
                  py: 1.5,
                  fontSize: '0.9rem',
                }}
              >
                READ MORE
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      

      {/* Sección ATHLETES */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 2, color: 'text.primary', bgcolor: 'background.default', fontSize: '2rem', fontWeight: 'bold' }}>
        ATLETHES
      </Box>

      <Box
        sx={{
          boxShadow: '0 10px 20px rgba(77, 22, 0, 0.6)', 
          bgcolor: 'background.default',
        }}
      >
        <Grid container spacing={6} justifyContent="center" py={6}>
          <Grid item xs={12} sm={6} md={3}>
            <ProfileCard
              name="Bryant Gomez"
              title="Mens Physique Atlethe"
              handle="bryantg.fit"
              status="mexican"
              contactText="Ver"
              avatarUrl="/path/to/avatar.jpg"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => console.log('Contact clicked')}
            />
          </Grid>  
            <Grid item xs={12} sm={6} md={3}>
            <ProfileCard
              name="Avril Leza"
              title="Bikini Atlethe"
              handle="avril.leza"
              status="mexican"
              contactText="Ver"
              avatarUrl="/path/to/avatar.jpg"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => console.log('Contact clicked')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ProfileCard
              name="Proximo"
              title="Atlethe"
              handle="user.name"
              status="mexican"
              contactText="Ver"
              avatarUrl="/path/to/avatar.jpg"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => console.log('Contact clicked')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ProfileCard
              name="Proximo"
              title="Atlethe"
              handle="user.name"
              status="mexican"
              contactText="Ver"
              avatarUrl="/path/to/avatar.jpg"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => console.log('Contact clicked')}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}