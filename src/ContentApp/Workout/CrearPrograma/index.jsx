import React, { useState, useRef } from 'react';
import api from '../../../api';
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
import { enqueueSnackbar } from 'notistack';
import { useSnackbar } from 'notistack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function CrearPrograma( { onClose } ) {

    const {enqueueSnackbar} = useSnackbar();
      const notiSound = useRef(
        new Audio('/sounds/success.mp3')
      )

    const { obtenerTokenActual, obtenerUsuarioActual } = useAuth();
    const [step, setStep] = useState(1);
    const [programaData, setProgramaData] = useState({
        nombre: '',
        objetivo: '',
        categoria: '',
        nivel: '',
        duracionSemanas: '',
        diasEntrenamiento: '',
        dias: [],
        tipo:'base'
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

        const nuevosDias = [];

for (let i = 1; i <= parseInt(programaData.diasEntrenamiento); i++) {
  nuevosDias.push({
    dia: `Día ${i}`,
    items: []
  });
}

setProgramaData(prev => ({
  ...prev,
  dias: nuevosDias
}));
setStep(2);
};

    const hndlEjercicios = (diasActualizados) => {
  setProgramaData(prev => ({
    ...prev,
    dias: diasActualizados
  }));
};

   const hndlFinalizar = async () => {

    const authToken = obtenerTokenActual();
    const { id: creador_id, rol: userRol } = obtenerUsuarioActual();

    if (!authToken || !creador_id) {
        console.error("No autenticado. Por favor, inicia sesión.");
        return;
    }

    if (userRol !== "admin" && userRol !== "coach") {
        console.error("Permiso denegado: Rol insuficiente para crear programas.");
        return;
    }

    const datosFinales = {
        nombre: programaData.nombre,
        objetivo: programaData.objetivo,
        categoria: programaData.categoria,
        nivel: parseInt(programaData.nivel, 10) || 0,
        duracion_semanas: parseInt(programaData.duracionSemanas, 10) || 0,
        dias_entrenamiento: parseInt(programaData.diasEntrenamiento, 10) || 0,
        dias: programaData.dias,
        tipo: programaData.tipo,
        creador_id: parseInt(creador_id),
        is_general: true
    };

    try {
        const { data: nuevoPrograma } = await api.post(
            "/entrenamiento/programas/",
            datosFinales
        );

        enqueueSnackbar(
            "Programa creado exitosamente",
            { variant: "success" }
        );

        notiSound.current.currentTime = 0;
        notiSound.current.play().catch(() => {});

        
        onClose();

    } catch (error) {
        console.error("Error al crear el programa:", error);
        enqueueSnackbar(
            "Error al crear el programa",
            { variant: "error" }
        );
    }
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
                                <MenuItem value="Acondicionamiento">Acondicionamiento Fisico</MenuItem>
                                <MenuItem value="Hipertrofia">Hipertrofia</MenuItem>
                                <MenuItem value="Perdida de Grasa">Perdida de Grasa</MenuItem>
                                <MenuItem value="Fuerza">Fuerza</MenuItem>
                                <MenuItem value="Salud">Salud</MenuItem>
                                <MenuItem value="Entrenamiento Funcional">Entrenamiento Funcional</MenuItem>
                                <MenuItem value="HIIT">HIIT</MenuItem>
                                <MenuItem value="Tabata">Tabata</MenuItem>
                                <MenuItem value="Abs">Abs</MenuItem>
                                <MenuItem value="Hipertrofia Mujeres">Hipertrofia Mujeres</MenuItem>
                                <MenuItem value="Metabolicos Mujeres">Metabolicos Mujeres</MenuItem>
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
                        
                        <TextField
                         name="nivel" 
                         label="Nivel (Ej. 1, 2, 3)" 
                         type="number" 
                         fullWidth margin="normal" 
                         onChange={hndlChange} 
                         value={programaData.nivel} 
                         sx={
                            estiloTexfield
                            } 
                            variant="outlined" />
                        
                        <TextField 
                        name="duracionSemanas" 
                        label="Duración (en semanas)" 
                        type="number" 
                        fullWidth
                         margin="normal" 
                        onChange={hndlChange} 
                        value={programaData.duracionSemanas} 
                        sx={estiloTexfield} 
                        variant="outlined" />
                        
                        <FormControl fullWidth margin="normal" sx={estiloTexfield}>
                            <InputLabel id="dias-label">Días de Entrenamiento</InputLabel>
                            <Select name="diasEntrenamiento" value={programaData.diasEntrenamiento} onChange={hndlChange} labelId="dias-label" sx={{ color: '#fff' }}>
                                <MenuItem value={1}>1 Día</MenuItem>
                                <MenuItem value={2}>2 Días</MenuItem>
                                <MenuItem value={3}>3 Días</MenuItem>
                                <MenuItem value={4}>4 Días</MenuItem>
                                <MenuItem value={5}>5 Días</MenuItem>
                                <MenuItem value={6}>6 Días</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl 
                        fullWidth 
                        margin="normal" 
                        sx={estiloTexfield}>
                            <InputLabel id="tipo-label">
                            Tipo Programa
                            </InputLabel>
                            <Select 
                            name="tipo" 
                            value={programaData.tipo} 
                            onChange={hndlChange} 
                            labelId="tipo-label" 
                            sx={{ color: '#fff' }}>
                                <MenuItem value='base'>Base</MenuItem>
                                <MenuItem value='complemento'>Complemento</MenuItem>
                            </Select>
                        </FormControl>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                            <Button type="submit" variant="contained" endIcon={<ArrowForwardIosIcon />} sx={{ mt: 2, bgcolor: 'rgb(0, 204, 255)', color: '#fff', fontWeight: 'bold', borderRadius: '20px','&:hover': { bgcolor: 'rgb(0, 153, 204)' }  }}>
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
                            <Button onClick={() => setStep(1)} variant="contained" size={'small'} sx={{ color: '#fff', fontWeight: 'bold', fontSize: { xs: '12px', md: '14px'}, borderRadius: '20px', borderColor: 'rgb(0, 204, 255)',bgcolor: 'rgb(0, 204, 255)','&:hover': { bgcolor: 'rgb(0, 153, 204)',} }}>
                                Regresar
                            </Button>
                            <Button onClick={hndlFinalizar} variant="contained" size={'small'} sx={{ bgcolor: 'rgb(0, 204, 255)', color: '#fff', fontSize: { xs: '12px', md: '14px'}, borderRadius: '20px', fontWeight:'bold','&:hover': { bgcolor: 'rgb(0, 153, 204)' } }}>
                                Guardar 
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Container>
    );
}