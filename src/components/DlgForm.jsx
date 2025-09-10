import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export default function DlgForm({ open, onClose, title, content, buttonText, onConfirm }) {
    return (
        <Dialog open={open} onClose={onClose} sx={{
            '& .MuiDialog-paper': {
                width: '100%',
                maxWidth: { xs: '90%', sm: '600px', md: '800px' },
            }
        }}>
            <DialogTitle sx={{ bgcolor: 'rgb(0, 204, 255)', color: '#fff', fontWeight: 'bold' }}>
                {title}
            </DialogTitle>
            <DialogContent sx={{ bgcolor: '#111', color: '#fff', pt: 2 }}>
                <Typography m={5}>{content}</Typography>
            </DialogContent>
            <DialogActions sx={{ bgcolor: '#111' }}>
                <Button onClick={onClose} sx={{ color: 'rgb(0, 179, 255)' }}>
                    Cerrar
                </Button>
                {onConfirm && (
                    <Button onClick={onConfirm} variant="contained" sx={{ bgcolor: 'rgb(0, 179, 255)', color: '#fff' }}>
                        {buttonText}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}