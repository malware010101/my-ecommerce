import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material'; // Asegúrate de que Box e IconButton estén importados
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'; // Iconos para las flechas
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


// --- DATOS DE LOS BANNERS (USANDO PLACEHOLDERS) ---
// Cuando tengas tus imágenes reales, las importarás aquí así:
// import banner1 from '../../assets/banners/banner1.jpg';
// y luego usarás banner1 en lugar de la URL de placeholder en el array 'banners'.
const banners = [
  {
    image: '/Images/Banners/banner1.webp', // Banner 1: Rojo anaranjado con texto blanco
    url: '/ofertas-especiales', // Ruta a donde se dirigirá al hacer clic (ejemplo)
  },
  {
    image: '/Images/Banners/banner1.webp', // Banner 2: Azul claro con texto negro
    url: '/novedades', // Ruta a donde se dirigirá al hacer clic (ejemplo)
  },
  {
    image: '/Images/Banners/banner1.webp', // Banner 3: Verde con texto negro
    url: '/tienda', // Ruta a donde se dirigirá al hacer clic (ejemplo)
  },
  {
    image: '/Images/Banners/banner1.webp', // Banner 4: Violeta con texto blanco
    url: '/membresias', // Ruta a donde se dirigirá al hacer clic (ejemplo)
  },
  // Puedes añadir más banners aquí, ajustando el color y el texto para diferenciarlos
  // Ejemplo: { image: 'https://via.placeholder.com/1200x500/F0F8FF/000000?text=Banner+5', url: '/otro-destino' },
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0); // Estado para el índice del banner actual

  // useEffect para el cambio automático del banner cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length); // Avanza al siguiente banner, vuelve al inicio si llega al final
    }, 5000); // 5000 milisegundos = 5 segundos

    // Función de limpieza: Se ejecuta cuando el componente se desmonta o el efecto se re-ejecuta
    return () => clearInterval(interval); // Limpia el temporizador para evitar fugas de memoria
  }, [banners.length]); // Dependencia: el efecto se re-ejecuta si el número de banners cambia

  // Función para avanzar al siguiente banner
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  // Función para retroceder al banner anterior
  const handlePrev = () => {
    // La lógica (prevIndex - 1 + banners.length) % banners.length asegura que el índice no sea negativo
    // y que siempre vuelva al final si retrocede desde el primero.
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  // Obtiene el objeto del banner que se debe mostrar actualmente
  const currentBanner = banners[currentIndex];

  // Función para manejar el clic en el banner
  const handleClickBanner = () => {
    if (currentBanner.url) { // Solo si el banner tiene una URL definida
      window.location.href = currentBanner.url; // Redirige a la URL especificada
      // Si estás usando React Router Dom para navegación interna, usarías algo como:
      // import { useNavigate } from 'react-router-dom';
      // const navigate = useNavigate();
      // navigate(currentBanner.url);
    }
  };

  return (
    <Box
      sx={{
        boxShadow: '0 10px 20px rgba(77, 22, 0, 0.6)',
        border: '1px solid #000',
        position: 'relative', // Necesario para posicionar las flechas y la imagen de fondo
        width: '100%',
        height: '500px', // <--- Altura del componente del carrusel. Ajusta esto según necesites.
        overflow: 'hidden', // Oculta cualquier parte de la imagen que se desborde
        display: 'flex', // Usamos flex para centrar el contenido (en este caso, la imagen)
        alignItems: 'center', // Centra verticalmente
        justifyContent: 'center', // Centra horizontalmente
      }}
    >
      {/* Contenedor de la imagen del banner actual */}
      <Box
        onClick={handleClickBanner} // Hace que todo el Box sea clickeable
        sx={{
          width: '100%', // La imagen ocupará todo el ancho del contenedor
          height: '100%', // La imagen ocupará toda la altura del contenedor
          backgroundImage: `url(${currentBanner.image})`, // Carga la imagen de fondo del banner actual
          backgroundSize: 'contain', // Asegura que la imagen cubra todo el Box
          backgroundPosition: 'center', // Centra la imagen dentro del Box
          cursor: currentBanner.url ? 'pointer' : 'default', // Cambia el cursor si el banner es clickeable
          transition: 'background-image 0.5s ease-in-out', // Suave transición al cambiar de imagen
        }}
      />

      {/* Flecha de Navegación Izquierda (Anterior) */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute', // Posicionamiento absoluto dentro del Box padre
          left: 16, // A 16px del borde izquierdo
          top: '50%', // Centrado verticalmente
          transform: 'translateY(-50%)', // Ajuste para centrado perfecto
          bgcolor: 'rgba(0,0,0,0.5)', // Fondo semitransparente oscuro
          color: '#fff', // Color de la flecha
          '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }, // Color al pasar el mouse
          zIndex: 10, // Asegura que la flecha esté por encima del banner
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>

      {/* Flecha de Navegación Derecha (Siguiente) */}
      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute', // Posicionamiento absoluto dentro del Box padre
          right: 16, // A 16px del borde derecho
          top: '50%', // Centrado verticalmente
          transform: 'translateY(-50%)', // Ajuste para centrado perfecto
          bgcolor: 'rgba(0,0,0,0.5)', // Fondo semitransparente oscuro
          color: '#fff', // Color de la flecha
          '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }, // Color al pasar el mouse
          zIndex: 10, // Asegura que la flecha esté por encima del banner
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
}