// src/components/ReusableDialog.jsx
import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';

export default function DlgGnrl({ open, onClose, onConfirm, title, content }) {
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
        >
            <DialogTitle sx={{ bgcolor: 'rgb(0, 204, 255)', color: '#fff', fontWeight: 'bold', textAlign: 'center'}}>{title}</DialogTitle>
            <DialogContent sx={{bgcolor: '#000', color: '#fff', textAlign: 'center', p: 6, fontSize: '1.2rem'}}>
                {content}
            </DialogContent>
            <DialogActions sx={{ bgcolor: '#000', justifyContent: 'center' }}>
                <Button variant ="outlined" onClick={onClose} sx={{ borderColor: 'rgb(0, 204, 255)', color: 'rgb(0, 204, 255)', mr: 2, fontWeight: 'bold', '&:hover': { bgcolor: 'rgb(0, 204, 255)', color: '#fff', borderColor: 'rgb(0, 204, 255)' } }}>
                    No
                </Button>
                <Button variant= "outlined" onClick={onConfirm} sx={{ borderColor: 'rgb(0, 204, 255)', color: 'rgb(0, 204, 255)', fontWeight: 'bold', '&:hover': { bgcolor: 'rgb(0, 204, 255)', color: '#fff', borderColor: 'rgb(0, 204, 255)' } }}>
                    Sí
                </Button>
            </DialogActions>
        </Dialog>
    );
}