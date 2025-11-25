import { Typography, Divider, Button, Box, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';

export default function InfoProductos({ product }) {
  const [cantidad, setCantidad] = useState(1);

  const hndlCantidad = (type) => {
    if (type === 'add') {
      setCantidad(cantidad + 1);
    } else if (type === 'remove' && cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  if (!product) {
    return null;
  }

  return (
    <Box sx={{ p: 2, height: '100%', color: '#000', bgcolor:'#f5f5f5', borderRadius: '10px' }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
        {product.name}
      </Typography>

      <Divider sx={{ my: 2, bgcolor: '#000' }} />

      <Typography variant="body1" sx={{ mt: 4 }}>
        {product.details}
      </Typography>

      {product.benefits && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Beneficios Clave:</Typography>
          <ul>
            {product.benefits.map((benefit, index) => (
              <li key={index}>
                <Typography variant="body2">{benefit}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}

      <Divider sx={{ my: 4, bgcolor: '#000' }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 2 }}>
        <Typography variant="h4" component="p" sx={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#ec1818' }}>
            ${product.price}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ mr: 1 }}>Cantidad:</Typography>
            <IconButton size="small" sx={{ color: '#ec1818' }}
             onClick={() => hndlCantidad('remove')}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="body1" sx={{ mx: 2 }}>{cantidad}</Typography>
            <IconButton size="small" sx={{ color: '#ec1818' }}
             onClick={() => hndlCantidad('add')}>
              <AddIcon />
            </IconButton>
        </Box>
      </Box>

      <Button
        variant="contained"
        fullWidth
        startIcon={<AddShoppingCartIcon />}
        sx={{
          mt: 2,
          bgcolor: '#ec1818',
          color: '#fff',
          '&:hover': {
            bgcolor: '#d30000',
          },
          borderRadius: 3,
        }}
        onClick={() => {
          console.log(`Se agregaron ${cantidad} unidades de ${product.name} al carrito`);
        }}
      >
        Agregar al Carrito
      </Button>
    </Box>
  );
}