import { Box, Button, Container, Typography,Divider } from "@mui/material";
import { useState, useEffect } from "react";
import DlgForm from "../../components/DlgForm";
import WorkoutForm from "../Workout/WorkoutForm";
import { useRecoilValue } from 'recoil';
import { userState, usersDataState } from '../hooks/estadoGlobal';
import { useNavigate } from 'react-router-dom';
import ProgramCard from '../ProgramCard'; 
import api from "../../api";
import { useAuth } from "../AuthContext";

export default function MiEntrenamiento() {
    const [openDlg, setOpenDlg]= useState(false);
    const usuarioActual = useRecoilValue(userState);
    const allUsers = useRecoilValue(usersDataState);
    const navigate = useNavigate();
    const [misProgramas, setMisProgramas] = useState([]);
    const [loading, setLoading] = useState(true);

    const {obtenerUsuarioActual} = useAuth();
    const usuario= obtenerUsuarioActual();

    const loggedInUser = allUsers.find(user => user.id === usuarioActual.id);

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

    const hndlCardNavigate = (item) => {
        console.log("ITEM:", item);
        navigate(`/apptraining/entrenamiento/${item.entrenamiento_id}`);
    };
    
    const workoutFormContent = <WorkoutForm onFormSubmit={hndlFormSubmit} />;

    useEffect(() => {
    const fetchMisProgramas = async () => {
        try {
            const res = await api.get("/entrenamiento/programas/mis-programas");
            setMisProgramas(res.data);
        } catch (error) {
            console.error("Error cargando programas", error);
        } finally {
            setLoading(false);
        }
    };

    fetchMisProgramas();
}, []);

if (loading) {
    return (
        <Container maxWidth="lg">
            <Typography color="#ccc">Cargando entrenamiento...</Typography>
        </Container>
    );
}
    return (
        <Container maxWidth="lg">
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                mt: 0,
                p: 0
            }}>
                <Typography variant="h5" fontWeight={'bold'} color={'#bbb'}  textAlign={'center'}>
                    ¡Hola, {usuario?.nombre?.toUpperCase()}! <br />  Bienvenido a tu entrenamiento
                </Typography>
            </Box>
            <Divider sx={{ mt: 2, mb: 3 }} />

            {misProgramas.length === 0 ? (
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
                
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" color="rgb(0, 204, 255)" fontStyle={'italic'} fontWeight="bold">PROGRAMAS ASIGNADOS</Typography>
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
                        {misProgramas?.map((item) => (
                            <ProgramCard 
                                key={item.entrenamiento_id}
                                programa={item.programa}
                                onCardClick= {() => hndlCardNavigate(item)} // <-- Aquí pasamos la nueva función para navegar
                            />
                        ))}
                    </Box>
                </Box>
            )}

            <DlgForm open={openDlg} onClose={hndlCloseDlg} title={'Anamnesis'} content={workoutFormContent} />
        </Container>
    );
}