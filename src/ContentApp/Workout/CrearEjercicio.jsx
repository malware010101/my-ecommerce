import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    Tabs,
    Tab,
    IconButton
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import DrawerEjercicios from './DrawerEjercicios';

export default function CrearEjercicio({ dias, onExercisesChange }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(0);
    const dayLabels = Object.keys(dias);

    const hndlOpenDrawer = () => {
        setDrawerOpen(true);
    };

    const hndlCloseDrawer = () => {
        setDrawerOpen(false);
    };

    const handleSelectExercise = (exercise) => {
        const currentDayLabel = dayLabels[selectedDay];
        const newExercise = {
            ...exercise,
            id: Date.now(), 
            series: '', 
            repeticiones: '',
            descanso: '',
            descripcion: exercise.descripcion,
        };
        const updatedDays = {
            ...dias,
            [currentDayLabel]: [...dias[currentDayLabel], newExercise],
        };
        onExercisesChange(updatedDays);
        hndlCloseDrawer();
    };

    const handleTabChange = (event, newValue) => {
        setSelectedDay(newValue);
    };

    const handleEditExercise = (exerciseId, field, value) => {
        const currentDayLabel = dayLabels[selectedDay];
        const updatedExercises = dias[currentDayLabel].map(ex =>
            ex.id === exerciseId ? { ...ex, [field]: value } : ex
        );
        const updatedDays = { ...dias, [currentDayLabel]: updatedExercises };
        onExercisesChange(updatedDays);
    };

    const handleDeleteExercise = (exerciseId) => {
        const currentDayLabel = dayLabels[selectedDay];
        const updatedExercises = dias[currentDayLabel].filter(ex => ex.id !== exerciseId);
        const updatedDays = { ...dias, [currentDayLabel]: updatedExercises };
        onExercisesChange(updatedDays);
    };

    const ExerciseCard = ({ exercise, onEdit, onDelete }) => {
        return (
            <Card sx={{ bgcolor: '#000', mb: 2, p: 2, color: '#fff', border: '1px solid rgb(0, 204, 255)' }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton onClick={onDelete} color="error" size="small">
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                    <TextField
                        name="nombre"
                        label="Nombre del Ejercicio"
                        value={exercise.nombre}
                        onChange={(e) => onEdit('nombre', e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="filled"
                        sx={{ input: { color: '#fff' }, label: { color: '#bbb' }, bgcolor: '#333' }}
                    />
                    <TextField
                        name="videoUrl"
                        label="URL del Video"
                        value={exercise.videoUrl}
                        onChange={(e) => onEdit('videoUrl', e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="filled"
                        sx={{ input: { color: '#fff' }, label: { color: '#bbb' }, bgcolor: '#333' }}
                    />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            name="series"
                            label="Series"
                            type="number"
                            value={exercise.series}
                            onChange={(e) => onEdit('series', e.target.value)}
                            fullWidth
                            margin="normal"
                            variant="filled"
                            sx={{ input: { color: '#fff' }, label: { color: '#bbb' }, bgcolor: '#333' }}
                        />
                        <TextField
                            name="repeticiones"
                            label="Repeticiones"
                            value={exercise.repeticiones}
                            onChange={(e) => onEdit('repeticiones', e.target.value)}
                            fullWidth
                            margin="normal"
                            variant="filled"
                            sx={{ input: { color: '#fff' }, label: { color: '#bbb' }, bgcolor: '#333' }}
                        />
                    </Box>
                    <TextField
                        name="descanso"
                        label="Descanso (segundos)"
                        type="number"
                        value={exercise.descanso}
                        onChange={(e) => onEdit('descanso', e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="filled"
                        sx={{ input: { color: '#fff' }, label: { color: '#bbb' }, bgcolor: '#333' }}
                    />
                    <TextField
                        name="descripcion"
                        label="Descripción"
                        value={exercise.descripcion}
                        onChange={(e) => onEdit('descripcion', e.target.value)}
                        fullWidth
                        multiline
                        rows={2}
                        margin="normal"
                        variant="filled"
                        sx={{ input: { color: '#fff' }, label: { color: '#bbb' }, bgcolor: '#333' }}
                    />
                </CardContent>
            </Card>
        );
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
                    onClick={hndlOpenDrawer}
                    sx={{  color: 'rgb(0, 204, 255)', fontWeight: 'bold', border: '1px solid rgb(0, 204, 255)', borderRadius: '15px', '&:hover': { bgcolor: 'rgb(0, 204, 255)', color: '#fff' } }}
                >
                    Agregar Ejercicio
                </Button>
            </Box>
            
            {/* Contenedor para las tarjetas de ejercicios */}
            <Box sx={{ mt: 3 }}>
                {dias[dayLabels[selectedDay]]?.map(exercise => (
                    <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                        onEdit={(field, value) => handleEditExercise(exercise.id, field, value)}
                        onDelete={() => handleDeleteExercise(exercise.id)}
                    />
                ))}
            </Box>
            
            <DrawerEjercicios
                open={drawerOpen}
                onClose={hndlCloseDrawer}
                onSelectExercise={handleSelectExercise}
            />
        </Box>
    );
}