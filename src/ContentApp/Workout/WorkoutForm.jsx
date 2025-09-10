import React, { useState } from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Button, Typography } from '@mui/material';
import { Form } from 'react-router-dom';

export default function WorkoutForm({ onFormSubmit }) {
    const [preguntas, setPreguntas] = useState({
        pregunta1: '',
        pregunta2: '',
        pregunta3: '',
        pregunta4: '',
        pregunta5: '',
        pregunta6: '',
    });

    const hndlChange = (e) => {
        const { name, value } = e.target;
        setPreguntas({
            ...preguntas,
            [name]: value,
        });
    };

    const hndlSubmit = (e) => {
        e.preventDefault();
        onFormSubmit(preguntas); // Llama a la función del padre y pasa las respuestas
    };

    return (
        <Box component="form" onSubmit={hndlSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth >
                <InputLabel>Rango de Edad</InputLabel>
                <Select
                    name="pregunta1"
                    value={preguntas.pregunta1}
                    label="Edad"
                    onChange={hndlChange}
                >
                    <MenuItem value="18-60"> 18 - 60</MenuItem>
                    <MenuItem value="+60"> +60</MenuItem>
                    </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel>Genero </InputLabel>
                <Select
                    name="pregunta2"
                    value={preguntas.pregunta2}
                    label="genero"
                    onChange={hndlChange}
                >
                    <MenuItem value="masculino">Masculino</MenuItem>
                    <MenuItem value="femenino">Femenino</MenuItem>
                </Select>
            </FormControl>

           <FormControl fullWidth>
                <InputLabel>Objetivo </InputLabel>
                <Select
                    name="pregunta3"
                    value={preguntas.pregunta3}
                    label="objetivo"
                    onChange={hndlChange}
                >
                    <MenuItem value="Aumentar masa muscular">Aumentar masa muscular</MenuItem>
                    <MenuItem value="Bajar de porcentaje de grasa">Bajar de porcentaje de grasa</MenuItem>
                    <MenuItem value="salud">Salud</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel>Nivel de experiencia</InputLabel>
                <Select
                    name="pregunta4"
                    value={preguntas.pregunta4}
                    label="Nivel de experiencia"
                    onChange={hndlChange}
                >
                    <MenuItem value="principiante">Principiante</MenuItem>
                    <MenuItem value="intermedio">Intermedio</MenuItem>
                    <MenuItem value="avanzado">Avanzado</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel>Enfermedad </InputLabel>
                <Select
                    name="pregunta5"
                    value={preguntas.pregunta5}
                    label="enfermedad"
                    onChange={hndlChange}
                >
                    <MenuItem value="ninguna">Ninguna</MenuItem>
                    <MenuItem value="diabetes">Diabetes</MenuItem>
                    <MenuItem value="hipertension">Hipertension</MenuItem>
                    <MenuItem value="osteoporosis">Osteoporosis</MenuItem>
                    <MenuItem value="artritis">Artritis</MenuItem>
                    <MenuItem value="otra">Otra</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel>Lesiones </InputLabel>
                <Select
                    name="pregunta6"
                    value={preguntas.pregunta6}
                    label="lesiones"
                    onChange={hndlChange}
                >
                    <MenuItem value="ninguna">Ninguna</MenuItem>
                    <MenuItem value="lumbar">Lumbar</MenuItem>
                    <MenuItem value="rodilla">Rodilla</MenuItem>
                    <MenuItem value="otra">Otra</MenuItem>
                </Select>
            </FormControl>

            

            <Button type="submit" variant="contained" sx={{ mt: 2, bgcolor: 'rgb(0, 179, 255)' }}>
                Enviar
            </Button>
        </Box>
    );
}