import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil'; 
import { Container, Typography, Box, Card, CardContent, IconButton } from "@mui/material";
import { programasState } from '../hooks/estadoGlobal';
import { objetivosImagenes } from '../UtilsApp/helper';
import { userState } from '../hooks/estadoGlobal';
import { Delete as DeleteIcon } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import DlgGnrl from '../../components/DlgGnrl';

const ProgramCard = ({ programa, onOpenDeleteDialog }) => {
    const usuario = useRecoilValue(userState);
    const bgImage = objetivosImagenes[programa.objetivo];
    return (
        <Card
        sx={{
            minWidth: 250,
            borderRadius: '10px',
            border: '1px solid rgb(0, 204, 255)',
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
            {usuario.rol === 'admin' && (
                    <IconButton 
                        size="small" 
                        sx={{ position: 'absolute', top: 5, right: 5, color: '#fff' }} 
                        onClick={() => onOpenDeleteDialog(programa)}
                    >
                        <CloseIcon />
                    </IconButton>
                )}
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
    // Estado para el Dialog de confirmación
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [programaToDelete, setProgramaToDelete] = useState(null);

    const usuario = useRecoilValue(userState);
    console.log("Rol del usuario actual:", usuario.rol);

    
    // Función para abrir el diálogo de confirmación
    const hndlOpenDeleteDialog = (programa) => {
        setProgramaToDelete(programa);
        setOpenDeleteDialog(true);
    };

    // Función para cerrar el diálogo
    const hndlCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setProgramaToDelete(null); // Limpiar el estado
    };

    // Función para eliminar el programa
    const hndlConfirmDelete = () => {
        if (programaToDelete) {
            const nuevosProgramas = programas.filter(p => p.nombre !== programaToDelete.nombre);
            setProgramas(nuevosProgramas); // Actualiza el estado global
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
                                 />
                            ))}
                        </Box>
                    </Box>
                ))
            )}
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