import React, { useState } from 'react';
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    TextField,
    InputAdornment,
    Stack,
    Card,
    CardContent,
    Button
} from '@mui/material';
import { Close as CloseIcon, Search as SearchIcon } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ejercicios } from './Data/Ejercicios';

// Componente de tarjeta individual para la librería
const LibraryExerciseCard = ({ exercise, onSelect, onShowVideo }) => {
    return (
        <Card
            sx={{
                bgcolor: '#090909',
                borderRadius: '10px',
                color: '#fff',
                opacity: 0.7,
                border: '1px solid #333',
                '&:hover': {
                    border: '1px solid rgb(0, 204, 255)',
                    bgcolor: '#090909',
                    opacity: 1

                }
            }}
        >
            <CardContent sx={{ p: 1, '&:last-child': { pb: 2 } }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 1
                    }}
                >
                    <Box
                        onClick={() => onSelect(exercise)}
                        sx={{ flexGrow: 1, cursor: 'pointer' }}
                    >
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {exercise.nombre}
                        </Typography>
                        <Typography variant="body2" color="#bbb">
                            {exercise.descripcion}
                        </Typography>
                    </Box>
                    <IconButton
                        size="small"
                        sx={{ color: 'rgb(0, 204, 255)' }}
                        /// videoUrl es el videoId de bunny, no el url real, por logica anterior asi lo deje con ese nombre
                        onClick={() => onShowVideo(exercise.videoUrl)}
                    >
                        <VisibilityIcon size="small"/>
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default function DrawerEjercicios({ open, onClose, onSelectExercise, onShowVideo }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [vista, setVista] = useState('lista');
    const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(null);
    const [formData, setFormData] = useState({
        descripcion: '',
        series: '',
        repeticiones: '',
        descanso: '',
    });

    const filteredExercises = ejercicios.filter(exercise =>
        exercise.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const hndlSelectCard = (exercise) => {
        setEjercicioSeleccionado(exercise);
        setVista('formulario');
        setFormData({
            descripcion: '',
            series: '',
            repeticiones: '',
            descanso: '',
        });
    };

    const hndlFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const hndlAddExercise = () => {
        const newExercise = { ...ejercicioSeleccionado, ...formData };
        onSelectExercise(newExercise);
        setVista('lista');
        setEjercicioSeleccionado(null);
    };

    const hndlBackLista = () => {
        setVista('lista');
        setEjercicioSeleccionado(null);
    };

    const estiloTexfield = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#1f1f1fff',
                borderRadius: '10px',
            },
            '&:hover fieldset': {
                borderColor: 'rgb(0, 204, 255)',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'rgb(0, 204, 255)',
            },
            backgroundColor: 'transparent',
            color: '#fff',
        },
        '& .MuiInputBase-input': { color: '#fff' },
        '& .MuiInputLabel-root': { color: '#888' },
        '& .MuiInputLabel-root.Mui-focused': { color: 'rgb(0, 204, 255)' }
    };
    
    const renderContenido = () => {
        if (vista === 'formulario') {
            return (
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
                        Configurar {ejercicioSeleccionado.nombre}
                    </Typography>

                    <Box sx={{ mb: 4 }}>
                    <TextField
                        fullWidth
                        label="Descripción"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={hndlFormChange}
                        multiline
                        rows={2}
                        sx={{ ...estiloTexfield ,
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgb(0, 204, 255)', borderRadius: '10px' }
                        }}

                        
                    />
                </Box>

                    <Box sx={{ mb: 4 }}>
                    <TextField
                        fullWidth
                        label="Series"
                        name="series"
                        value={formData.series}
                        onChange={hndlFormChange}
                        type="number"
                        sx={{
                            
                        ...estiloTexfield ,
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgb(0, 204, 255)', borderRadius: '10px' }
                        }}
                    />
                </Box>
                <Box sx={{ mb: 4 }}>
                    <TextField
                        fullWidth
                        label="Repeticiones"
                        name="repeticiones"
                        value={formData.repeticiones}
                        onChange={hndlFormChange}
                        sx={{
                            ...estiloTexfield ,
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgb(0, 204, 255)', borderRadius: '10px' }
                        }}
                    />
                </Box>
                <Box sx={{ mb: 5 }}>
                     <TextField
                        fullWidth
                        label="Descanso (segundos)"
                        name="descanso"
                        value={formData.descanso}
                        onChange={hndlFormChange}
                        type="number"
                        sx={{
                            ...estiloTexfield ,
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgb(0, 204, 255)', borderRadius: '10px' }
                        }}
                    />
                </Box>

                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            variant="contained"
                            onClick={hndlBackLista}
                            sx={{ bgcolor: 'rgb(0, 204, 255)', borderRadius: '20px', fontSize: { xs: '12px', md: '14px'}, fontWeight: 'bold', color: '#fff', '&:hover': { bgcolor: 'rgb(0, 153, 204)' } }}
                        >
                            Regresar
                        </Button>
                        <Button
                            variant="contained"
                            onClick={hndlAddExercise}
                            sx={{ bgcolor: 'rgb(0, 204, 255)', borderRadius: '20px', fontSize: { xs: '12px', md: '14px'}, fontWeight: 'bold', '&:hover': { bgcolor: 'rgb(0, 153, 204)' } }}
                        >
                            Añadir
                        </Button>
                    </Box>
                </Box>
            );
        } else {
            return (
                <>
                    <TextField
                        fullWidth
                        placeholder="Busca un ejercicio..."
                        variant="outlined"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            p: 2,
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'rgb(0, 204, 255)' },
                                '&:hover fieldset': { borderColor: 'rgb(0, 204, 255)' },
                                'borderRadius': '10px',
                                '&.Mui-focused fieldset': { borderColor: 'rgb(0, 204, 255)' },
                                color: '#fff',
                            },
                            '& .MuiInputBase-input': { color: '#fff' },
                            '& .MuiInputBase-input::placeholder': { color: '#ccc', opacity: 1 },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: '#bbb' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box sx={{ overflowY: 'auto', flexGrow: 1, p: 2 }}>
                        <Stack direction="column" spacing={2}>
                            {filteredExercises.map(exercise => (
                                <LibraryExerciseCard
                                    key={exercise.id}
                                    exercise={exercise}
                                    onSelect={hndlSelectCard}
                                    onShowVideo={onShowVideo}
                                />
                            ))}
                        </Stack>
                    </Box>
                </>
            );
        }
    };
    

    return (
        <>
            <Drawer
                anchor="right"
                open={open}
                onClose={onClose}
                hideBackdrop={true}
                elevation= {0}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: { xs: '90%', sm: '70%', md: '450px' },
                        bgcolor: '#000',
                        color: '#fff',
                        boxSizing: 'border-box',
                        boxShadow: '-4px 0px 10px rgba(0, 204, 255, 0.7)',
                    },
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, bgcolor: 'rgb(0, 204, 255)', p: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Añadir ejercicio</Typography>
                    <IconButton onClick={onClose} color="inherit">
                        <CloseIcon />
                    </IconButton>
                </Box>
                
                {renderContenido()} 

            </Drawer>
        </>
    );
}