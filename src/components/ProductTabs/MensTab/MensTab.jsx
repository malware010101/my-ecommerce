import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Slider from 'react-slick'; 
import ProductsCard from '../../Cards/ProductsCard'; 
import products from '../../../data/products'; 

const mensProducts = products.filter(
  (product) => product.category === 'MENS' 
);

export default function MensTab() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4, 
    slidesToScroll: 1,
    arrows: true, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ py: 7, px: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
    <Button variant="contained" sx= {{ backgroundColor: 'black', color: '#fff', ':hover': { bgcolor: 'red', color: '#f5f5f5' } }}  >Ver Mas</Button>
    </Box>

      {mensProducts.length > 0 ? ( 
        <Slider {...settings}>
          {mensProducts.map((product) => (
            <Box key={product.id} sx={{ py: 1,px: 5, bgcolor: '#000' }}> 
              <ProductsCard product={product} />
            </Box>
          ))}
        </Slider>
      ) : (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
          No hay productos disponibles para hombres en este momento.
        </Typography>
      )}
    </Box>
  );
}