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

const CustomTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none', 
  minWidth: 200, 
  padding: '10px 20px', 
  fontSize: '17px', 
  color: 'grey', 
  backgroundColor: 'black', 
  border: '1px solid #000', 
  borderRadius: '5px',
  margin: '0 20px', 
  opacity: 1, 
  ': hover': {
    color: 'white', 
    backgroundColor: 'red', 
    borderColor: 'black', 
  },
  '&.Mui-selected': { 
    color: 'white', 
    backgroundColor: 'red', 
    borderColor: 'black', 
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)', 
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#000', 
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
          mb: 3, 
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