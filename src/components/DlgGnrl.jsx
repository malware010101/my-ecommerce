import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box
} from '@mui/material';

export default function DlgGnrl({ open, onClose, onConfirm, title, content, actions }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDialog-paper': {
                    bgcolor: '#000',
                    width: '100%',
                    maxWidth: { xs: '90%', sm: '600px', md: '800px' },
                    boxShadow: '0 4px 10px rgba(0, 204, 255, 0.7)',
                }
            }}
            keepMounted
        >
            <DialogTitle sx={{ bgcolor: 'rgb(0, 204, 255)', color: '#fff', fontWeight: 'bold', textAlign: 'center'}}>{title}</DialogTitle>
            <DialogContent sx={{bgcolor: '#000', color: '#fff', textAlign: 'center', p: 6,  fontSize: { xs: '1rem', md: '1.2rem' }}}>
                {content}
            </DialogContent>
            
            {actions && (
                <DialogActions sx={{ bgcolor: '#000', justifyContent: 'center', p: 2 }}>
                    {actions}
                </DialogActions>
            )}

            {!actions && onConfirm && (
                <DialogActions sx={{ bgcolor: '#000', justifyContent: 'center', p: 2 }}>
                    <Button variant="contained" onClick={onConfirm} sx={{ borderColor: 'rgb(0, 204, 255)', bgcolor: 'rgb(0, 204, 255)', color: '#fff',  mr: 3, fontWeight: 'bold', borderRadius: '20px', '&:hover': { bgcolor: 'rgb(0, 204, 255)', color: '#fff', borderColor: 'rgb(0, 204, 255)' } }}>
                        Sí
                    </Button>
                    <Button variant="contained" onClick={onClose} sx={{ borderColor: 'rgb(0, 204, 255)', color: '#fff', bgcolor: 'rgb(0, 204, 255)', fontWeight: 'bold', borderRadius: '20px', '&:hover': { bgcolor: 'rgb(0, 204, 255)', color: '#fff', borderColor: 'rgb(0, 204, 255)' } }}>
                        No
                    </Button>
                </DialogActions>
            )}

        </Dialog>
    );
}