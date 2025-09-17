import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Card, CardContent, IconButton } from '@mui/material';
import { Dialog, DialogContent } from '@mui/material';
import ExerciseCard from '../ExerciseCard';
import MethodCard from '../MethodCard';

export default function ProgramDetails({ programa }) {
  const [value, setValue] = React.useState(0);
  const [abrirVideo, setAbrirVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const hndlVerVideo = (url) => {
    setVideoUrl(url);
    setAbrirVideo(true);
};

const hndlCloseVideo = () => {
    setAbrirVideo(false);
    setVideoUrl('');
};

  return (
    <Box sx={{ p: 3, bgcolor: '#000', color: '#fff' }}>
      <Typography variant="h5" fontWeight="bold" color="rgb(0, 204, 255)" mb={2}>{programa.nombre}</Typography>
      <Typography variant="body1" color= '#ccc'>Objetivo: {programa.objetivo}</Typography>
      <Typography variant="body1" color= '#ccc'>Categoría: {programa.categoria}</Typography>
      <Typography variant="body1" color= '#ccc'>Nivel: {programa.nivel}</Typography>


      <Box sx={{ borderBottom: 1, borderColor: 'rgb(0, 204, 255)', mt: 3 }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          TabIndicatorProps={{
            style: {
              backgroundColor: 'rgb(0, 204, 255)' 
            }
          }}
          sx={{
            "& .MuiTab-root": {
              color: '#ccc', 
              "&.Mui-selected": {
                color: 'rgb(0, 204, 255)',
                fontWeight: 'bold', 
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: 'rgb(0, 204, 255)', 
              boxShadow: '0 4px 10px rgba(0, 204, 255, 0.7)', 
            }
          }}
        >
          {Object.keys(programa.dias).map((dia, index) => (
            <Tab label={dia} key={index} />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ mt: 3 }}>
          {programa.dias[Object.keys(programa.dias)[value]]?.map(item => {
              if (item.type === 'method') {
                  return (
                      <MethodCard key={item.id} method={item} />
                  );
              } else if (item.type === 'exercise') {
                  return (
                      <ExerciseCard key={item.id} exercise={item} onShowVideo={hndlVerVideo} isInteractive={true} />
                  );
              }
              return null;
          })}
        </Box>
        <Dialog
            open={abrirVideo}
            onClose={hndlCloseVideo} 
            maxWidth="xs"
            fullWidth
            sx={{
                '& .MuiDialog-paper': { bgcolor: '#000', borderRadius: '10px' }
            }}
        >
            <DialogContent>
                <video
                    src={videoUrl || null} 
                    controls
                    muted
                    autoPlay
                    loop
                    style={{ width: '100%', height: 'auto', borderRadius: '10px', display: 'block' }} 
                />
            </DialogContent>
        </Dialog>
      
    </Box>
     
  );
}