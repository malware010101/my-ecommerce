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
    RadioGroup,
    FormControlLabel,
    Radio
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import NutriViewer from '../../NutriViewer';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import api from "../../../api";
import useUsers from '../../hooks/useUsers';
import CircularProgress from '@mui/material/CircularProgress';

export default function CrearNutricion({ onClose, selfMode = false, currentUser = null, onSaved = null }) {
  
    const { data: users = [], isLoading } = useUsers();
    const usersPro = users.filter(user => user.rol === 'pro');
    const [planData, setPlanData] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [explicacionComidas, setExplicacionComidas] = useState('');
    const [mensajeComidas, setMensajeComidas] = useState("");

    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    //Mutate para generar el plan nutricional
    const generateMutation = useMutation({
  mutationFn: async (payload) => {
    const res = await api.post("/nutricion/plan", payload);
    return res.data;
  },
  onSuccess: (data) => {
    setPlanData(data);
  },
  onError: (error) => {
    alert(error.response?.data?.detail || "Error al generar plan");
  }
});

//muate para guardar el plan
const saveMutation = useMutation({
  mutationFn: async (payload) => {
    const res = await api.post("/nutricion/plan/guardar", payload);
    return res.data;
  },
  onSuccess: async (_, variables) => {
    try {
      const notiSound = new Audio('/sounds/success.mp3');
      await notiSound.play();
    } catch (err) {
      console.log("Error al reproducir el sonido:", err);
    }
    enqueueSnackbar("Plan guardado correctamente", { variant: "success" });

    // invalidar SOLO el usuario afectado
    queryClient.invalidateQueries(["planNutricional", variables.usuario_id]);

    onSaved?.();
    onClose?.();
  },
  onError: (error) => {
    enqueueSnackbar(
      error.response?.data?.detail || "Error al guardar plan",
      { variant: "error" }
    );
  }
});

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
        comidas: '',
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

    if (name === 'edad') {
        const soloNumeros = value.replace(/\D/g, "").slice(0, 2);
        setNutricionData(prev => ({
            ...prev,
            edad: soloNumeros
        }));
        return;
    }

    if (name === 'altura') {
        const soloNumeros = value.replace(/\D/g, "").slice(0, 3);
        setNutricionData(prev => ({
            ...prev,
            altura: soloNumeros
        }));
        return;
    }

    if (name === 'peso') {
    const limpio = value.replace(",", "."); // permitir coma también

    if (/^\d*\.?\d*$/.test(limpio)) {
        setNutricionData(prev => ({
            ...prev,
            peso: limpio
        }));
    }
    return;
    }

    if (name === "enfermedades") {
       let newValue = typeof value === "string" ? value.split(",") : value;

    if (newValue.includes("Ninguna") && newValue.length > 1) {
    newValue = ["Ninguna"];
    }

  setNutricionData(prev => ({
    ...prev,
    enfermedades: newValue
  }));
  return;
}

   if (name === "comidas") {
        const numero = Number(value);

        setNutricionData(prev => ({
            ...prev,
            comidas: numero
        }));

        setMensajeComidas(mensajes[numero] || "");
        return;
    }

    setNutricionData(prev => ({
        ...prev,
        [name]: value
    }));
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
            enqueueSnackbar("Por favor, complete todos los campos del formulario", { variant: "warning" });
            return;
        }
        const altura = parseInt(nutricionData.altura, 10);
        const edad = parseInt(nutricionData.edad, 10);
        const peso = parseFloat(nutricionData.peso);

    if (altura < 120 || altura > 230) {
        enqueueSnackbar("Ingresa una altura válida (120 - 230 cm)", { variant: "warning" });
        return;
    }

    if (edad < 12 || edad > 99) {
        enqueueSnackbar("Ingresa una edad válida (12 - 99 años)", { variant: "warning" });
        return;
    }

    if (isNaN(peso) || peso < 30 || peso > 300) {
    enqueueSnackbar("Ingresa un peso válido (30 - 300 kg)", { variant: "warning" });
    return;
    }


        setStep(2);
    };

    const hndlTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

