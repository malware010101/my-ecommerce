import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Card, CardContent, IconButton } from '@mui/material';
import { Dialog, DialogContent } from '@mui/material';
import ExerciseCard from '../ExerciseCard';
import MethodCard from '../MethodCard';
import api from '../../api';

export default function ProgramPreview({ programa }) {
  const [value, setValue] = React.useState(0);
  const [abrirVideo, setAbrirVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoError, setVideoError] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const hndlVerVideo = async (videoId) => {
  if (!videoId) {
    setVideoError('Este ejercicio no tiene video disponible');
    setAbrirVideo(true);
    return;
  }

  try {
    const res = await api.get(`/videos/${videoId}/stream`);

    if (!res.data?.embed_url) {
      setVideoError('Este ejercicio no tiene video disponible');
      setAbrirVideo(true);
      return;
    }

    setVideoError('');
    setVideoUrl(res.data.embed_url);
    setAbrirVideo(true);
  } catch (err) {
    console.error(err);
    setVideoError('Este ejercicio no tiene video disponible');
    setAbrirVideo(true);
  }
};

const hndlCloseVideo = () => {
    setAbrirVideo(false);
    setVideoUrl('');
    setVideoError('');
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
          {programa.dias?.map((dia, index) => (
            <Tab label={dia.dia} key={index} />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ mt: 3 }}>
          {programa.dias[value]?.items.map(item => {
              if (item.type === 'method') {
                  return (
                      <MethodCard
                       key={item.id}
                        method={item} />
                  );
              } else if (item.type === 'exercise') {
                  return (
                      <ExerciseCard 
                      key={item.id} 
                      exercise={item} 
                      onShowVideo={hndlVerVideo} />
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
            <DialogContent
              sx={{ p: 0 }}>
                {videoError ? (
                  <Typography
                  backgroundColor="#000"
        color="#bbb"
        textAlign="center"
        sx={{ 
          py: 4,
        borderColor: 'rgb(0, 204, 255)',
        borderStyle: 'solid',
        borderWidth: '0.5px',
        borderRadius: '15px' }}
      >
        {videoError}
      </Typography>
                ): (
              <Box sx={{ 
                 position: 'relative', 
                 paddingTop: '56.25%',
                 aspectRatio: '9/16',
                 backgroundColor: '#000'
                        }}>
            <iframe
                src={videoUrl}
                loading="lazy"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen
                  style={{
                      border: 0,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      }}
             />
                </Box>
              )}
            </DialogContent>
        </Dialog>   
      
    </Box>
     
  );
}