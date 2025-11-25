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

export default function ProductsCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme(); 
  console.log('Product in ProductsCard:', product);
  console.log('Image URL in ProductsCard:', product.image);
  return (
    <Card
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
          boxShadow: 6, 
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
        <Button
          sx={{
            minWidth: 0,
            padding: '4px',
            color: isHovered ? 'red' : 'rgba(0, 0, 0, 0.54)', 
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          {isHovered ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </Button>
      </Box>

      <CardMedia
        component="img"
        height="350" 
        image={product.image} 
        alt={product.name}
        sx={{ objectFit: 'cover', padding: 0 }} 
      />

      <CardContent
       sx={{ flexGrow: 1,
        bgcolor: '#000',
         color: 'white', 
         borderRadius: '0 0 5px 5px'}}> 
        <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'Alumni Sans SC, sans-serif' }}>
          {product.type} 
        </Typography>
        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold', fontFamily: 'Alumni Sans SC, sans-serif' }} >
          {product.name}
        </Typography>
        <Rating name="read-only" value={4} readOnly size="small" sx={{
          color: 'red', 
        }} /> 
        <Typography variant="body2" color="gray">
          {product.reviews}
        </Typography>
        <Typography variant="h5" color="white" sx={{ mt: 1, fontWeight: 'bold' }}>
          {product.price}
        </Typography>
      </CardContent>
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