const hndlGeneratePlan = () => {
  const { usuarioAsignado, alergias, ...restoData } = nutricionData;

  const usuarioIdAsignado = selfMode
    ? currentUser?.id
    : usuarioAsignado?.id;

  if (!usuarioIdAsignado) {
    alert("Usuario inválido");
    return;
  }

  const alergiasList =
    alergias && alergias.trim() !== ""
      ? alergias.split(",").map(a => a.trim())
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

  generateMutation.mutate(finalPayload);
};

    
const hndlSavePlan = () => {
  if (!planData || (!nutricionData.usuarioAsignado && !selfMode)) {
    alert("No hay un plan generado para guardar.");
    return;
  }

  const { usuarioAsignado, ...datosLimpios } = nutricionData;

  const usuarioIdFinal = selfMode
    ? currentUser.id
    : usuarioAsignado.id;

  const payload = {
    usuario_id: usuarioIdFinal,
    calorias_diarias: planData.calorias_diarias,
    macronutrientes: planData.macronutrientes,
    opciones_menu: planData.opciones_menu,
    datos_recibidos: {
      ...datosLimpios,
      usuarioIdAsignado: usuarioIdFinal
    }
  };

  saveMutation.mutate(payload);
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
    { value: 3, label: "3 comidas " },
    { value: 4, label: "4 comidas (recomendado)" },
    { value: 5, label: "5 comidas" },
    { value: 6, label: "6 comidas (solo atletas)" }
];

const mensajes = {
    3: "Recomendado para la mayoría de usuarios. Facilita la adherencia.",
    4: "Buena opción si entrenas moderado y tienes disponibilidad de tiempo para cocinar.",
    5: "Recomendado si tu objetivo es hipertrofia y tienes disponibilidad de tiempo para cocinar.",
    6: "6 comidas solo es recomendable si eres atleta"
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
        loading={isLoading}
        onChange={(event, newValue) => {
            setNutricionData(prev => ({ ...prev, usuarioAsignado: newValue }));
        }}
        renderInput={(params) => (
            <TextField
                {...params}
                label="Seleccionar Usuario"
                variant="outlined"
                sx={{ ...estiloTexfield, mb: 2 }}
                InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                        <>
                            {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                        </>
                    ),
                }}
            />
        )}
    />
)}
                        <TextField 
                             name="peso" 
                             label="Peso (kg)" 
                             type="tel" 
                             fullWidth
                             margin="normal"
                             onChange={hndlChange} 
                             value={nutricionData.peso}
                             sx={estiloTexfield} 
                             inputProps={{ inputMode: "decimal" }}
                        />
                        <TextField 
                             name="altura" 
                             label="Altura (cm)" 
                             placeholder="Ej: 160"
                             type="tel" 
                             fullWidth 
                             margin="normal" 
                             onChange={hndlChange} 
                             value={nutricionData.altura} 
                             sx={estiloTexfield} 
                             inputProps={{ maxLength: 3, inputMode: "numeric" }}
                        />
                        <TextField 
                             name="edad" 
                             label="Edad" 
                             type="tel" 
                             placeholder="Ej: 25"
                             fullWidth 
                             margin="normal" 
                             onChange={hndlChange} 
                             value={nutricionData.edad} 
                             sx={estiloTexfield} 
                             inputProps={{ maxLength: 2, inputMode: "numeric" }} 
                        />
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
                        
                        {generateMutation.isPending ? (
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
                                            disabled={saveMutation.isPending}
                                            sx={{ ...estiloTexfield, bgcolor: 'rgb(0, 204, 255)', color: '#fff', '&:hover': { bgcolor: 'rgb(0, 153, 204)' } }}>
                                            {saveMutation.isPending ? <CircularProgress size={24} /> : 'Guardar Plan'}
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
                                            disabled={generateMutation.isPending} 
                                            sx={{ 
                                                bgcolor: 'rgb(0, 204, 255)', 
                                                color: '#fff', 
                                                fontWeight: 'bold', 
                                                '&:hover': { bgcolor: 'rgb(0, 153, 204)' }
                                            }}>
                                            {generateMutation.isPending ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Generar Plan'}
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