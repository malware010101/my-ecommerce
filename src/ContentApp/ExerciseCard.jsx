import React from 'react';
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
    isInteractive = false,
    isCompleted = false,
    onToggleComplete = () => {}
}) => {

    const hndlToggleComplete = (e) => {
        e.stopPropagation();
        onToggleComplete(exercise.id);
    };

    return (
        <Card 
            sx={{ 
                bgcolor: '#000', 
                mb: 2, 
                p: 2, 
                color: '#fff', 
                borderRadius: '30px', 
                position: 'relative',
                boxShadow: isCompleted && isInteractive
                    ? '0 4px 10px rgba(0, 255, 0, 0.7)'
                    : '0 4px 10px rgba(0, 183, 255, 0.7)',
                opacity: isCompleted && isInteractive ? 0.6 : 1,
                transition: 'all 0.3s ease',
            }}
        >
            <CardContent sx={{ p: 1 }}>
                <Box sx={{ position: 'absolute', top: 5, right: 5, display: 'flex' }}>
                    
                    <IconButton
                        size="small"
                        sx={{ color: 'rgb(0, 204, 255)' }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onShowVideo(exercise.videoUrl);
                        }}
                    >
                        <VisibilityIcon/>
                    </IconButton>
                    
                    {isInteractive && (
                        <IconButton 
                            size="small" 
                            sx={{ 
                                color: isCompleted ? 'green' : 'rgb(0, 204, 255)',
                                ml: 1 
                            }} 
                            onClick={hndlToggleComplete}
                        >
                            <CheckIcon/>
                        </IconButton>
                    )}

                    {isDeletable && (
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(exercise.id);
                            }}
                            color="error"
                            size="small"
                        >
                            <DeleteIcon />
                        </IconButton>
                    )}
                </Box>
                
                <Typography fontWeight="bold">
                    {exercise.nombre}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <NotesIcon sx={{ color: 'rgb(0, 204, 255)', mr: 1 }} />
                    <Typography fontStyle="italic" color="#bbb" textAlign="left">
                        {exercise.descripcion}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <FitnessCenterIcon sx={{ color: 'rgb(0, 204, 255)', mr: 1 }} />
                    <Typography color="rgb(0, 204, 255)" fontWeight="bold">
                        Series:
                        <Typography component="span" sx={{ ml: 1, color: '#fff' }}>
                            {exercise.series}
                        </Typography>
                    </Typography>

                    <Typography sx={{ mx: 2 }} color="rgb(0, 204, 255)" fontWeight="bold">
                        Reps:
                        <Typography component="span" sx={{ ml: 1, color: '#fff' }}>
                            {exercise.repeticiones}
                        </Typography>
                    </Typography>

                    <AccessAlarmsIcon sx={{ color: 'rgb(0, 204, 255)', mr: 1 }} />
                    <Typography color="rgb(0, 204, 255)" fontWeight="bold">
                        Desc:
                        <Typography component="span" sx={{ ml: 1, color: '#fff' }}>
                            {exercise.descanso} seg
                        </Typography>
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ExerciseCard;
