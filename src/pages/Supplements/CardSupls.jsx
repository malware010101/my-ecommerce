import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Divider
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';

export default function CardSupls({ product, onAddToCart, basePath }) {
    const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  const hndlVerDetalles = (productId) => {
    // Construye la URL con el prefijo 'product'
    navigate(`/${basePath}/product/${productId}`);
  };


  return (
    <Card
      onClick={(e) => hndlVerDetalles(product.id)}
      sx={{
        backgroundColor: '#f5f5f5', 
        maxWidth: 250,
        minWidth: 200,
        margin: 1,
        border: '1px solid rgb(31, 31, 31)',
        borderRadius: 2,
        boxShadow: 3,
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0px 10px 20px rgba(146, 144, 144, 0.6)',
        },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <Box
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 1,
        }}
      >
        <IconButton
          sx={{
            color: isFavorite ? 'red' : 'rgba(0, 0, 0, 0.54)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>

      {/* Imagen del producto */}
      <CardMedia
        component="img"
        height="350"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      
      
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: '#000',
          color: 'white',
          borderRadius: '0 0 5px 5px',
          p: 2, 
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontWeight: 'bold', fontFamily: 'Alumni Sans SC, sans-serif' }}
        >
          {product.name}
        </Typography>
        <Divider sx={{ bgcolor: '#ccc', opacity: 0.3 }} />
        <Typography
          variant="body2"
          sx={{ color: '#ccc', mt: 2 }}
        >
          {product.description}
        </Typography>
        <Typography
          variant="h5"
          color='white'
          sx={{ mt: 3, mb: 2, fontWeight: 'bold' }} // Agrega margin bottom
        >
          ${product.price}
        </Typography>

        <Box sx={{ flexDirection: 'column', mt: 2 }}>
          <Button
            size="small"
            variant="contained"
            fullWidth
            startIcon={<VisibilityIcon />}
            sx={{ color: '#000', bgcolor: '#fff', mb: 2, borderRadius: 2, '&:hover': { bgcolor: '#ec1818', color: '#fff' } }}
            onClick={(e) => {
              e.stopPropagation();
              hndlVerDetalles(product.id);
            }}
          >
            Detalles
          </Button>
          <Button
            size="small"
            variant="contained"
            fullWidth
            startIcon={<AddShoppingCartIcon />}
            sx={{ color: '#000', bgcolor: '#fff', borderRadius: 2, '&:hover': { bgcolor: '#ec1818', color: '#fff' } }}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            Agregar
          </Button>
        </Box>
      </Box>
    </Card>
  );
}