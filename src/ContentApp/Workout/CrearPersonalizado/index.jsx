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
    Container,
    Autocomplete
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import CrearEjercicio from '../CrearEjercicio';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { usersDataState } from '../../hooks/estadoGlobal';
import { v4 as uuidv4 } from 'uuid';

export default function CrearPersonalizado( { onClose } ) {
    const setAllUsers = useSetRecoilState(usersDataState); 
    const allUsers = useRecoilValue(usersDataState); 

    const usersPro = allUsers.filter(user => user.rol === 'pro');

    const [step, setStep] = useState(1);
    const [programaData, setProgramaData] = useState({
        nombre: '',
        objetivo: '',
        enfermedades: '',
        duracionSemanas: '',
        diasEntrenamiento: '',
        usuarioAsignado: null, 
        dias: {}
    });

    const hndlChange = (e) => {
        const { name, value } = e.target;
        setProgramaData({ ...programaData, [name]: value });
    };

    const hndlNextStep = (e) => {
        e.preventDefault();

        
        if (!programaData.nombre ||
            !programaData.diasEntrenamiento ||
            !programaData.usuarioAsignado) {
            alert('Por favor, completa todos los campos del formulario.');
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

    const hndlFinalizar = () => {
        const nuevoPrograma = {
            ...programaData,
            id: uuidv4(),
            usuarioAsignado: undefined, 
        };
        const updatedUsers = allUsers.map(user => {
            if (user.id === programaData.usuarioAsignado.id) {
                return {
                    ...user,
                    programasAsignados: [...user.programasAsignados, nuevoPrograma],
                };
            }
            return user;
        });
        setAllUsers(updatedUsers);

        alert(`Programa personalizado creado y asignado con éxito a ${programaData.usuarioAsignado.nombre}!`);
        onClose();
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
                    {step === 1 ? 'Entrenamiento Personalizado' : 'Programa de Entrenamiento Personal'} 
                </Typography>

                {step === 1 ? (
                    <Box component="form" onSubmit={hndlNextStep}>
                        <Autocomplete
                        options={usersPro}
                        getOptionLabel={(option) => option.nombre}
                        onChange={(event, newValue) => {
                            setProgramaData(prev => ({ ...prev, usuarioAsignado: newValue }));
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Seleccionar Usuario"
                                variant="outlined"
                                sx={{ ...estiloTexfield, mb: 2 }}
                            />
                        )}
                    />
                        
                        <TextField name="nombre" label="Nombre del Programa" fullWidth margin="normal" onChange={hndlChange} value={programaData.nombre} sx={estiloTexfield} variant="outlined" />
                        
                        <FormControl fullWidth margin="normal" sx={estiloTexfield}>
                            <InputLabel id="objetivo-label">Objetivo</InputLabel>
                            <Select name="objetivo" value={programaData.objetivo} onChange={hndlChange} labelId="objetivo-label" sx={{ color: '#fff' }}>
                                <MenuItem value="Hipertrofia">Hipertrofia</MenuItem>
                                <MenuItem value="Perdida de Grasa">Perdida de Grasa</MenuItem>
                                <MenuItem value="Salud">Salud</MenuItem>
                                <MenuItem value="Entrenamiento Funcional">Entrenamiento Funcional</MenuItem>
                            </Select>
                        </FormControl>
                        
                        <FormControl fullWidth margin="normal" sx={estiloTexfield}>
                            <InputLabel >Enfermedades</InputLabel>
                            <Select name="enfermedades" value={programaData.enfermedades} onChange={hndlChange} labelId="enfermedades-label" sx={{ color: '#fff' }}>
                                <MenuItem value="Diabetes">Diabetes</MenuItem>
                                <MenuItem value="Hipertension">Hipertension</MenuItem>
                                <MenuItem value="Escoliosis">Escoliosis</MenuItem>
                                <MenuItem value="Artritis">Artritis</MenuItem>
                                <MenuItem value="LesionLumbar">Lesion Lumbar</MenuItem>
                                <MenuItem value="SobrePeso">Sobre Peso</MenuItem>
                                <MenuItem value="Otra">Otra</MenuItem>
                                <MenuItem value="Ninguna">Ninguna</MenuItem>
                            </Select>
                        </FormControl>
                        
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