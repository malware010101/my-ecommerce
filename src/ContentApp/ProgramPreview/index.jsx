import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Card, CardContent, IconButton } from '@mui/material';
import {
    FitnessCenter as FitnessCenterIcon,
    AccessAlarms as AccessAlarmsIcon,
    Notes as NotesIcon,
    Visibility as VisibilityIcon
} from '@mui/icons-material';
import { Dialog, DialogContent } from '@mui/material';

const ExerciseCard = ({ exercise, onShowVideo }) => {
    return (
        <Card sx={{ bgcolor: '#000', mb: 2, p: 2, color: '#fff', border: '1px solid #000', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 183, 255, 0.7)'   }}>
            <CardContent sx={{ p: 1, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {exercise.nombre}
                    </Typography>
                    <Box>
                        <IconButton size="small" sx={{ color: 'rgb(0, 204, 255)' }} onClick={() => onShowVideo(exercise.videoUrl)}>
                            <VisibilityIcon/>
                        </IconButton>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <NotesIcon sx={{ color: 'rgb(0, 204, 255)', mr: 1, fontSize: '1.2rem' }} />
                    <Typography variant="body2" color="#fff" sx={{mb: 1}}>
                        {exercise.descripcion}
                    </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <FitnessCenterIcon sx={{ color: 'rgb(0, 204, 255)', mr: 1, fontSize: '1.2rem' }} />
                    <Typography variant="body2" color="rgb(0, 204, 255)" fontWeight='bold'>
                        Series:
                         <Typography component="span" sx={{ fontWeight: 'bold', ml:1 ,mr: 2, color: '#fff' }}>
                            {exercise.series}
                            </Typography>
                    </Typography>

                    <Typography variant="body2" color="rgb(0, 204, 255)" fontWeight='bold' sx={{ mr: 2 }}>
                        Reps: 
                        <Typography component="span" sx={{ fontWeight: 'bold',ml: 1, mr: 0, color:'#fff' }}>
                            {exercise.repeticiones}
                            </Typography>
                    </Typography>
                    <AccessAlarmsIcon sx={{ color: 'rgb(0, 204, 255)', mr: 1, fontSize: '1.2rem' }} />
                    <Typography variant="body2" color="rgb(0, 204, 255)" fontWeight='bold'>
                        Desc:
                         <Typography component="span" sx={{ fontWeight: 'bold', color: '#fff', ml: 1 }}>
                            {exercise.descanso} seg 
                            </Typography>
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

const MethodCard = ({ method }) => {
    return (
        <Card sx={{ bgcolor: 'rgba(0, 204, 255, 0.2)', mb: 2, p: 2, color: '#fff', border: '1px solid rgb(0, 204, 255)', borderRadius: '15px', position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 5, right: 5 }}>
            </Box>
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'rgb(0, 204, 255)' }}>
                    {method.nombre}
                </Typography>
                <Typography variant="body2" color="#bbb">
                    {method.descripcion}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default function ProgramPreview({ programa }) {
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
          // Cambia el color del indicador de la pestaña a tu azul
          TabIndicatorProps={{
            style: {
              backgroundColor: 'rgb(0, 204, 255)' 
            }
          }}
          // Cambia el color del texto de las pestañas
          sx={{
            "& .MuiTab-root": {
              color: '#ccc', // Color por defecto de las pestañas no seleccionadas
              "&.Mui-selected": {
                color: 'rgb(0, 204, 255)',
                fontWeight: 'bold', // Color del texto de la pestaña seleccionada
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: 'rgb(0, 204, 255)', 
              boxShadow: '0 4px 10px rgba(0, 204, 255, 0.7)', // Color del indicador (la línea de abajo)
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
                  return <MethodCard key={item.id} method={item} />;
              } else if (item.type === 'exercise') {
                  return <ExerciseCard key={item.id} exercise={item} onShowVideo={hndlVerVideo} />;
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