// src/components/Cards/ProductCard.jsx
import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Rating,
  useTheme, 
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite'; 

// Este es el componente ProductCard que recibe la prop 'product'
export default function ProductsCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme(); // Hook para acceder al tema
  console.log('Product in ProductsCard:', product);
  console.log('Image URL in ProductsCard:', product.image);
  return (
    <Card
      sx={{
        backgroundColor: '#f5f5f5', // Color de fondo gris claro
        maxWidth: 250, // Ancho máximo de la tarjeta
        minWidth: 200, // Ancho mínimo para que no se haga muy pequeña
        margin: 1, // Espacio entre tarjetas
        border: '1px solid rgb(31, 31, 31)', // Borde gris
        borderRadius: 2, // Bordes más suaves
        boxShadow: 3, // Sombra ligera
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)', // Efecto de levantar al pasar el ratón
          boxShadow: 6, // Sombra más pronunciada al pasar el ratón
        },
        position: 'relative', // Necesario para posicionar elementos dentro
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Botón de "Me gusta" o "Favorito" */}
      <Box
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 1, // Asegura que esté por encima de la imagen
        }}
      >
        <Button
          sx={{
            minWidth: 0,
            padding: '4px',
            color: isHovered ? 'red' : 'rgba(0, 0, 0, 0.54)', // Cambia de color al hacer hover
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          {/* Puedes cambiar el icono si el producto ya está en favoritos */}
          {isHovered ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </Button>
      </Box>

      {/* Imagen del producto */}
      <CardMedia
        component="img"
        height="350" // Altura fija para las imágenes
        image={product.image} // La ruta de la imagen viene de la prop 'product'
        alt={product.name}
        sx={{ objectFit: 'cover', padding: 0 }} // Ajusta la imagen dentro del espacio, con padding
      />

      {/* Contenido de la tarjeta */}
      <CardContent
       sx={{ flexGrow: 1,
        bgcolor: '#000',
         color: 'white', 
         borderRadius: '0 0 5px 5px'}}> {/* flexGrow para que el contenido ocupe el espacio restante */}
        <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'Alumni Sans SC, sans-serif' }}>
          {product.type} {/* Por ejemplo: "Muscle build" */}
        </Typography>
        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold', fontFamily: 'Alumni Sans SC, sans-serif' }} >
          {product.name}
        </Typography>
        <Rating name="read-only" value={4} readOnly size="small" sx={{
          color: 'red', // Otro color
        }} /> {/* Ejemplo de rating fijo */}
        <Typography variant="body2" color="gray">
          {product.reviews}
        </Typography>
        <Typography variant="h5" color="white" sx={{ mt: 1, fontWeight: 'bold' }}>
          {product.price}
        </Typography>
      </CardContent>

      {/* Botón de "Quick View" al hacer hover */}
      {isHovered && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'bgcolor: rgba(66, 66, 66, 0.5)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            paddingY: 1,
            animation: 'fadeInUp 0.3s ease-in-out',
            '@keyframes fadeInUp': {
              '0%': { transform: 'translateY(100%)', opacity: 0 },
              '100%': { transform: 'translateY(0)', opacity: 1 },
            },
          }}
        >
          <Button variant="text" sx={{ color: 'white' }}>
            QUICK VIEW
          </Button>
        </Box>
      )}
    </Card>
  );
}