import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, IconButton } from '@mui/material';
import {
    FitnessCenter as FitnessCenterIcon,
    AccessAlarms as AccessAlarmsIcon,
    Notes as NotesIcon,
    Visibility as VisibilityIcon,
    Delete as DeleteIcon, 
    CheckCircleOutline as CheckIcon 
} from '@mui/icons-material';

const ExerciseCard = ({ 
    exercise, 
    onDelete, 
    onShowVideo,
    isDeletable = false, 
    isInteractive = false
}) => {
    const [isCompleted, setIsCompleted] = useState(false);

    const hndlToggleComplete = (e) => {
        e.stopPropagation();
        setIsCompleted(!isCompleted);
    };

    return (
        <Card 
            sx={{ 
                bgcolor: '#000', 
                mb: 2, 
                p: 2, 
                color: '#fff', 
                border: '1px solid #000', 
                borderRadius: '10px', 
                position: 'relative',
                boxShadow: isCompleted && isInteractive ? '0 4px 10px rgba(0, 255, 0, 0.7)' : '0 4px 10px rgba(0, 183, 255, 0.7)',
                opacity: isCompleted && isInteractive ? 0.6 : 1,
                transition: 'box-shadow 0.3s ease, opacity 0.3s ease',
            }}
        >
            <CardContent sx={{ p: 1, '&:last-child': { pb: 2 } }}>
                <Box sx={{ position: 'absolute', top: 5, right: 5, display: 'flex' }}>
                    <IconButton size="small" sx={{ color: 'rgb(0, 204, 255)' }}
                     onClick={(e) => { e.stopPropagation(); onShowVideo(exercise.videoUrl) }}>
                        <VisibilityIcon/>
                    </IconButton>
                    
                    {/* Botón de completar, SÓLO si isInteractive es true */}
                    {isInteractive && (
                        <IconButton 
                            size="small" 
                            sx={{ color: isCompleted ? 'green' : 'rgb(0, 204, 255)', ml: 1 }} 
                            onClick={hndlToggleComplete}
                        >
                            <CheckIcon/>
                        </IconButton>
                    )}

                    {/* Botón de eliminar, SÓLO si isDeletable es true */}
                    {isDeletable && (
                        <IconButton onClick={(e) => { e.stopPropagation(); onDelete(exercise.id) }} color="error" size="small">
                            <DeleteIcon />
                        </IconButton>
                    )}
                </Box>
                
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {exercise.nombre}
                </Typography>
                
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

export default ExerciseCard;