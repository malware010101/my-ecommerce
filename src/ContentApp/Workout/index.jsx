import { Box, Button, Container, Divider, Typography } from "@mui/material";
import {  useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import CrearPrograma from "./CrearPrograma";
import AsignarEntrenamiento from "./CrearNutricion";
import CrearPersonalizado from "./CrearPersonalizado";

export default function Workout () {
    const [ activarComponente, setActivarComponente] = useState(null)

    const hndlBtnActivado = (componente) => {
        setActivarComponente (prev => prev === componente ? null : componente)
    }
    const hndlCloseCrearPrograma = () => {
        setActivarComponente(null)
    }

    const componentsMap = {
        CrearPrograma: <CrearPrograma onClose={hndlCloseCrearPrograma} />,
        CrearEntrenamiento: <CrearPersonalizado onClose={hndlCloseCrearPrograma} />,
        AsignarEntrenamiento: <AsignarEntrenamiento />,
    };

    return (
       <Container maxWidth="lg">
         <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                     mt: 3,
                     p: 2
                   }}>
                       <Typography  variant="h5" fontWeight={'bold'} color= {'#fff'} textAlign={'center'} >
                            ¡Bienvenido a la creacion de programas!
                        </Typography> 
                   </Box>

                   <Divider light sx={{ mb: 5 }} />
                   
                   <Box sx={{ display: 'column', justifyContent: 'center', alignItems: 'center', mt: 3, borderRadius: '10px ', border: '1px solid #2a2f33',bgcolor: '#000', p: 1, boxShadow: '0 4px 10px rgba(0, 183, 255, 0.7)'
                   }}>
                       <Typography fontSize={{ xs: '12px' ,md: '14px'}}  color= {'#ccc'} textAlign={'left'} padding={'10px'}  > Aqui es donde surgirá la magia para crear nuevos programas de entrenamientos para todos los usuarios, desde generales, hasta personalizados para los usuarios de suscripcion <strong>PRO</strong>. <br></br> Esta seccion es exculsivamente para los entrenadores de <strong>REPS</strong></Typography>
                       
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
                    borderRadius: '20px',
                    fontSize: { xs: '9px', md: '14px' },
                    borderColor: 'rgb(0, 204, 255)',
                    '&:hover': { bgcolor: 'rgb(0, 153, 204)', borderColor: 'rgb(0, 153, 204)', color: '#fff' },
                    color: activarComponente === 'CrearPrograma' ? '#fff' : 'rgb(0, 204, 255)',
                    bgcolor: activarComponente === 'CrearPrograma' ? 'rgb(0, 204, 255)' : 'transparent',
                    '&:hover': {
                        color: '#fff',
                        bgcolor: 'rgb(0, 204, 255)',
                        borderColor: 'rgb(0, 204, 255)'
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
                        borderRadius: '20px',
                        fontSize: { xs: '9px', md: '14px' },
                        borderColor: 'rgb(0, 204, 255)',
                        color: activarComponente === 'CrearEntrenamiento' ? '#fff' : 'rgb(0, 204, 255)',
                        bgcolor: activarComponente === 'CrearEntrenamiento' ? 'rgb(0, 204, 255)' : 'transparent',
                        '&:hover': {
                            color: '#fff',
                            bgcolor: 'rgb(0, 204, 255)',
                            borderColor: 'rgb(0, 204, 255)'
                        }
                    }}>
                        Crear Personalizado
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
                        borderRadius: '20px',
                        fontSize: { xs: '9px', md: '14px' },
                        borderColor: 'rgb(0, 204, 255)',
                        color: activarComponente === 'AsignarEntrenamiento' ? '#fff' : 'rgb(0, 204, 255)',
                        bgcolor: activarComponente === 'AsignarEntrenamiento' ? 'rgb(0, 204, 255)' : 'transparent',
                        '&:hover': {
                            color: '#fff',
                            bgcolor: 'rgb(0, 204, 255)',
                            borderColor: 'rgb(0, 204, 255)'
                        }
                    }}>
                        Crear Nutricion
                    </Button>
                   </Box>
                   <Box sx={{ mt: 3, p: 2 }}>
                    {componentsMap[activarComponente] || null}
                   </Box>
               </Container>
    )
}