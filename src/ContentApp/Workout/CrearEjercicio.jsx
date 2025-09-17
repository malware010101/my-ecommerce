import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    Tabs,
    Tab,
    IconButton,
    Dialog, 
    DialogContent 
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import DrawerEjercicios from './DrawerEjercicios';
import DrawerMetodos from './DrawerMetodos';
import ExerciseCard from '../ExerciseCard';
import MethodCard from '../MethodCard';

export default function CrearEjercicio({ dias, onExercisesChange }) {
    const [drawerEjercicioOpen, setDrawerEjercicioOpen] = useState(false);
    const [drawerMetodoOpen, setDrawerMetodoOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(0);
    const [abrirVideo, setAbrirVideo] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const dayLabels = Object.keys(dias);

    const hndlOpenDrawerEjercicio = () => {
        setDrawerEjercicioOpen(true);
    };

    const hndlCloseDrawerEjercicio = () => {
        setDrawerEjercicioOpen(false);
    };

    const hndlEjercicioSelect = (exercise) => {
        const currentDayLabel = dayLabels[selectedDay];
        const newExercise = {
            ...exercise,
            id: Date.now(), 
            type: 'exercise', 
        };
        const updatedDays = {
            ...dias,
            [currentDayLabel]: [...dias[currentDayLabel], newExercise],
        };
        onExercisesChange(updatedDays);
        hndlCloseDrawerEjercicio();
    };

    const handleTabChange = (event, newValue) => {
        setSelectedDay(newValue);
    };

    
    const hndlDeleteItem = (itemId) => {
        const currentDayLabel = dayLabels[selectedDay];
        const updatedItems = dias[currentDayLabel].filter(item => item.id !== itemId);
        const updatedDays = { ...dias, [currentDayLabel]: updatedItems };
        onExercisesChange(updatedDays);
    };

    const hndlVerVideo = (url) => {
        setVideoUrl(url);
        setAbrirVideo(true);
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
        const currentDayLabel = dayLabels[selectedDay];
        const newMethod = {
            ...method,
            id: Date.now(),
            type: 'method',
        };
        const updatedDays = {
            ...dias,
            [currentDayLabel]: [...dias[currentDayLabel], newMethod],
        };
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
                {dias[dayLabels[selectedDay]]?.map(item => {
                    if (item.type === 'method') {
                        return(
                            <MethodCard key={item.id}
                             method={item} 
                             onDelete={() => hndlDeleteItem(item.id)} 
                             isDeletable={true} />
                        );  
                    } else if (item.type === 'exercise') {
                        return (
                            <ExerciseCard 
                            key={item.id} 
                            exercise={item} 
                            onDelete={() => hndlDeleteItem(item.id)}
                             onShowVideo={hndlVerVideo} isDeletable={true} />
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