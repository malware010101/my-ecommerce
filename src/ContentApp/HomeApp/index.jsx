import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil'; 
import { Container, Typography, Box, Card, CardContent, IconButton, Button } from "@mui/material";
// import { programasState } from '../hooks/estadoGlobal';
import { userState, usersDataState } from '../hooks/estadoGlobal';
import DlgGnrl from '../../components/DlgGnrl';
import ProgramPreview from '../ProgramPreview';
import SearchUsersForm from '../SearchUsersForm';
import ProgramCard from '../ProgramCard.jsx';
import { useAuth } from '../AuthContext/index.jsx';

export default function HomeApp() {
    // const [programas, setProgramas] = useRecoilState(programasState);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [programaToDelete, setProgramaToDelete] = useState(null);
    const [openPreviewDialog, setOpenPreviewDialog] = useState(false);
    const [programaToPreview, setProgramaToPreview] = useState(null);
    const [ openAsignacionDlg, setOpenAsignacionDlg ] = useState(false);
    const [ programaAsignar, setProgramaAsignar ] = useState(null);
    const [openAñadirDlg, setOpenAñadirDlg] = useState(false);
    const [añadirPrograma, setAñadirPrograma] = useState(null);
    const [ programas, setProgramas ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    const { obtenerTokenActual, obtenerUsuarioActual } = useAuth();
    const usuarioActual = obtenerUsuarioActual(); 
    const userRol = usuarioActual.rol;

    // const usuario = useRecoilValue(userState);
    const [ allUsers, setAllUsers ] = useRecoilState(usersDataState);
    console.log("Rol del usuario actual:", userRol);

    const fetchProgramas = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:8001/entrenamiento/programas/general');
            
            if (response.ok) {
                const data = await response.json();
                setProgramas(data); 
            } else {
                console.error("Error al cargar programas:", response.status);
            }
        } catch (error) {
            console.error("Error de red al obtener programas:", error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchProgramas();
    }, []);


    
    const hndlCardClick = (programa) => {
        if (userRol === 'admin' || userRol === 'coach') {
            hndlOpenAsigancionDlg(programa);
        } else if (userRol === 'usuario' || userRol === 'pro') {
         hndlOpenAñadirDlg(programa);
        }
    }
    

    const hndlOpenAsigancionDlg = (programa) => {
        setProgramaAsignar(programa);
        setOpenAsignacionDlg(true);
    }

    const hndlCloseAsignacionDlg = () => {
        setOpenAsignacionDlg(false);
        setProgramaAsignar(null);
    }

   const hndlConfirmarAsignacion = async (selectedUser) => {
    if (!selectedUser || !programaAsignar) return;

    const token = obtenerTokenActual();

    try {
        const response = await fetch(
            'http://127.0.0.1:8001/entrenamiento/programas/asignar',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    programa_id: programaAsignar.id,
                    usuario_id: selectedUser.id,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("Error al asignar:", data.detail);
            return;
        }

        console.log("Programa asignado:", data);
        hndlCloseAsignacionDlg();

    } catch (error) {
        console.error("Error de red al asignar programa:", error);
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

    const hndlConfirmarAñadir = async () => {
    if (!añadirPrograma) return;

    const token = obtenerTokenActual();

    try {
        const response = await fetch(
            'http://127.0.0.1:8001/entrenamiento/programas/asignar',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    programa_id: añadirPrograma.id,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("Error al añadir programa:", data.detail);
            return;
        }

        console.log("Programa añadido al entrenamiento:", data);
        hndlCloseAñadirDlg();

    } catch (error) {
        console.error("Error de red al añadir programa:", error);
    }
};


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

    const hndlConfirmDelete = async () => {
        if (!programaToDelete) return;

        const programaId = programaToDelete.id;
        const authToken = obtenerTokenActual();

        // 1. Verificación de Token y Rol (Frontend)
        if (!authToken) {
            console.error("No estás autenticado para eliminar programas.");
            hndlCloseDeleteDialog();
            return;
        }
        
        // Mantenemos la restricción del frontend (solo admin puede eliminar)
        if (userRol !== 'admin') {
            console.error("Permiso denegado: Solo el admin puede eliminar programas.");
            hndlCloseDeleteDialog();
            return;
        }

        try {
            // Petición DELETE con el ID y el Token
            const response = await fetch(`http://127.0.0.1:8001/entrenamiento/programas/${programaId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authToken}`, // ¡TOKEN REQUERIDO!
                }
            });

            if (response.ok) {
                console.log(`Programa ${programaId} eliminado exitosamente.`);
                // 3. Refrescar la lista de programas
                fetchProgramas(); 
            } else {
                const errorData = await response.json();
                console.error("Error de API al eliminar:", errorData.detail);
            }
        } catch (error) {
            console.error("Error de red al eliminar el programa:", error);
        } finally {
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
            <Typography variant="body2"  textAlign={'left'} padding={'10px'} fontStyle={'italic'} color={'#bbb'}>Aqui encontraras programas de entrenamiento para diferentes objetivos, niveles, fuerza e intensidad, clases de abdomen, clases funcionales, entrenamientos metabolicos, videos y mucho mas.<br></br><br></br> Responde el <strong>cuestionario </strong>en tu seccion de <strong>ENTRENAMIENTO</strong>, para que nuestro algoritmo te asigne un plan de entrenamiento adecuado para ti y si el programa asignado no te gusta, puedes cambiarlo en calquier momento o solicitar ayuda en nuestro chat para asignarte el programa que se adapte mejor a tus necesidades. <br></br>Cada programa es parte de un macrociclo de entrenamiento y a sido desarrollado a base de fundamentos biomecanicos, años de experiencia y estudios. Seguiremos actulizando programas, clases y contenido para ti.<br></br><br></br>Acompaña tu entrenamiento con tu plan alimenticio en la seccion de <strong> NUTRICION</strong> para obtener los mejores resultados.<br></br> <br></br>En caso de ser usuario de suscripcion <strong>PRO</strong>, en tu seccion de entrenamiento, tendras la opcion de agendar tu sesion de consulta online con el coach, para personalizarte un programa de entrenamiento <strong>EXCLUSIVO </strong> para ti, adapptado a tus objetivos y preferencias.</Typography>
            </Box>
            <Typography variant="h4" color="#ccc" mb={4} mt={4} textAlign="center" fontWeight="bold">PROGRAMAS DE ENTRENAMIENTO</Typography>
            {Object.keys(programasPorObjetivo).length === 0 ? (
                <Typography color="#bbb" textAlign="center" mb= {10}>Aún no hay programas creados, espera pronto para ver los programas disponibles. </Typography>
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
                                key={programa.id}
                                 programa={programa}
                                 onOpenDeleteDialog={hndlOpenDeleteDialog}
                                 onOpenPreviewDialog={hndlOpenPreviewDialog}
                                 onCardClick={hndlCardClick}
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