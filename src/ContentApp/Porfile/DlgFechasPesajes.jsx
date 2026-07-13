import { Dialog, DialogActions, DialogContent, DialogTitle, Button,Typography, IconButton, Divider, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from "@mui/icons-material/Visibility";
import dayjs from 'dayjs';



export default function DlgFechasPesajes({open, onClose, pesajes, selected, setSelected, onApply}) {

    return (
        <Dialog
            open={open}
            onClose={onClose}
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
                    p: 1,
                    fontSize: '1.0rem'
                }}
            >
                PESAJES REGISTRADOS
                <IconButton 
                onClick={() => { onClose(); }} color="inherit"
                sx={{ color: '#bbb' }}  
                    >
                    <CloseIcon
                     sx= {{ 
                        color: '#fff', 
                        fontSize: '1.7rem'
                        }} 
                        />
                </IconButton>
            </DialogTitle>
            <DialogContent
                sx={{ bgcolor: '#000', color: '#ccc', textAlign: 'center', p: 4, fontSize: '1.2rem' }}
            >
    {pesajes.map ((p) => (
      <Box
        key={p.id}
        onClick={() => setSelected(p)}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 1,
          mt: 1,
          cursor: "pointer",
          bgcolor: selected?.id === p.id ? "#111" : "transparent"
        }}
      >
        <Typography fontSize={15} >
          {dayjs(p.registrado_en).format("DD/MM/YYYY HH:mm")}
        </Typography>
        <VisibilityIcon sx={{ color: "#00B3FF" }} />
      </Box>

    ))}
    <Divider sx={{ my: 2 }} />
            </DialogContent>
            <DialogActions sx={{ bgcolor: '#000' }}>  
                <Button 
                onClick={onApply}
                variant="contained"
                sx={{ 
                    fontWeight: 'bold',
                    borderRadius: '20px',
                    mb: 2,
                    bgcolor: '#00B3FF',
                    '&:hover': {
                        bgcolor: '#058cc6',
                    }
                     }}>
                        Aplicar
                        </Button>              
            </DialogActions>
        </Dialog>
    )
}