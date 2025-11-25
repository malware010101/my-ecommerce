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
    CircularProgress 
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { usersDataState } from '../../hooks/estadoGlobal';
import { v4 as uuidv4 } from 'uuid';

export default function CrearNutricion({ onClose }) {
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
        comidas: 0
    });

    const hndlChange = (e) => {
        const { name, value } = e.target;
        setNutricionData({ ...nutricionData, [name]: value });
        if (name === "comidas") {
    setNutricionData({ ...nutricionData, comidas: Number(value) });
}
    };

    const hndlNextStep = (e) => {
        e.preventDefault();

        if (!nutricionData.usuarioAsignado ||
            !nutricionData.peso ||
            !nutricionData.altura ||
            !nutricionData.edad ||
            !nutricionData.genero ||
            !nutricionData.nivelActividad ||
            !nutricionData.comidas ||
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

        if (!usuarioAsignado || !usuarioAsignado.id) {
            throw new Error('No se ha seleccionado un usuario válido para asignar el plan.');
        }

        const usuarioIdAsignado = usuarioAsignado.id;

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
            const errorData = await response.json();
            console.error("Detalle del error de la API:", errorData.detail);
            throw new Error(errorData.detail || 'Error al enviar los datos a la API');
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
    
    const enfermedadesOpciones = ['Ninguna', 'Diabetes', 'Hipertensión', 'Sobre Peso'];
    const tipoDietaOpciones = ['Normal', 'Vegetariana', 'Vegana'];
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
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                            <Button type="submit" variant="contained" endIcon={<ExpandMoreIcon />} sx={{ mt: 2, bgcolor: 'rgb(0, 204, 255)', color: '#fff', fontWeight: 'bold', borderRadius: '10px', '&:hover': { bgcolor: 'rgb(0, 153, 204)' } }}>
                                Siguiente
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{ bgcolor: '#000', p: 2 }}>
                        {/* Se agregó el bloque de carga aquí */}
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
                                    <Typography variant="h5" color="#fff" textAlign="center" mb={2} fontWeight="bold">
                                        Plan Nutricional
                                    </Typography>
                                    <Grid container spacing={2} sx={{ mb: 4, textAlign: 'center' }}>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Box sx={{ p: 2, bgcolor: '#17343d', borderRadius: '8px', border: '1px solid rgb(0, 204, 255)', boxShadow: '0px 0px 10px rgba(0, 204, 255, 0.5)' }}>
                                                <Typography color="#bbb" variant="body2">Calorías Totales</Typography>
                                                <Typography color="#fff" variant="h6">{planData.calorias_diarias} kcal</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Box sx={{ p: 2, bgcolor: '#17343d', borderRadius: '8px', border: '1px solid rgb(0, 204, 255)', boxShadow: '0px 0px 10px rgba(0, 204, 255, 0.5)' }}>
                                                <Typography color="#bbb" variant="body2">Proteína</Typography>
                                                <Typography color="#fff" variant="h6">{planData.macronutrientes.proteinas} g</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Box sx={{ p: 2, bgcolor: '#17343d', borderRadius: '8px', border: '1px solid rgb(0, 204, 255)', boxShadow: '0px 0px 10px rgba(0, 204, 255, 0.5)' }}>
                                                <Typography color="#bbb" variant="body2">Carbohidratos</Typography>
                                                <Typography color="#fff" variant="h6">{planData.macronutrientes.carbohidratos} g</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Box sx={{ p: 2, bgcolor: '#17343d', borderRadius: '8px', border: '1px solid rgb(0, 204, 255)', boxShadow: '0px 0px 10px rgba(0, 204, 255, 0.5)' }}>
                                                <Typography color="#bbb" variant="body2">Grasas</Typography>
                                                <Typography color="#fff" variant="h6">{planData.macronutrientes.grasas} g</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs 
                                            value={tabValue} 
                                            onChange={hndlTabChange} 
                                            aria-label="Opciones de Menú" 
                                            centered
                                            TabIndicatorProps={{ style: { backgroundColor: 'rgb(0, 204, 255)' } }}
                                        >
                                            {planData.opciones_menu?.map((opcion, index) => (
                                                <Tab
                                                    key={index} 
                                                    label={`Menú ${opcion.opcion}`}
                                                    sx={{ 
                                                        color: '#fff',
                                                        '&.Mui-selected': {
                                                            color: 'rgb(0, 204, 255)', indicatorColor: 'rgb(0, 204, 255)'
                                                        }
                                                    }} 
                                                />
                                            ))}
                                        </Tabs>
                                    </Box>
                                    {planData.opciones_menu?.map((opcion, index) => (
                                        tabValue === index && (
                                            <Box key={index} sx={{ p: 3, minHeight: '300px' }}>
                                                <Grid container spacing={2}>
                                                    {opcion.menu?.map((comida, comidaIndex) => (
                                                        <Grid item xs={12} sm={6} md={3} key={comidaIndex}>
                                                            <Card sx={{ bgcolor: '#000', border: '1px solid #000', color: '#fff', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 183, 255, 0.7)' }}>
                                                                <CardContent>
                                                                    <Typography variant="h6" color="rgb(0, 204, 255)" fontWeight="bold" gutterBottom>
                                                                        {comida.comida}
                                                                    </Typography>
                                                                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                                                                        {comida.alimentos?.map((alimento, alimentoIndex) => (
                                                                            <li key={alimentoIndex} style={{ color: '#fff' }}>
                                                                                {alimento.nombre} - {alimento.gramos} g
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </CardContent>
                                                            </Card>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </Box>
                                        )
                                    ))}
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 2 }}>
                                        <Button 
                                            onClick={() => setStep(1)} 
                                            variant="contained"
                                            sx={{ ...estiloTexfield, bgcolor: 'rgb(0, 204, 255)', color: '#fff', '&:hover': { bgcolor: 'rgb(0, 153, 204)' } }}>
                                            Volver
                                        </Button>
                                        <Button
                                            onClick={() => alert('Plan guardado!')} 
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