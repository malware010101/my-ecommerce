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
import dominadasLibresVideo from '/src/assets/Videos/dominadas_libres.MP4?url';
import elevacionFrontalLigaVideo from '/src/assets/Videos/elevacion_frontal_liga.MP4?url';
import fondosLibresVideo from '/src/assets/Videos/fondos_libres.MP4?url';
import jalonUnilateralVideo from '/src/assets/Videos/jalon_unilateral.MP4?url';
import elevacionLateralLigaVideo from '/src/assets/Videos/elevacion_lateral_liga.MP4?url';
import elevacionLateralFrontalLigaVideo from '/src/assets/Videos/elevacion_lateral_frontal_liga.MP4?url';
import remoInclinadoMaquinaVideo from '/src/assets/Videos/remo_inclinado_maquina.MP4?url';
import remoInclinadoUnilateralMaquinaVideo from '/src/assets/Videos/remo_inclinado_unilateral_maquina.MP4?url';

// Componente de tarjeta individual para la librería
const LibraryExerciseCard = ({ exercise, onSelect, onShowVideo }) => {
    return (
        <Card
            sx={{
                bgcolor: '#1c1c1e',
                borderRadius: '10px',
                color: '#fff',
                border: '1px solid #333',
                '&:hover': {
                    border: '1px solid rgb(0, 204, 255)',
                    bgcolor: '#28282b'
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
                        onClick={() => onShowVideo(exercise.videoUrl)}
                    >
                        <VisibilityIcon/>
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

// ejercicios temporales
const ejercicios = [
    { id: 1, nombre: 'Dominadas Libres', descripcion: 'Moviminento controlado', videoUrl: dominadasLibresVideo },
    { id: 2, nombre: 'Elevacion Frontal Con Liga', descripcion: 'Movimiento explosivo', videoUrl: elevacionFrontalLigaVideo },
    { id: 3, nombre: 'Elevacion Lateral Con Liga', descripcion: 'Movimiento explosivo', videoUrl: elevacionLateralLigaVideo },
    { id: 4, nombre: 'Jalon Unilateral En Maquina', descripcion: 'Movimiento controlado', videoUrl: jalonUnilateralVideo },
    { id: 5, nombre: 'Fondos Libres', descripcion: 'Movimiento explosivo', videoUrl: fondosLibresVideo },
    { id: 6, nombre: 'Elevacion Lateral Frontal Con Liga', descripcion: 'Movimiento explosivo', videoUrl: elevacionLateralFrontalLigaVideo },
    { id: 7, nombre: 'Remo Inclinado Con Maquina', descripcion: 'Movimiento controlado', videoUrl: remoInclinadoMaquinaVideo },
    { id: 8, nombre: 'Remo Inclinado Unilateral Con Maquina', descripcion: 'Movimiento contralado', videoUrl: remoInclinadoUnilateralMaquinaVideo },
];

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
                        sx={{
                            '& .MuiOutlinedInput-root': { color: '#fff' },
                            '& .MuiInputLabel-root': { color: '#bbb' },
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
                            '& .MuiOutlinedInput-root': { color: '#fff' },
                            '& .MuiInputLabel-root': { color: '#bbb' },
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
                        type="number"
                        sx={{
                            '& .MuiOutlinedInput-root': { color: '#fff' },
                            '& .MuiInputLabel-root': { color: '#bbb' },
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
                            '& .MuiOutlinedInput-root': { color: '#fff' },
                            '& .MuiInputLabel-root': { color: '#bbb' },
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgb(0, 204, 255)', borderRadius: '10px' }
                        }}
                    />
                </Box>

                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            variant="contained"
                            onClick={hndlBackLista}
                            sx={{ bgcolor: 'rgb(0, 204, 255)', borderRadius: '10px', fontWeight: 'bold', color: '#fff', '&:hover': { bgcolor: 'rgb(0, 153, 204)' } }}
                        >
                            Volver
                        </Button>
                        <Button
                            variant="contained"
                            onClick={hndlAddExercise}
                            sx={{ bgcolor: 'rgb(0, 204, 255)', borderRadius: '10px', fontWeight: 'bold', '&:hover': { bgcolor: 'rgb(0, 153, 204)' } }}
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
                        placeholder="Buscar un ejercicio..."
                        variant="outlined"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            p: 2,
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'rgb(0, 204, 255)' },
                                '&:hover fieldset': { borderColor: 'rgb(0, 204, 255)' },
                                '&.Mui-focused fieldset': { borderColor: 'rgb(0, 204, 255)' },
                                color: '#fff',
                            },
                            '& .MuiInputBase-input': { color: '#fff' },
                            '& .MuiInputBase-input::placeholder': { color: '#fff', opacity: 1 },
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