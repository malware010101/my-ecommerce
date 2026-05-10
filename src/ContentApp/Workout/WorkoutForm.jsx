import React, { useState } from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Button, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useSnackbar } from 'notistack';
import CircularProgress from '@mui/material/CircularProgress';



export default function WorkoutForm({ onFormSubmit }) {

    const [ loading, setLoading ] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [anamnesis, setAnamnesis] = useState({
        edad: '',
        genero: '',
        objetivo: '',
        experiencia: '',
        frecuencia:'',
        tieneEnfermedad: '',
        enfermedad: '',
        tieneLesion: '',
        lesion: '',
        comentarios: '',
    });


    const hndlChange = (e) => {
        const { name, value } = e.target;
        if (name === "tieneEnfermedad" && value === "no") {
            setAnamnesis({
                ...anamnesis,
                tieneEnfermedad: value,
                enfermedad: ""
             });
        return;
         }

        if (name === "tieneLesion" && value === "no") {
            setAnamnesis({
                ...anamnesis,
                tieneLesion: value,
                lesion: ""
            });
        return;
       }
        setAnamnesis({
            ...anamnesis,
            [name]: value,
        });
    };

    const hndlSubmit = async (e) => {
        e.preventDefault();
        if (!formValido) return;

        if (edadValida < 12 || edadValida > 90) {
          enqueueSnackbar('Edad inválida', { variant: 'error' });
    return;
}
        setLoading(true);

        try {
        const dataLimpia = {
            ...anamnesis,
            edad: Number(anamnesis.edad),
            frecuencia: Number(anamnesis.frecuencia)
        };

        await onFormSubmit(dataLimpia);

    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
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

    const edadValida = Number(anamnesis.edad);

    const formValido =
    edadValida >= 12 &&
    edadValida <= 90 &&
    !isNaN(edadValida) &&
    anamnesis.genero &&
    anamnesis.objetivo &&
    anamnesis.experiencia &&
    anamnesis.frecuencia &&
    anamnesis.tieneEnfermedad &&
    anamnesis.tieneLesion &&
    anamnesis.comentarios &&
    (anamnesis.tieneEnfermedad === "no" || anamnesis.enfermedad) &&
    (anamnesis.tieneLesion === "no" || anamnesis.lesion);

    return (
        <Box 
        component="form" 
        onSubmit={hndlSubmit} 
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                type = "text"
                name="edad"
                label="Edad"
                placeholder="Ej: 25"
                value={anamnesis.edad}
                onChange={hndlChange}
                required
                sx={estiloTexfield}
                inputProps={{
        inputMode: "numeric",
        pattern: "[0-9]*",
        maxLength: 2,
        min : 12,
        max : 90
    }}

            />
            <FormControl
             fullWidth
             sx = {estiloTexfield}
             >
                <InputLabel>Genero </InputLabel>
                <Select
                    name="genero"
                    value={anamnesis.genero}
                    label="genero"
                    onChange={hndlChange}
                    required
                >
                    <MenuItem value="masculino">Masculino</MenuItem>
                    <MenuItem value="femenino">Femenino</MenuItem>
                </Select>
            </FormControl>

           <FormControl
           fullWidth
           sx= {estiloTexfield}
           >
                <InputLabel>Objetivo </InputLabel>
                <Select
                    name="objetivo"
                    value={anamnesis.objetivo}
                    label="objetivo"
                    onChange={hndlChange}
                    required
                >
                    <MenuItem value="aumentar masa muscular">Aumentar masa muscular</MenuItem>
                    <MenuItem value="perdida grasa">Perder grasa</MenuItem>
                    <MenuItem value="salud">Salud</MenuItem>
                </Select>
            </FormControl>

            <FormControl 
            fullWidth
            sx= {estiloTexfield}
            >
                <InputLabel>Nivel de experiencia</InputLabel>
                <Select
                    name="experiencia"
                    value={anamnesis.experiencia}
                    label="experiencia"
                    onChange={hndlChange}
                    required
                >
                    <MenuItem value="principiante">Principiante (0 a 6 meses)</MenuItem>
                    <MenuItem value="intermedio">Intermedio (6 a 12 meses)</MenuItem>
                    <MenuItem value="avanzado">Avanzado (+ 12 meses )</MenuItem>
                </Select>
            </FormControl>
            
             <FormControl 
            sx= {estiloTexfield}
            >
                <Typography color= '#888'>
                    ¿Cuantos dias entrenas a la semana?
                    </Typography>
                <RadioGroup
                    name="frecuencia"
                    value={anamnesis.frecuencia}
                    onChange={hndlChange}
                    row
                    required

                >
                    <FormControlLabel 
                    value="3" 
                    control={<Radio 
                        sx= {{ color: '#00B3FF',
                         '&.Mui-checked': {
                            color: '#00B3FF',
                         }
                         }}
                    />} 
                    label="3" 
                    />
                    <FormControlLabel 
                    value="4" 
                    control={<Radio
                        sx= {{ color: '#00B3FF',
                         '&.Mui-checked': {
                            color: '#00B3FF',
                         }
                         }}
                        />} 
                    label="4" />
                     <FormControlLabel 
                    value="5" 
                    control={<Radio
                        sx= {{ color: '#00B3FF',
                         '&.Mui-checked': {
                            color: '#00B3FF',
                         }
                         }}
                        />} 
                    label="5" />
                     <FormControlLabel 
                    value="6" 
                    control={<Radio
                        sx= {{ color: '#00B3FF',
                         '&.Mui-checked': {
                            color: '#00B3FF',
                         }
                         }}
                        />} 
                    label="6" />
                </RadioGroup>
            </FormControl>

            <FormControl 
            sx= {estiloTexfield}
            >
                <Typography color= '#888'>
                    ¿Tienes alguna enfermedad?
                    </Typography>
                <RadioGroup
                    name="tieneEnfermedad"
                    value={anamnesis.tieneEnfermedad}
                    onChange={hndlChange}
                    row
                    required

                >
                    <FormControlLabel 
                    value="si" 
                    control={<Radio 
                        sx= {{ color: '#00B3FF',
                         '&.Mui-checked': {
                            color: '#00B3FF',
                         }
                         }}
                    />} 
                    label="Si" 
                    />
                    <FormControlLabel 
                    value="no" 
                    control={<Radio
                        sx= {{ color: '#00B3FF',
                         '&.Mui-checked': {
                            color: '#00B3FF',
                         }
                         }}
                        />} 
                    label="No" />
                </RadioGroup>
            </FormControl>

            {anamnesis.tieneEnfermedad === 'si' && (
                <TextField
                    name="enfermedad"
                    label="Especifique la enfermedad"
                    value={anamnesis.enfermedad}
                    onChange={hndlChange}
                    sx= {estiloTexfield}
                    multiline
                    rows={2}
                    required
                />
            )}

            <FormControl 
            sx= {estiloTexfield}
            >
                <Typography color= '#888'>
                    ¿Tienes alguna lesion?
                    </Typography>
                <RadioGroup
                    name="tieneLesion"
                    value={anamnesis.tieneLesion}
                    onChange={hndlChange}
                    row
                    required
                >
                    <FormControlLabel 
                    value="si" 
                    control={<Radio
                        sx= {{ color: '#00B3FF',
                         '&.Mui-checked': {
                            color: '#00B3FF',
                         }
                         }}
                        />} 
                    label="Si" 
                    />
                    <FormControlLabel 
                    value="no" 
                    control={<Radio
                         sx= {{ color: '#00B3FF',
                         '&.Mui-checked': {
                            color: '#00B3FF',
                         }
                         }}
                        />} 
                    label="No" />
                </RadioGroup>
            </FormControl>
            {anamnesis.tieneLesion === 'si' && (
                <TextField
                    name="lesion"
                    label="Especifique la lesion"
                    value={anamnesis.lesion}
                    onChange={hndlChange}
                    sx= {estiloTexfield}
                    multiline
                    rows={2}
                    required
                />
            )}
            
            <TextField
                name="comentarios"
                label="Informacion adicional..."
                multiline
                rows={4}
                value={anamnesis.comentarios}
                onChange={hndlChange}
                sx= {estiloTexfield}
                required
            />

            

            <Button 
            type="submit"
             variant="contained" 
             disabled= {!formValido || loading}
             sx={{ 
                mt: 2, 
                fontWeight: 'bold', 
                borderRadius: '20px',
                bgcolor: '#00B3FF',
                '&:hover': { 
                    bgcolor: '#01a5ebff '
                     },
                '&.Mui-disabled': {
                        bgcolor: '#2a2a2a',
                        color: '#666'
                         }
                     }}>
                {loading ? "Cargando..." : "Enviar"}

            </Button>
        </Box>
    );
}