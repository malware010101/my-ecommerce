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
import { useSnackbar } from "notistack";
import { fetchUsuarioReal } from "../UtilsApp/helper";



export default function MiEntrenamiento() {
    const usuarioActual = useRecoilValue(userState);
    const allUsers = useRecoilValue(usersDataState);
    const navigate = useNavigate();
    const [misProgramas, setMisProgramas] = useState([]);
    const [loading, setLoading] = useState(true);


    const {authData, updateUser} = useAuth();
    const usuario = {
            id: authData?.userId,
            nombre: authData?.nombre,
            rol: authData?.rol,
            tiene_anamnesis: authData?.tiene_anamnesis
           };

     
    const [openDlg, setOpenDlg] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    
    const loggedInUser = allUsers.find(user => user.id === usuarioActual.id);



    const hndlFormSubmit = async (formData) => {
    try {
        await api.post("/anamnesis/", formData);

        enqueueSnackbar("Anamnesis guardada correctamente", { variant: "success" });
     
        updateUser({
            tiene_anamnesis: true
        });

        setOpenDlg(false);


    } catch (error) {
        enqueueSnackbar("Error al guardar anamnesis", {variant: "error"});
    }
};

    const hndlCardNavigate = (item) => {
        
        navigate(`/apptraining/entrenamiento/${item.entrenamiento_id}`);
    };
   
 useEffect(() => {
  if (!usuario) return;

  if (usuario?.tiene_anamnesis === false) {
    setOpenDlg(true);
  } else {
    setOpenDlg(false);
  }
}, [authData]);


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
            <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" color="rgb(0, 204, 255)" fontStyle={'italic'} fontWeight="bold">PROGRAMAS ASIGNADOS</Typography>
            </Box>

            {misProgramas?.length === 0 ? (
                <Typography fontSize={12} color="red" fontStyle={'italic'} >No tienes ningun programa asignado, puedes asignarte alguno de nuestros programas generales disponibles en el inicio o esperar a que nuestro coach evalue tu anamnesis y te asigne un programa adecuado.</Typography>
            ) : (
                
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
            )
            }
                
            

            <DlgForm 
            maxWidth="xs"
            fullWidth
            sx={{
        '& .MuiDialog-paper': {
          bgcolor: '#000',
          borderRadius: '16px',
          border: '1px solid rgba(0, 0, 0, 1)',
          boxShadow: '0 4px 10px rgba(0, 204, 255, 0.7)'
        }
      }}
            open={openDlg} 
            onClose={(event, reason) => {
              if (!usuario?.tiene_anamnesis) return; 
                  setOpenDlg(false);
              }}
            disableEscapeKeyDown={!usuario?.tiene_anamnesis}
            title={'Anamnesis'}
            >
            <Typography fontSize={11} color="red" mb={2}>
            *Es necesario responder esta breve anamnesis para conocer tu historial clínico y deportivo y así poder asignarte un programa adecuado.
            <br />
            Es importante no omitir ninguna pregunta y responder con sinceridad. En <strong>"información adicional" </strong> puedes detallar lesiones, operaciones, restricciones médicas, etc.
        </Typography>

        <WorkoutForm
        key={openDlg ? "open" : "closed"}
        onFormSubmit={hndlFormSubmit} />
        </DlgForm>

        </Container>
    );
}