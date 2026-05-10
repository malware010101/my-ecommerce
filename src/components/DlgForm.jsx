import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function DlgForm({ open, onClose, title, children, disableEscapeKeyDown, ...props }) {

   
    return (
        <Dialog
         open={open} 
         onClose={onClose}
         disableEscapeKeyDown={disableEscapeKeyDown}
         TransitionProps={props.TransitionProps}
         {...props}
         keepMounted={false}
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
        >
            <DialogTitle
             sx={{
          color: 'white',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: '#00B3FF',

        }}>
                {title}
                
            </DialogTitle>
            <DialogContent 
            sx={{ 
                bgcolor: '#000', 
                color: '#fff',
                pt: 2 }}>
                    <Box sx={{ p: 2 }}>
        {children}
    </Box>
            </DialogContent>
           
        </Dialog>
    );
}