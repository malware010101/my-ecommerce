import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil'; 
import { Container, Typography, Box, Card, CardContent, IconButton, Button } from "@mui/material";
import { programasState } from '../hooks/estadoGlobal';
import { objetivosImagenes } from '../UtilsApp/helper';
import { userState, usersDataState } from '../hooks/estadoGlobal';
import CloseIcon from '@mui/icons-material/Close';
import DlgGnrl from '../../components/DlgGnrl';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ProgramPreview from '../ProgramPreview';
import SearchUsersForm from '../SearchUsersForm';

const ProgramCard = ({ programa, onOpenDeleteDialog, onOpenPreviewDialog, onOpenAsignacionDlg, onOpenAñadirDlg }) => {
    const usuario = useRecoilValue(userState);
    const bgImage = objetivosImagenes[programa.objetivo];


   const hndlCardClick = () => {
       if (usuario.rol === 'admin' || usuario.rol === 'coach') {
           onOpenAsignacionDlg(programa);
       } else if (usuario.rol === 'usuario') {
        onOpenAñadirDlg(programa);
       }
   }

    return (
        <Card
        onClick={hndlCardClick}
        sx={{
            minWidth: 250,
            borderRadius: '10px',
            border: '1px solid rgb(0, 204, 255)',
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            cursor: 'pointer',
            color: '#fff',
            boxShadow: '0 4px 10px rgba(0, 183, 255, 0.7)',
            position: 'relative',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                bgcolor: 'rgba(0, 0, 0, 0.5)', 
                borderRadius: 'inherit',
            }
        }}
        >
            <CardContent>
            <Box sx={{ position: 'absolute', top: 5, right: 5, zIndex: 1 }}>
                    <IconButton 
                        size="small" 
                        sx={{ color: '#fff' }} 
                        onClick={(e) => { e.stopPropagation(); onOpenPreviewDialog(programa)}}
                    >
                        <VisibilityIcon />
                    </IconButton>
                    
                    {usuario.rol === 'admin' && (
                        <IconButton 
                            size="small" 
                            sx={{ color: '#fff', ml: 1 }} 
                            onClick={(e) => { e.stopPropagation(); onOpenDeleteDialog(programa)}}
                        >
                            <CloseIcon />
                        </IconButton>
                    )}
                </Box>
                <Typography variant="body1" fontWeight="bold">
                    {programa.nombre}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 14 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: '20px', border: '1px solid #333',p: 0.5, bgcolor: 'rgb(0, 204, 255)' }}>
                            <Typography variant="body2" color="#fff" sx={{ mr: 1,  }}>
                            {programa.categoria}
                            </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: '20px', border: '1px solid #333',p: 0.5, bgcolor: 'rgb(0, 204, 255)' }}>
                            <Typography variant="body2" color="#fff" sx={{ mr: 1,  }}>
                              Nivel: {programa.nivel}
                            </Typography>
                            </Box>
                            </Box>
                
            </CardContent>
        </Card>
    );
};

