import React, { useEffect, useState } from 'react';
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
    Autocomplete,
    Grid,
    Tabs,
    Tab,
    Card,
    CardContent,
    CircularProgress, 
    RadioGroup,
    FormControlLabel,
    Radio
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { usersDataState } from '../../hooks/estadoGlobal';
import { v4 as uuidv4 } from 'uuid';
import NutriViewer from '../../NutriViewer';

export default function CrearNutricion({ onClose, selfMode = false, currentUser = null, onSaved = null }) {
    const allUsers = useRecoilValue(usersDataState);
    const setAllUsers = useSetRecoilState(usersDataState);
    const usersPro = allUsers.filter(user => user.rol === 'pro');
    const [planData, setPlanData] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [explicacionComidas, setExplicacionComidas] = useState('');
    const [mensajeComidas, setMensajeComidas] = useState("");



    useEffect(() => {
    const fetchUsers = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8001/auth/users');

            if (!response.ok) {
                throw new Error('Error al cargar los usuarios desde la API');
            }

            const data = await response.json();

            setAllUsers(data);

        } catch (error) {
            console.error("Error al cargar la lista de usuarios:", error);
        }
    };

    if (allUsers.length === 0) {
        fetchUsers();
    }
}, [allUsers.length, setAllUsers]);

    const [step, setStep] = useState(1);
    const [nutricionData, setNutricionData] = useState({
        usuarioAsignado: null,
        peso: '',
        altura: '',
        edad: '',
        genero: '',
        nivelActividad: '',
        objetivo: '',
        enfermedades: [],
        tipoDieta: '',
        alergias: '',
        comidas: 0,
        horarioEntrenamiento: ''
    });

    // Si estamos en selfMode y recibimos currentUser, prellenamos usuarioAsignado
    useEffect(() => {
        if (selfMode && currentUser) {
            setNutricionData(prev => ({
                ...prev,
                usuarioAsignado: { id: currentUser.id, nombre: currentUser.nombre }
            }));
        }
    }, [selfMode, currentUser]);

    const hndlChange = (e) => {
        const { name, value } = e.target;
        setNutricionData({ ...nutricionData, [name]: value });
        if (name === "comidas") {
    setNutricionData({ ...nutricionData, comidas: Number(value) });
}
    };

    const hndlNextStep = (e) => {
        e.preventDefault();

        if ((!nutricionData.usuarioAsignado && !selfMode) ||
            !nutricionData.peso ||
            !nutricionData.altura ||
            !nutricionData.edad ||
            !nutricionData.genero ||
            !nutricionData.nivelActividad ||
            !nutricionData.comidas ||
            !nutricionData.horarioEntrenamiento ||
            !nutricionData.objetivo) {
            alert('Por favor, completa todos los campos del formulario.');
            return;
        }

        setStep(2);
    };

    const hndlTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

        const hndlGeneratePlan = async () => {
        setIsLoading(true);
        try {
            const { usuarioAsignado, alergias, ...restoData } = nutricionData;

            // Determinar id del usuario objetivo: si selfMode usamos currentUser
            const usuarioIdAsignado = selfMode ? currentUser?.id : usuarioAsignado?.id;

            if (!usuarioIdAsignado) {
                throw new Error('No se ha seleccionado un usuario válido para asignar el plan.');
            }

            const alergiasList = alergias && typeof alergias === 'string' && alergias.trim() !== '' 
                ? alergias.split(',').map(a => a.trim()) 
                : [];

            const finalPayload = {
                usuarioIdAsignado,
                alergias: alergiasList,
                ...restoData,
                peso: parseFloat(restoData.peso),
                altura: parseFloat(restoData.altura),
                edad: parseInt(restoData.edad, 10),
            };
            console.log("Final Payload:", finalPayload);

            const response = await fetch('http://127.0.0.1:8001/nutricion/plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalPayload),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(()=>null);
                console.error("Detalle del error de la API:", errorData?.detail);
                throw new Error(errorData?.detail || 'Error al enviar los datos a la API');
            }

            const data = await response.json();
            setPlanData(data);

        } catch (error) {
            console.error("Hubo un error al generar el plan:", error);
            alert(`Error: ${error.message}.`);
        } finally {
            setIsLoading(false);
        }
    };

