import React, { useState } from 'react';
import {
    Box,
    Button,
    Tabs,
    Tab,
    Dialog, 
    DialogContent 
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

import DrawerEjercicios from './DrawerEjercicios';
import DrawerMetodos from './DrawerMetodos';
import ExerciseCard from '../ExerciseCard';
import MethodCard from '../MethodCard';
import api from '../../api';

export default function CrearEjercicio({ dias, onExercisesChange }) {
    const [drawerEjercicioOpen, setDrawerEjercicioOpen] = useState(false);
    const [drawerMetodoOpen, setDrawerMetodoOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(0);
    const [abrirVideo, setAbrirVideo] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');

    const dayLabels = dias.map(d => d.dia);

    const hndlOpenDrawerEjercicio = () => {
        setDrawerEjercicioOpen(true);
    };

    const hndlCloseDrawerEjercicio = () => {
        setDrawerEjercicioOpen(false);
    };

    const hndlEjercicioSelect = (exercise) => {
        const newExercise = {
            ...exercise,
            id: Date.now(), 
            type: 'exercise', 
        };
        const updatedDays = dias.map((day, index) =>
      index === selectedDay
        ? { ...day, items: [...day.items, newExercise] }
        : day
    );
        onExercisesChange(updatedDays);
        hndlCloseDrawerEjercicio();
    };

    const handleTabChange = (event, newValue) => {
        setSelectedDay(newValue);
    };

    
    const hndlDeleteItem = (itemId) => {
    const updatedDays = dias.map((day, index) =>
      index === selectedDay
        ? { ...day, items: day.items.filter(item => item.id !== itemId) }
        : day
    );

    onExercisesChange(updatedDays);
  };

    const hndlVerVideo = async (videoId) => {
  try {
      const res = await api.get(`/videos/${videoId}/stream`);
      setVideoUrl(res.data.embed_url);
      setAbrirVideo(true);
  } catch (err) {
      console.error('Error al obtener el video', err);
  }
};


const hndlCloseVideo = () => {
  setAbrirVideo(false);
  setVideoUrl('');
};

    
    const hndlOpenDrawerMetodo = () => {
        setDrawerMetodoOpen(true);
    };

    const hndlCloseDrawerMetodo = () => {
        setDrawerMetodoOpen(false);
    };

    const hndlMetodoSelect = (method) => {
        const newMethod = {
            ...method,
            id: Date.now(),
            type: 'method',
        };
        const updatedDays = dias.map((day, index) =>
      index === selectedDay
        ? { ...day, items: [...day.items, newMethod] }
        : day
    );
        onExercisesChange(updatedDays);
        hndlCloseDrawerMetodo();
    };


    return (
        <Box>
            <Tabs
                value={selectedDay}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    '.MuiTabs-indicator': {
                        backgroundColor: 'rgb(0, 204, 255)',
                    },
                    '.MuiTab-root': {
                        color: '#bbb', 
                    },
                    '.Mui-selected': {
                        color: 'rgb(0, 204, 255)', 
                        fontWeight: 'bold', 
                    }
                }}
            >
                {dayLabels.map((day, index) => (
                    <Tab key={index} label={day} />
                ))}
            </Tabs>
            <Box sx={{ display: 'flex', justifyContent: 'right', mt: 3 }}>
                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={hndlOpenDrawerMetodo}
                    sx={{  color: 'rgb(0, 204, 255)', fontWeight: 'bold', border: '1px solid rgb(0, 204, 255)', borderRadius: '15px', '&:hover': { bgcolor: 'rgb(0, 204, 255)', color: '#fff' } }}
                >
                    Agregar Metodo
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={hndlOpenDrawerEjercicio}
                    sx={{ ml:2,  color: 'rgb(0, 204, 255)', fontWeight: 'bold', border: '1px solid rgb(0, 204, 255)', borderRadius: '15px', '&:hover': { bgcolor: 'rgb(0, 204, 255)', color: '#fff' } }}
                >
                    Agregar Ejercicio
                </Button>
            </Box>
            
            <Box sx={{ mt: 3 }}>
  {dias[selectedDay]?.items.map(item => {
    if (item.type === 'method') {
      return (
        <MethodCard
          key={item.id}
          method={item}
          onDelete={() => hndlDeleteItem(item.id)}
          isDeletable
        />
      );
    }

    if (item.type === 'exercise') {
      return (
        <ExerciseCard
          key={item.id}
          exercise={item}
          onDelete={() => hndlDeleteItem(item.id)}
          onShowVideo={hndlVerVideo}
          isDeletable
        />
      );
    }
    return null;
  })}
</Box>
            
            <DrawerEjercicios
                open={drawerEjercicioOpen}
                onClose={hndlCloseDrawerEjercicio}
                onSelectExercise={hndlEjercicioSelect}
                onShowVideo={hndlVerVideo} 
            />

            <DrawerMetodos
                open={drawerMetodoOpen}
                onClose={hndlCloseDrawerMetodo}
                onSelectMethod={hndlMetodoSelect}
            />

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
                   <Box sx={{ 
                    position: 'relative', 
                    paddingTop: '56.25%',
                    aspectRatio: '9/16',
                    backgroundColor: '#000'
                    }}>
                       <iframe
                         key={videoUrl}
                         src={videoUrl}
                         loading="lazy"
                         allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                         muted
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
                </DialogContent>
            </Dialog>   
        </Box>
    );
}