export default function HomeApp() {
    const [programas, setProgramas] = useRecoilState(programasState);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [programaToDelete, setProgramaToDelete] = useState(null);
    const [openPreviewDialog, setOpenPreviewDialog] = useState(false);
    const [programaToPreview, setProgramaToPreview] = useState(null);
    const [ openAsignacionDlg, setOpenAsignacionDlg ] = useState(false);
    const [ programaAsignar, setProgramaAsignar ] = useState(null);
    const [openAñadirDlg, setOpenAñadirDlg] = useState(false);
    const [añadirPrograma, setAñadirPrograma] = useState(null);

    const usuario = useRecoilValue(userState);
    const [ allUsers, setAllUsers ] = useRecoilState(usersDataState);
    console.log("Rol del usuario actual:", usuario.rol);

    


    const hndlOpenAsigancionDlg = (programa) => {
        setProgramaAsignar(programa);
        setOpenAsignacionDlg(true);
    }

    const hndlCloseAsignacionDlg = () => {
        setOpenAsignacionDlg(false);
        setProgramaAsignar(null);
    }

    const hndlConfirmarAsignacion = (selectedUser) => {
        if (selectedUser && programaAsignar) {
            console.log(`Asignando el programa "${programaAsignar.nombre}" a el usuario "${selectedUser.nombre}".`);

            const updatedUsers = allUsers.map(user => {
                if (user.id === selectedUser.id) {
                    return { ...user, programasAsignados: [...user.programasAsignados, programaAsignar] };
                }
                return user;
            });

            setAllUsers(updatedUsers); // <-- Actualiza la lista central de usuarios
            
            hndlCloseAsignacionDlg();
        }
    };

    const hndlOpenAñadirDlg = (programa) => {
        setAñadirPrograma(programa);
        setOpenAñadirDlg(true);
    }

    const hndlCloseAñadirDlg = () => {
        setOpenAñadirDlg(false);
        setAñadirPrograma(null);
    }

    const hndlConfirmarAñadir = () => {
        if (añadirPrograma) {
            console.log(`Haz agregado el programa: ${añadirPrograma.nombre}, con exito!`);
            hndlCloseAñadirDlg();
        }
    }

    const hndlOpenPreviewDialog = (programa) => {
        console.log(`[HomeApp] hndlOpenPreviewDialog: programa=${programa ? programa.nombre : 'null'}`);
        setProgramaToPreview(programa);
        setOpenPreviewDialog(true);
    };
    
    const hndlClosePreviewDialog = () => {
        console.log(`[HomeApp] hndlClosePreviewDialog`);
        setOpenPreviewDialog(false);
        setProgramaToPreview(null);
    };

    const hndlOpenDeleteDialog = (programa) => {
        console.log(`[HomeApp] hndlOpenDeleteDialog: programa=${programa ? programa.nombre : 'null'}`);
        setProgramaToDelete(programa);
        setOpenDeleteDialog(true);
    };

    const hndlCloseDeleteDialog = () => {
        console.log(`[HomeApp] hndlCloseDeleteDialog`);
        setOpenDeleteDialog(false);
        setProgramaToDelete(null); 
    };

    const hndlConfirmDelete = () => {
        if (programaToDelete) {
            console.log(`[HomeApp] hndlConfirmDelete: Haz eliminado el programa: ${programaToDelete.nombre}, con exito!`);
            const nuevosProgramas = programas.filter(p => p.nombre !== programaToDelete.nombre);
            setProgramas(nuevosProgramas);
            setProgramaToDelete(null);
            hndlCloseDeleteDialog();
        }
    };

    const programasPorObjetivo = programas.reduce((acc, programa) => {
        if (!acc[programa.objetivo]) {
            acc[programa.objetivo] = [];
        }
        acc[programa.objetivo].push(programa);
        return acc;
    }, {});

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" color="#fff" mb={4} mt={2} textAlign="center" fontWeight="bold">¡Bienvenido a REPS!</Typography>
            <Box sx={{ display: 'column', justifyContent: 'center', alignItems: 'center', mt: 3,mb: 10, borderRadius: '10px ', border: '1px solid #2a2f33',bgcolor: '#000', p: 1, boxShadow: '0 4px 10px rgba(0, 183, 255, 0.7)'
                   }}>
            <Typography color="#bbb" mb={10} mt={2} textAlign="center">Aqui encontraras programas de entrenamiento para diferentes objetivos, niveles, fuerza e intensidad, clases de abdomen, clases funcionales, entrenamientos metabolicos, videos y mucho mas.<br></br><br></br> Responde el <strong>cuestionario </strong>en tu seccion de <strong>ENTRENAMIENTO</strong>, para que nuestro algoritmo te asigne un plan de entrenamiento adecuado para ti y si el programa asignado no te gusta, puedes cambiarlo en calquier momento o solicitar ayuda en nuestro chat para asignarte el programa que se adapte mejor a tus necesidades. <br></br>Cada programa es parte de un macrociclo de entrenamiento y a sido desarrollado a base de fundamentos biomecanicos, años de experiencia y estudios.<br></br> Seguiremos actulizando programas, clases y contenido para ti.<br></br><br></br>Acompaña tu entrenamiento con tu plan alimenticio en la seccion de <strong> NUTRICION</strong> para obtener los mejores resultados.<br></br> <br></br>En caso de ser usuario de suscripcion <strong>PRO</strong>, en tu seccion de entrenamiento, tendras la opcion de agendar tu sesion de consulta online con el coach, para personalizarte un programa de entrenamiento y nutricion, <strong>exclusivo</strong> para ti.</Typography>
            </Box>
            <Typography variant="h4" color="#ccc" mb={4} mt={4} textAlign="center" fontWeight="bold">PROGRAMAS DE ENTRENAMIENTO</Typography>
            {Object.keys(programasPorObjetivo).length === 0 ? (
                <Typography color="#bbb" textAlign="center">Aún no hay programas creados. ¡Crea uno!</Typography>
            ) : (
                Object.keys(programasPorObjetivo).map(objetivo => (
                    <Box key={objetivo} mb={4}>
                        <Typography variant="h5" color="#ccc" fontWeight="bold">{objetivo}</Typography>
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
                            {programasPorObjetivo[objetivo].map(programa => (
                                <ProgramCard 
                                key={programa.nombre}
                                 programa={programa}
                                 onOpenDeleteDialog={hndlOpenDeleteDialog}
                                 onOpenPreviewDialog={hndlOpenPreviewDialog}
                                 onOpenAsignacionDlg={hndlOpenAsigancionDlg}
                                 onOpenAñadirDlg={hndlOpenAñadirDlg}
                                 />
                            ))}
                        </Box>
                    </Box>
                ))
            )}

             {openPreviewDialog && programaToPreview && (
                <DlgGnrl
                    open={openPreviewDialog}
                    onClose={hndlClosePreviewDialog}
                    title="Previsualización del Programa"
                    content={<ProgramPreview programa={programaToPreview} />}
                    actions={[
                        <Button variant="outlined" onClick={hndlClosePreviewDialog}
                         sx={{ borderColor: 'rgb(0, 204, 255)', color: 'rgb(0, 204, 255)', fontWeight: 'bold', '&:hover': { bgcolor: 'rgb(0, 204, 255)', color: '#fff', borderColor: 'rgb(0, 204, 255)' } }}>
                            Cerrar
                        </Button>
                    ]}
                />
            )}

            {openAsignacionDlg && programaAsignar && (
                <DlgGnrl
                    open={openAsignacionDlg}
                    onClose={hndlCloseAsignacionDlg}
                    title={`Asignar ${programaAsignar.nombre}`}
                    content= { 
                        <SearchUsersForm
                            allUsers={allUsers}
                            programa={programaAsignar}
                            onAssign={hndlConfirmarAsignacion}
                            onClose={hndlCloseAsignacionDlg}
                        />
                    }
                />
            )}

            { openAñadirDlg && añadirPrograma && (
                <DlgGnrl
                    open={openAñadirDlg}
                    onClose={hndlCloseAñadirDlg}
                    title="Confirmacion"
                    content= {`¿Quieres agregar el programa "${añadirPrograma.nombre}" a tu entrenamiento?`}
                    onConfirm={hndlConfirmarAñadir}
                />
            )}

            {/* Dialog del eliminar programa */}
            <DlgGnrl
                open={openDeleteDialog}
                onClose={hndlCloseDeleteDialog}
                title="Confirmar Eliminación"
                content="¿Estas seguro de eliminar el programa?"
                onConfirm={hndlConfirmDelete}
            />

        </Container>
    );
}