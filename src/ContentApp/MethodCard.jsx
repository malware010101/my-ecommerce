import React from 'react';
import { Box, Typography, Card, CardContent, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const MethodCard = ({ method, onDelete, isDeletable = false }) => {
    return (
        <Card sx={{ bgcolor: 'rgba(0, 204, 255, 0.2)', mb: 2, color: '#fff', border: '1px solid rgb(0, 204, 255)', borderRadius: '30px', position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 5, right: 5 }}>
                {isDeletable && (
                    <IconButton onClick={onDelete} color="error" size="small">
                        <DeleteIcon />
                    </IconButton>
                )}
            </Box>
            <CardContent>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1, color: 'rgb(0, 204, 255)', fontSize:{ xs: '.9rem', md: '1rem'} }}>
                    {method.nombre}
                </Typography>
                <Typography  color="#bbb" fontStyle={'italic'} textAlign={'center'} sx={{ fontSize:{ xs: '.8rem', md: '1rem' }}}>
                    {method.descripcion}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default MethodCard;