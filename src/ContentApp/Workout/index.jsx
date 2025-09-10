import { Box, Button, Container, Typography } from "@mui/material";
import DlgForm from "../../components/DlgForm";
import {  useState } from "react";
import WorkoutForm from "./WorkoutForm";
import AddIcon from '@mui/icons-material/Add';
import CrearPrograma from "./CrearPrograma";
import CrearEntrenamiento from "./CrearEntrenamiento";
import AsignarEntrenamiento from "./AsignarEntrenamiento";

export default function Workout () {
    const [openDlg, setOpenDlg]= useState(false)
    const [ activarComponente, setActivarComponente] = useState(null)

    const hndlBtnActivado = (componente) => {
        setActivarComponente (prev => prev === componente ? null : componente)
    }

    const componentsMap = {
        CrearPrograma: <CrearPrograma />,
        CrearEntrenamiento: <CrearEntrenamiento />,
        AsignarEntrenamiento: <AsignarEntrenamiento />,
    };

    const hndlOpenDlg = () => {
        setOpenDlg(true)
    }
    const hndlCloseDlg = () => {
        setOpenDlg(false)
    }

    const hndlFormSubmit = (formData) => {
        console.log('Respuestas Enviadas con exito', formData)
        hndlCloseDlg()
    }

    const workoutFormContent = <WorkoutForm onFormSubmit={hndlFormSubmit} />
    return (
       <Container maxWidth="lg">
                   <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3, p: 2
                   }}>
                       <Typography variant="h4"  fontWeight={'bold'} color= {'#ccc'} textAlign={'center'} >¡Bienvenido a tu entrenamiento!</Typography>
                   </Box>
                   <Box sx={{ display: 'column', justifyContent: 'center', alignItems: 'center', mt: 3, borderRadius: '10px ', border: '1px solid #2a2f33',bgcolor: '#000', p: 1, boxShadow: '0 4px 10px rgba(0, 183, 255, 0.7)'
                   }}>
                       <Typography variant="h6"  color= {'#fff'} textAlign={'left'} padding={'10px'}  >Para dirigirte a tu plan de entrenamiento , es necesario que respondas el siguiente formulario para conocer tu actividad fisica y dirigirte al plan adecuado.<br></br> 
                       Cada programa de entrenamiento se a desarrollado a base de evidencia cientifica, años de estudio y experiencia para lograr una mejor calidad de vida y mejorar tu bienestar.<br></br>
                       Es Importante responder con obsoluta sinceridad el cuestionario.</Typography>
                       <Button
                        onClick={hndlOpenDlg}
                        variant="contained"
                         sx={{ mt: 2,ml: 1,bgcolor: 'rgb(0, 204, 255)', color: '#fff', fontWeight: 'bold',borderRadius: '10px',mb: 2 }}>
                            Responder
                            </Button>
                   </Box>
                   <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3, borderRadius: '10px ',bgcolor: '#000', p: 1 }}>
                   <Button 
                   onClick = {() => hndlBtnActivado('CrearPrograma')}
                   variant="outlined"
                   startIcon={<AddIcon />}
                   sx={{
                    mt: 2,
                    ml: 1,
                    mb: 2,
                    fontWeight: 'bold',
                    borderRadius: '10px',
                    borderColor: 'rgb(0, 204, 255)',
                    // ➡️ ESTILOS CONDICIONALES
                    color: activarComponente === 'CrearPrograma' ? '#fff' : 'rgb(0, 204, 255)',
                    bgcolor: activarComponente === 'CrearPrograma' ? 'rgb(0, 204, 255)' : 'transparent',
                    '&:hover': {
                        color: '#fff',
                        bgcolor: 'rgb(0, 204, 255)'
                    }
                }}>
                   Crear Programa
                   </Button>
                    <Button
                     onClick = {() => hndlBtnActivado('CrearEntrenamiento')}
                     variant="outlined"
                     startIcon={<AddIcon />}
                     sx={{
                        mt: 2,
                        ml: 1,
                        mb: 2,
                        fontWeight: 'bold',
                        borderRadius: '10px',
                        borderColor: 'rgb(0, 204, 255)',
                        color: activarComponente === 'CrearEntrenamiento' ? '#fff' : 'rgb(0, 204, 255)',
                        bgcolor: activarComponente === 'CrearEntrenamiento' ? 'rgb(0, 204, 255)' : 'transparent',
                        '&:hover': {
                            color: '#fff',
                            bgcolor: 'rgb(0, 204, 255)'
                        }
                    }}>
                        Crear Entrenamiento
                    </Button>
                    <Button
                     variant="outlined" 
                     onClick = {() => hndlBtnActivado('AsignarEntrenamiento')}
                    startIcon={<AddIcon />}
                    sx={{
                        mt: 2,
                        ml: 1,
                        mb: 2,
                        fontWeight: 'bold',
                        borderRadius: '10px',
                        borderColor: 'rgb(0, 204, 255)',
                        color: activarComponente === 'AsignarEntrenamiento' ? '#fff' : 'rgb(0, 204, 255)',
                        bgcolor: activarComponente === 'AsignarEntrenamiento' ? 'rgb(0, 204, 255)' : 'transparent',
                        '&:hover': {
                            color: '#fff',
                            bgcolor: 'rgb(0, 204, 255)',
                        }
                    }}>
                        Asignar Entrenamiento
                    </Button>
                   </Box>
                   <Box sx={{ mt: 3, p: 2 }}>
                    {componentsMap[activarComponente] || null}
                   </Box>
                   <DlgForm open={openDlg} onClose={hndlCloseDlg} title={'Anamnesis'} content={workoutFormContent}  />
               </Container>
    )
}