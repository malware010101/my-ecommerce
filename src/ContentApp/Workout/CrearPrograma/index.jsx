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
import { useAuth } from '../../AuthContext';

export default function CrearPrograma( { onClose } ) {

    const { obtenerTokenActual, obtenerUsuarioActual } = useAuth();
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

        
        if (!programaData.nombre || !programaData.diasEntrenamiento) {
            console.error("Por favor, completa todos los campos del formulario.");
            return;
        }

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

    const hndlFinalizar = async () => {
        
    const authToken = obtenerTokenActual(); 
    const { id: creador_id, rol: userRol } = obtenerUsuarioActual(); 

    if (!authToken || !creador_id) {
        console.error("No autenticado. Por favor, inicia sesión.");
       
        return; 
    }
    if (userRol !== 'admin' && userRol !== 'coach') {
        console.error("Permiso denegado: Rol insuficiente para crear programas.");
        return;
    }
    console.log("Token a enviar:", authToken ? authToken.substring(0, 10) + '...' : "TOKEN NO DISPONIBLE"); 

    const diasTransformados = Object.entries(programaData.dias).map(([nombreDia, ejercicios]) => {

        const ejerciciosTransformados = ejercicios.map(ej => ({
              id: String(ej.id), 
              nombre: ej.nombre,
              descripcion: ej.descripcion || '', 
              videoUrl: ej.videoUrl || null, 
              repeticiones: String(ej.repeticiones), 
              series: parseInt(ej.series, 10) || 0,
              descanso: parseInt(ej.descanso, 10) || 0,
        }));
    
        return {
            dia: nombreDia, 
            ejercicios: ejerciciosTransformados,
            metodos: [] 
        };
    });


    const datosFinales = {
        nombre: programaData.nombre,
        objetivo: programaData.objetivo,
        categoria: programaData.categoria, // FastAPI espera 'categoria'
        nivel: parseInt(programaData.nivel, 10) || 0, 
        duracion_semanas: parseInt(programaData.duracionSemanas, 10) || 0, 
        dias_entrenamiento: parseInt(programaData.diasEntrenamiento, 10) || 0, 
        dias: diasTransformados, // Objeto de días con ejercicios
        creador_id: parseInt(creador_id, 10) , // Identificación requerida para la creación
        is_general: true 
    };
    try {
        const response = await fetch('/entrenamiento/programas/', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`, 
            },
            body: JSON.stringify(datosFinales)
        });

        if (response.ok) {
            const nuevoPrograma = await response.json();
            console.log("Programa creado exitosamente:", nuevoPrograma);
            onClose(); 
        } else {
            const errorData = await response.json();
            console.error("Error al crear programa:", errorData.detail);
          
        }
    } catch (error) {
        console.error("Error de red al crear programa:", error);
    }

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
                                <MenuItem value="Perdida de Grasa">Perdida de Grasa</MenuItem>
                                <MenuItem value="Fuerza">Fuerza</MenuItem>
                                <MenuItem value="Salud">Salud</MenuItem>
                                <MenuItem value="Entrenamiento Funcional">Entrenamiento Funcional</MenuItem>
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
                            <Button type="submit" variant="contained" endIcon={<ExpandMoreIcon />} sx={{ mt: 2, bgcolor: 'rgb(0, 204, 255)', color: '#fff', fontWeight: 'bold', borderRadius: '10px','&:hover': { bgcolor: 'rgb(0, 153, 204)' }  }}>
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
                            <Button onClick={() => setStep(1)} variant="contained" sx={{ color: '#fff', fontWeight: 'bold', borderColor: 'rgb(0, 204, 255)',bgcolor: 'rgb(0, 204, 255)','&:hover': { bgcolor: 'rgb(0, 153, 204)',} }}>
                                Volver
                            </Button>
                            <Button onClick={hndlFinalizar} variant="contained" sx={{ bgcolor: 'rgb(0, 204, 255)', color: '#fff', fontWeight:'bold','&:hover': { bgcolor: 'rgb(0, 153, 204)' } }}>
                                Guardar Programa
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Container>
    );
}