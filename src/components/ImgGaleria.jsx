import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
function ImgGaleriaMobile({ product, selectedVariant, setSelectedVariant }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedVariant]);

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => 
      (prevIndex + 1) % selectedVariant.images.length
    );
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) => 
      (prevIndex - 1 + selectedVariant.images.length) % selectedVariant.images.length
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Box sx={{
        position: 'relative',
        width: '100%',
        paddingTop: '100%',
        overflow: 'hidden',
        minHeight: '300px'
      }}>
        <img
          src={selectedVariant.images[selectedImageIndex].url}
          alt={selectedVariant.label}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />
        <Box sx={{
            position: 'absolute',
            top: '50%',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            transform: 'translateY(-50%)',
            p: 1
        }}>
            <IconButton onClick={handlePrevImage} sx={{ color: '#ec1818', bgcolor: 'rgba(0,0,0,0.4)' }}>
                <ArrowBackIosIcon />
            </IconButton>
            <IconButton onClick={handleNextImage} sx={{ color: '#ec1818', bgcolor: 'rgba(0,0,0,0.4)' }}>
                <ArrowForwardIosIcon />
            </IconButton>
        </Box>
      </Box>

      {/* Miniaturas de Variantes */}
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mt: 2, width: '100%' }}>
        {product.variants.map((variant, index) => (
          <Box
            key={index}
            sx={{
              border: `2px solid ${selectedVariant.label === variant.label ? '#ec1818' : 'transparent'}`,
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'border 0.3s',
              '&:hover': { borderColor: '#ccc' },
            }}
            onClick={() => setSelectedVariant(variant)}
          >
            <img
              src={variant.thumbnail}
              alt={variant.label}
              style={{ width: '80px', height: '80px', objectFit: 'cover' }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function ImgGaleriaDesktop({ product, selectedVariant, setSelectedVariant }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedVariant]);

  return (
    <Box 
      sx={{ 
        position: 'relative', 
        width: '100%', 
        paddingTop: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <img
        src={selectedVariant.images[selectedImageIndex].url}
        alt={selectedVariant.label}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain'
        }}
      />
      
      <Box sx={{
        position: 'absolute',
        top: 16,
        left: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        zIndex: 1,
        opacity: 0.8
      }}>
        {selectedVariant.images.map((image, index) => (
          <Box
            key={index}
            sx={{
              border: `2px solid ${selectedImageIndex === index ? '#ec1818' : 'transparent'}`,
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'border 0.3s',
              '&:hover': { borderColor: '#ccc' },
            }}
            onClick={() => setSelectedImageIndex(index)}
          >
            <img src={image.url} alt={image.alt} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
          </Box>
        ))}
      </Box>

      {/* Miniaturas de Variantes (Flotantes abajo) */}
      <Box sx={{ 
          position: 'absolute',
          bottom: 16,
          display: 'flex', 
          justifyContent: 'center', 
          flexWrap: 'wrap', 
          gap: 2, 
          zIndex: 1, 
          width: '100%',
          opacity: 0.8
      }}>
        {product.variants.map((variant, index) => (
          <Box
            key={index}
            sx={{
              border: `2px solid ${selectedVariant.label === variant.label ? '#ec1818' : 'transparent'}`,
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'border 0.3s',
              '&:hover': { borderColor: '#ccc' },
            }}
            onClick={() => setSelectedVariant(variant)}
          >
            <img
              src={variant.thumbnail}
              alt={variant.label}
              style={{ width: '80px', height: '80px', objectFit: 'cover' }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
export default function ImgGaleria({ product, selectedVariant, setSelectedVariant }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (!product.variants || product.variants.length === 0) {
    return (
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', maxWidth: '100%', objectFit: 'contain' }} />
      </Box>
    );
  }
  return isMobile ? (
    <ImgGaleriaMobile product={product} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} />
  ) : (
    <ImgGaleriaDesktop product={product} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} />
  );
}