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
import CloseIcon from '@mui/icons-material/Close';

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
                        <VisibilityIcon fontSize="small"/>
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
                            <CheckIcon fontSize="small"/>
                        </IconButton>
                    )}

                    {isDeletable && (
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(exercise.id);
                            }}
                            color="white"
                            size="small"
                        >
                            <CloseIcon fontSize="small" opacity={0.7} />
                        </IconButton>
                    )}
                </Box>
                
                <Typography fontWeight="bold" sx={{
                    textAlign: 'left',
                    fontSize:{
                        xs: '.8rem',
                        md: '1.1rem',}
                }}>
                    {exercise.nombre}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <NotesIcon sx={{ color: 'rgb(0, 204, 255)', mr: 1 }} />
                    <Typography fontStyle="italic" color="#bbb" textAlign="left"
                    sx={{
                        fontSize: {
                            xs: '.8rem',
                            md: '1rem',
                        }
                    }}
                    >
                        {exercise.descripcion}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                
                    <Typography color="rgb(0, 204, 255)" fontWeight="bold" 
                    sx={{
                        fontSize: {
                            xs: '.7rem',
                            md: '1rem',
                        }
                    }}
                    >
                        Series:
                        <Typography component="span" sx={{ ml: 1, color: '#fff',fontSize: {
                                xs: '.7rem',
                                md: '1rem',
                            } }}
                        
                        >
                            {exercise.series}
                        </Typography>
                    </Typography>

                    <Typography sx={{ mx: 2, fontSize:{ xs: '.7rem', md: '1rem'} }} color="rgb(0, 204, 255)" fontWeight="bold">
                        Reps:
                        <Typography component="span" sx={{ ml: 1, color: '#fff', fontSize:{ xs: '.7rem', md: '1rem'} }}>
                            {exercise.repeticiones}
                        </Typography>
                    </Typography>

                    <Typography color="rgb(0, 204, 255)" fontWeight="bold" sx={{ fontSize:{ xs: '.7rem', md: '1rem'} }}>
                        Desc:
                        <Typography component="span" sx={{ ml: 1, color: '#fff', fontSize:{ xs: '.7rem', md: '1rem'} }}>
                            {exercise.descanso} seg
                        </Typography>
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ExerciseCard;
