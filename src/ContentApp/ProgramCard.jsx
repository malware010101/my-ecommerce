import React from 'react';
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRecoilValue } from 'recoil'; 
import { userState } from './hooks/estadoGlobal';
import { objetivosImagenes } from './UtilsApp/helper';


const ProgramCard = ({ programa, onOpenDeleteDialog, onOpenPreviewDialog, onCardClick }) => {
    const usuario = useRecoilValue(userState);
    const bgImage = objetivosImagenes[programa.objetivo];

    return (
        <Card
        onClick={() => onCardClick(programa)}
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

export default ProgramCard;