const hndlSavePlan = async () => {
        if (!planData || (!nutricionData.usuarioAsignado && !selfMode)) {
            alert("No hay un plan generado para guardar.");
            return;
        }

        const { usuarioAsignado, ...datosLimpios } = nutricionData;

        try {
            const payload = {
                usuario_id: selfMode ? currentUser.id : usuarioAsignado.id,
                calorias_diarias: planData.calorias_diarias,
                macronutrientes: planData.macronutrientes,
                opciones_menu: planData.opciones_menu,
                datos_recibidos: {
                    ...datosLimpios,
                    usuarioIdAsignado: selfMode ? currentUser.id : usuarioAsignado.id
                }
            };

            const response = await fetch("http://127.0.0.1:8001/nutricion/plan/guardar",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                }
            );

            if (!response.ok) {
                const error = await response.json().catch(()=>null);
                throw new Error(error?.detail || "Error al guardar el plan");
            }

            const data = await response.json();

            alert("Plan nutricional guardado correctamente");

            // Notificar al padre que se guardó para que refresque
            onSaved?.();

            onClose?.();

        } catch (error) {
            console.error("Error al guardar el plan:", error);
            alert(error.message || 'Error al guardar');
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

    const nivelesActividad = [
        { value: 'sedentary', label: 'Sedentario (poco o ningún ejercicio)' },
        { value: 'light', label: 'Ligera (ejercicio 1-3 días/semana)' },
        { value: 'moderate', label: 'Moderada (ejercicio 3-4 días/semana)' },
        { value: 'intense', label: 'Intensa (ejercicio 5-6 días/semana)' },
        { value: 'athlete', label: 'Atleta (entrenamiento intenso 2 veces/día)' }
    ];
    
    const enfermedadesOpciones = ['Ninguna', 'Diabetes tipo 2', 'Hipertensión', 'Resistencia a la insulina'];
    const tipoDietaOpciones = ['Normal'];
    const comidasPorDiaOpciones = [
    { value: 3, label: "3 comidas (recomendado)" },
    { value: 4, label: "4 comidas" },
    { value: 5, label: "5 comidas" },
    { value: 6, label: "6 comidas (solo atletas)" }
];

const mensajes = {
    3: "Recomendado para la mayoría de usuarios. Facilita la adherencia.",
    4: "Buena opción si entrenas moderado o tienes disponibilidad de tiempo para cocinar.",
    5: "Recomendado si entrenas intenso, tu objetivo es hipertrofia o tienes disponibilidad de tiempo para cocinar.",
    6: "6 comidas solo es recomendable si eres atleta o entrenas muy intenso."
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
                    {step === 1 ? 'Crear Plan Nutricional' : 'Generar Plan Nutricional'}
                </Typography>

                {step === 1 ? (
                    <Box component="form" onSubmit={hndlNextStep}>
                        {!selfMode && (
    <Autocomplete
        options={usersPro}
        getOptionLabel={(option) => option.nombre}
        onChange={(event, newValue) => {
            setNutricionData(prev => ({ ...prev, usuarioAsignado: newValue }));
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
)}
                        <TextField name="peso" label="Peso (kg)" type="tel" fullWidth margin="normal" onChange={hndlChange} value={nutricionData.peso} sx={estiloTexfield} />
                        <TextField name="altura" label="Altura (cm)" type="tel" fullWidth margin="normal" onChange={hndlChange} value={nutricionData.altura} sx={estiloTexfield} />
                        <TextField name="edad" label="Edad" type="tel" fullWidth margin="normal" onChange={hndlChange} value={nutricionData.edad} sx={estiloTexfield} />
                        <FormControl fullWidth margin="normal" sx={estiloTexfield}>
                            <InputLabel id="genero-label">Género</InputLabel>
                            <Select name="genero" value={nutricionData.genero} onChange={hndlChange} labelId="genero-label" sx={{ color: '#fff' }}>
                                <MenuItem value="Masculino">Masculino</MenuItem>
                                <MenuItem value="Femenino">Femenino</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal" sx={estiloTexfield}>
                            <InputLabel id="actividad-label">Nivel de Actividad</InputLabel>
                            <Select name="nivelActividad" value={nutricionData.nivelActividad} onChange={hndlChange} labelId="actividad-label" sx={{ color: '#fff' }}>
                                {nivelesActividad.map((nivel) => (
                                    <MenuItem key={nivel.value} value={nivel.value}>{nivel.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal" sx={estiloTexfield}>
                            <InputLabel id="objetivo-label">Objetivo</InputLabel>
                            <Select name="objetivo" value={nutricionData.objetivo} onChange={hndlChange} labelId="objetivo-label" sx={{ color: '#fff' }}>
                                <MenuItem value="Hipertrofia">Hipertrofia</MenuItem>
                                <MenuItem value="Perdida de Grasa">Pérdida de Grasa</MenuItem>
                                <MenuItem value="Mantenimiento">Mantenimiento</MenuItem>
                            </Select>
                        </FormControl>
                        
                        <FormControl fullWidth margin="normal" sx={estiloTexfield}>
                            <InputLabel id="enfermedades-label">Enfermedades</InputLabel>
                            <Select
                                name="enfermedades"
                                multiple
                                value={nutricionData.enfermedades}
                                onChange={hndlChange}
                                renderValue={(selected) => selected.join(', ')}
                                labelId="enfermedades-label"
                                sx={{ color: '#fff' }}
                            >
                                {enfermedadesOpciones.map((enfermedad) => (
                                    <MenuItem key={enfermedad} value={enfermedad}>
                                        {enfermedad}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal" sx={estiloTexfield}>
                            <InputLabel id="dieta-label">Tipo de Dieta</InputLabel>
                            <Select name="tipoDieta" value={nutricionData.tipoDieta} onChange={hndlChange} labelId="dieta-label" sx={{ color: '#fff' }}>
                                {tipoDietaOpciones.map((dieta) => (
                                    <MenuItem key={dieta} value={dieta}>{dieta}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField name="alergias" label="Alergias (si aplica)" type="text" fullWidth margin="normal" onChange={hndlChange} value={nutricionData.alergias} sx={estiloTexfield} />
                        <FormControl fullWidth margin="normal" sx={estiloTexfield}>
    <InputLabel id='comidas-label'>¿Cuántas comidas al día?</InputLabel>
    <Select
        name="comidas"
        value={nutricionData.comidas}
        onChange={hndlChange}
        labelId="comidas-label"
        sx={{ color: '#fff' }}
    >
        {comidasPorDiaOpciones.map((op) => (
            <MenuItem key={op.value} value={op.value}>
                {op.label}
            </MenuItem>
        ))}
    </Select>

    {mensajeComidas && (
        <Typography sx={{ color: "rgb(0, 204, 255)", mt: 1, fontSize: "0.85rem" }}>
            {mensajeComidas}
        </Typography>
    )}
</FormControl>

<FormControl component="fieldset"  sx={{ mt: 3 }}>
    <Typography sx={{ color: '#bbb', mb: 1, fontSize: '1.2rem' }}>
        ¿A qué hora entrenas normalmente?
    </Typography>

    <RadioGroup
        row
        name="horarioEntrenamiento"
        value={nutricionData.horarioEntrenamiento}
        onChange={hndlChange}
    >
        <FormControlLabel
            value="temprano"
            control={<Radio sx={{ color: 'rgb(0, 204, 255)' }} />}
            label="Temprano (antes de las 16:00)"
            sx={{ color: '#fff' }}
        />
        <FormControlLabel
            value="tarde"
            control={<Radio sx={{ color: 'rgb(0, 204, 255)' }} />}
            label="Tarde (después de las 16:00)"
            sx={{ color: '#fff' }}
        />
    </RadioGroup>
</FormControl>
{nutricionData.horarioEntrenamiento && (
    <Typography sx={{ color: 'rgb(0, 204, 255)', mt: 1, fontSize: '0.8rem' }}>
        {nutricionData.horarioEntrenamiento === 'temprano'
            ? 'La distribución nocturna se ajusta para favorecer la recuperación metabólica y el descanso, sin afectar el progreso.'
            : 'La distribución nocturna se ajusta para maximizar la reposición de glucógeno y la recuperación muscular.'}
    </Typography>
)}

                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                            <Button type="submit" variant="contained" endIcon={<ExpandMoreIcon />} sx={{ mt: 2, bgcolor: 'rgb(0, 204, 255)', color: '#fff', fontWeight: 'bold', borderRadius: '10px', '&:hover': { bgcolor: 'rgb(0, 153, 204)' } }}>
                                Siguiente
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{ bgcolor: '#000', p: 2 }}>
                        
                        {isLoading ? (
                            <Box sx={{ p: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography color="#fff" variant="h6">
                                    Calculando macronutrientes y elaborando el plan alimenticio...
                                </Typography>
                                <CircularProgress sx={{ mt: 2, color: 'rgb(0, 204, 255)' }} />
                            </Box>
                        ) : (
                            planData ? (
                                <>
                                  <NutriViewer plan={planData} />
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 2 }}>
                                        <Button 
                                            onClick={() => setStep(1)} 
                                            variant="contained"
                                            sx={{ ...estiloTexfield, bgcolor: 'rgb(0, 204, 255)', color: '#fff', '&:hover': { bgcolor: 'rgb(0, 153, 204)' } }}>
                                            Volver
                                        </Button>
                                        <Button
                                            onClick={hndlSavePlan}
                                            variant="contained"
                                            sx={{ ...estiloTexfield, bgcolor: 'rgb(0, 204, 255)', color: '#fff', '&:hover': { bgcolor: 'rgb(0, 153, 204)' } }}>
                                            Guardar Plan
                                        </Button>
                                    </Box>
                                </>
                            ) : (
                                <Box sx={{ bgcolor: '#000' }}>
                                    <Typography color="#fff" textAlign="center" sx={{p:4}}>
                                        Haz clic en "Generar Plan" para crear el plan de nutrición.
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 2 }}>
                                        <Button 
                                            onClick={() => setStep(1)}
                                            variant="contained"
                                            sx={{ color: '#fff', fontWeight: 'bold', borderColor: 'rgb(0, 204, 255)', bgcolor: 'rgb(0, 204, 255)', '&:hover': { bgcolor: 'rgb(0, 153, 204)' } }}>
                                            Volver
                                        </Button>
                                        <Button 
                                            onClick={hndlGeneratePlan} 
                                            variant="contained" 
                                            disabled={isLoading} 
                                            sx={{ 
                                                bgcolor: 'rgb(0, 204, 255)', 
                                                color: '#fff', 
                                                fontWeight: 'bold', 
                                                '&:hover': { bgcolor: 'rgb(0, 153, 204)' }
                                            }}>
                                            {isLoading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Generar Plan'}
                                        </Button>
                                    </Box>
                                </Box>
                            )
                        )}
                    </Box>
                )}
            </Box>
        </Container>
    );
}