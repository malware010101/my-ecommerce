import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Container
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import CrearEjercicio from '../CrearEjercicio';

export default function CrearPrograma() {
    const [step, setStep] = useState(1);
    const [programaData, setProgramaData] = useState({
        nombre: '',
        objetivo: '',
        categoria: '',
        nivel: '',
        duracionSemanas: '',
        diasEntrenamiento: '',
        dias: {} 
    });

    const hndlChange = (e) => {
        const { name, value } = e.target;
        setProgramaData({ ...programaData, [name]: value });
    };

    const hndlNextStep = (e) => {
        e.preventDefault();

        // Validación mejorada: Asegúrate de que los campos clave estén llenos.
        if (!programaData.nombre || !programaData.diasEntrenamiento) {
            alert('Por favor, completa el nombre del programa y los días de entrenamiento.');
            return;
        }

        // Inicializa la estructura de los días.
        const nuevosDias = {};
        for (let i = 1; i <= parseInt(programaData.diasEntrenamiento); i++) {
            nuevosDias[`Día ${i}`] = [];
        }
        setProgramaData(prev => ({ ...prev, dias: nuevosDias }));
        setStep(2);
    };

    const hndlEjercicios = (ejerciciosPorDia) => {
        setProgramaData(prev => ({ ...prev, dias: ejerciciosPorDia }));
    };

    const hndlFinalizar = () => {
        console.log("Programa Creado:", programaData);
        alert("Programa creado con éxito!");
        // Aquí podrías agregar una redirección o un setStep(1) para volver a empezar
    };

    const estiloTexfield = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'rgb(0, 204, 255)', 
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
        '& .MuiInputLabel-root': { color: '#bbb' },
        '& .MuiInputLabel-root.Mui-focused': { color: 'rgb(0, 204, 255)' }
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{
                p: 3,
                bgcolor: '#000',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0, 183, 255, 0.7)'
            }}>
                
                <Typography variant="h5" color="#fff" mt={1} mb={3} textAlign="center" fontWeight="bold">
                    {step === 1 ? 'Crear Nuevo Programa' : 'Programa de entrenamiento'}
                </Typography>

                {step === 1 ? (
                    <Box component="form" onSubmit={hndlNextStep}>
                        
                        <TextField name="nombre" label="Nombre del Programa" fullWidth margin="normal" onChange={hndlChange} value={programaData.nombre} sx={estiloTexfield} variant="outlined" />
                        
                        <FormControl fullWidth margin="normal" sx={estiloTexfield}>
                            <InputLabel id="objetivo-label">Objetivo</InputLabel>
                            <Select name="objetivo" value={programaData.objetivo} onChange={hndlChange} labelId="objetivo-label" sx={{ color: '#fff' }}>
                                <MenuItem value="Hipertrofia">Hipertrofia</MenuItem>
                                <MenuItem value="Fuerza">Perdida de Grasa</MenuItem>
                                <MenuItem value="Pérdida de Peso">Salud</MenuItem>
                                <MenuItem value="Equilibrado">Funcional</MenuItem>
                            </Select>
                        </FormControl>
                        
                        <FormControl fullWidth margin="normal" sx={estiloTexfield}>
                            <InputLabel id="categoria-label">Categoría</InputLabel>
                            <Select name="categoria" value={programaData.categoria} onChange={hndlChange} labelId="categoria-label" sx={{ color: '#fff' }}>
                                <MenuItem value="Principiante">Principiante</MenuItem>
                                <MenuItem value="Intermedio">Intermedio</MenuItem>
                                <MenuItem value="Avanzado">Avanzado</MenuItem>
                            </Select>
                        </FormControl>
                        
                        <TextField name="nivel" label="Nivel (Ej. 1, 2, 3)" type="number" fullWidth margin="normal" onChange={hndlChange} value={programaData.nivel} sx={estiloTexfield} variant="outlined" />
                        
                        <TextField name="duracionSemanas" label="Duración (en semanas)" type="number" fullWidth margin="normal" onChange={hndlChange} value={programaData.duracionSemanas} sx={estiloTexfield} variant="outlined" />
                        
                        <FormControl fullWidth margin="normal" sx={estiloTexfield}>
                            <InputLabel id="dias-label">Días de Entrenamiento</InputLabel>
                            <Select name="diasEntrenamiento" value={programaData.diasEntrenamiento} onChange={hndlChange} labelId="dias-label" sx={{ color: '#fff' }}>
                                <MenuItem value={3}>3 Días</MenuItem>
                                <MenuItem value={4}>4 Días</MenuItem>
                                <MenuItem value={5}>5 Días</MenuItem>
                                <MenuItem value={6}>6 Días</MenuItem>
                            </Select>
                        </FormControl>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                            <Button type="submit" variant="contained" endIcon={<ExpandMoreIcon />} sx={{ mt: 2, bgcolor: 'rgb(0, 204, 255)', color: '#fff', fontWeight: 'bold', borderRadius: '10px' }}>
                                Siguiente
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Box sx= {{ bgcolor: '#000'}} >
                        <CrearEjercicio
                            dias={programaData.dias}
                            onExercisesChange={hndlEjercicios}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 2 }}>
                            <Button onClick={() => setStep(1)} variant="outlined" sx={{ color: 'rgb(0, 204, 255)', borderColor: 'rgb(0, 204, 255)' }}>
                                Volver
                            </Button>
                            <Button onClick={hndlFinalizar} variant="contained" sx={{ bgcolor: 'rgb(0, 204, 255)', color: '#fff' }}>
                                Guardar Programa
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Container>
    );
}