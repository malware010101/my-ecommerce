import { Box, Button, Container, Typography } from "@mui/material";
import { useState } from "react";
import DlgForm from "../../components/DlgForm";
import WorkoutForm from "../Workout/WorkoutForm";
import { useRecoilValue } from 'recoil';
import { userState, usersDataState } from '../hooks/estadoGlobal';
import { useNavigate } from 'react-router-dom';
import ProgramCard from '../ProgramCard'; 

export default function MiEntrenamiento() {
    const [openDlg, setOpenDlg]= useState(false);
    const usuarioActual = useRecoilValue(userState);
    const allUsers = useRecoilValue(usersDataState);
    const navigate = useNavigate();

    const loggedInUser = allUsers.find(user => user.id === usuarioActual.id);
    const programasDelUsuario = loggedInUser?.programasAsignados || [];

    const hndlOpenDlg = () => {
        setOpenDlg(true);
    };

    const hndlCloseDlg = () => {
        setOpenDlg(false);
    };

    const hndlFormSubmit = (formData) => {
        console.log('Respuestas Enviadas con exito', formData);
        hndlCloseDlg();
    };

    const hndlCardNavigate = (programa) => {
        navigate(`/apptraining/entrenamiento/${programa.id}`);
    };
    
    const workoutFormContent = <WorkoutForm onFormSubmit={hndlFormSubmit} />;

    return (
        <Container maxWidth="lg">
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                mt: 3,
                p: 2
            }}>
                <Typography variant="h4" fontWeight={'bold'} color={'#ccc'} textAlign={'center'}>
                    ¡Bienvenido a tu entrenamiento!
                </Typography>
            </Box>

            {programasDelUsuario.length === 0 ? (
                <Box sx={{ display: 'column', justifyContent: 'center', alignItems: 'center', mt: 3, borderRadius: '10px ', border: '1px solid #2a2f33', bgcolor: '#000', p: 1, boxShadow: '0 4px 10px rgba(0, 183, 255, 0.7)' }}>
                    <Typography variant="h6" color={'#fff'} textAlign={'left'} padding={'10px'}>
                        Para dirigirte a tu plan de entrenamiento, es necesario que respondas el siguiente formulario para conocer tu actividad física y dirigirte al plan adecuado.
                    </Typography>
                    <Button
                        onClick={hndlOpenDlg}
                        variant="contained"
                        sx={{ mt: 2, ml: 1, bgcolor: 'rgb(0, 204, 255)', color: '#fff', fontWeight: 'bold', borderRadius: '10px', mb: 2, '&:hover': { bgcolor: 'rgb(0, 153, 204)' } }}
                    >
                        Responder
                    </Button>
                </Box>
            ) : (
                // Si el usuario SÍ tiene programas, muéstralos en una lista horizontal
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" color="#ccc" fontWeight="bold">Tus Programas Asignados</Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            overflowX: 'auto',
                            gap: 2,
                            mt: 2,
                            '&::-webkit-scrollbar': {
                                display: 'none',
                            }
                        }}
                    >
                        {programasDelUsuario.map(programa => (
                            <ProgramCard 
                                key={programa.id}
                                programa={programa}
                                onCardClick={hndlCardNavigate} // <-- Aquí pasamos la nueva función para navegar
                            />
                        ))}
                    </Box>
                </Box>
            )}

            <DlgForm open={openDlg} onClose={hndlCloseDlg} title={'Anamnesis'} content={workoutFormContent} />
        </Container>
    );
}