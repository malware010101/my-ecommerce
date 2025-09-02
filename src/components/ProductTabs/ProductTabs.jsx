// src/components/ProductTabs/ProductTabs.jsx
import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';



import SupplementsTab from './SupplementsTab/SupplementsTab.jsx';
import MensTab from './MensTab/MensTab.jsx';
import WomansTab from './WomansTab/WomansTab.jsx';
import AccessoriesTab from './AccessoriesTab/AccessoriesTab.jsx';
import { styled } from '@mui/material/styles'; 

// --- Componente Tab personalizado para el estilo deseado ---
// Usaremos `styled` para aplicar estilos condicionales y base a los Tabs
const CustomTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none', // Quita la transformación a mayúsculas por defecto
  minWidth: 200, // Ancho mínimo para cada tab
  padding: '10px 20px', // Relleno interno
  fontSize: '17px', // Texto en negrita
  color: 'grey', // Color del texto por defecto
  backgroundColor: 'black', // Fondo blanco por defecto
  border: '1px solid #000', // Borde gris claro
  borderRadius: '5px', // Bordes ligeramente redondeados
  margin: '0 20px', // Margen entre los tabs
  opacity: 1, // Asegura que no haya opacidad adicional
  ': hover': {
    color: 'white', // Texto negro al pasar el mouse
    backgroundColor: 'red', // Fondo blanco al pasar el mouse
    borderColor: 'black', // Borde negro al pasar el mouse
  },
  '&.Mui-selected': { // Estilos para el Tab cuando está seleccionado
    color: 'white', // Texto blanco cuando está seleccionado
    backgroundColor: 'red', // Fondo negro cuando está seleccionado
    borderColor: 'black', // Borde negro cuando está seleccionado
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)', // Sombra sutil para el tab activo
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#000', // Color al enfocar (accesibilidad)
  },
}));


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ProductTabs() {
  const [selectedTab, setSelectedTab] = useState(0); 

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ py: 10, width: '100%', px: 4 , bgcolor: '#000'}}> {/* Contenedor principal de los Tabs */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 3, // Margen inferior para separar los tabs del contenido
          color: '#000',
          
          bgcolor: 'rgba(0,0,0,0.5)',
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="Product categories tabs"
          variant="scrollable"
          scrollButtons="auto"
        
          sx={{
            bgcolor: 'rgba(0,0,0,0.5)',
            
            '& .MuiTabs-indicator': {
              display: 'none', 
              
            },
          }}
        >
        
         
          <CustomTab label="SUPPLEMENTS" {...a11yProps(0)}  />
          <CustomTab label="MENS" {...a11yProps(1)} />
          <CustomTab label="WOMANS" {...a11yProps(2)} />
          <CustomTab label="ACCESSORIES" {...a11yProps(3)} />
        </Tabs>
      </Box>

     
      <Box sx={{ color: 'black'  }}>
        {selectedTab === 0 && <SupplementsTab />}
        {selectedTab === 1 && <MensTab />}
        {selectedTab === 2 && <WomansTab />}
        {selectedTab === 3 && <AccessoriesTab />}
      </Box>
    </Box>
  );
}