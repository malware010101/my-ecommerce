import React from 'react';
import { Box, Typography, Card, CardContent, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const MethodCard = ({ method, onDelete, isDeletable = false }) => {
    return (
        <Card sx={{ bgcolor: 'rgba(0, 204, 255, 0.2)', mb: 2, p: 2, color: '#fff', border: '1px solid rgb(0, 204, 255)', borderRadius: '15px', position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 5, right: 5 }}>
                {isDeletable && (
                    <IconButton onClick={onDelete} color="error" size="small">
                        <DeleteIcon />
                    </IconButton>
                )}
            </Box>
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'rgb(0, 204, 255)' }}>
                    {method.nombre}
                </Typography>
                <Typography variant="body2" color="#bbb">
                    {method.descripcion}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default MethodCard;