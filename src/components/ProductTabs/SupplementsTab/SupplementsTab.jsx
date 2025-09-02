import { Box, Button, Grid, Typography } from '@mui/material';
import ProductsCard from '../../Cards/ProductsCard';
import React from 'react';
import products from '../../../data/products';
import Slider from 'react-slick'; 

const supplements = products.filter(
  (product) => product.category === 'SUPPLEMENTS'
);
export default function SupplementsTab() {

  // Configuración del Slider
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
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Box sx={{ py: 7, px: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
    <Button variant="contained" sx= {{ backgroundColor: 'black', color: '#fff', ':hover': { bgcolor: 'red', color: '#f5f5f5' } }}  >Ver Mas</Button>
    </Box>

    
    <Slider {...settings}>
      {supplements.map((product) => (
        
        <Box key={product.id} sx={{ py: 1,px: 5, bgcolor: 'rgba(0,0,0,0.5)', }}> 
          <ProductsCard product={product} />
        </Box>
      ))}
    </Slider>
  </Box>
  );
}