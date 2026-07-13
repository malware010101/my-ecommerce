import { useRef, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CardPlan from "./CardPlan";
import api from "../../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
export default function DlgRenovacion({ open, onClose, user }) {

    const queryClient = useQueryClient();

    const {enqueueSnackbar} = useSnackbar();
      const notiSound = useRef(
        new Audio('/sounds/success.mp3')
      )

    const [planSeleccionado, setPlanSeleccionado] = useState(null);

const renovarMutation = useMutation({
  mutationFn: async () => {
    await api.put("/auth/renovar-membresia", {
      user_id: user.id,
      membresia_plan: planSeleccionado.nombre,
    });
  },

  onSuccess: () => {
  queryClient.invalidateQueries({
  queryKey: ["users"],
   });

    enqueueSnackbar('Membresia renovada exitosamente', 
    { variant: 'success' });

    notiSound.current.currentTime = 0;
    notiSound.current.play().catch(() => {});

    setPlanSeleccionado(null);
    onClose();
  },
  onError: (error) => {
    enqueueSnackbar(
      error.response?.data?.detail || "Error al renovar membresia",
      { variant: 'error' }
    )
  }
});

  const PLANES = [
  {
    nombre: "standard",
    dias: 30,
    precio: 499,
    color: "#00CCFF",
  },
  {
    nombre: "platinum",
    dias: 90,
    precio: 1350,
    color: "#B0BEC5",
  },
  {
    nombre: "gold",
    dias: 180,
    precio: 2499,
    color: "#FBC02D",
  },
  {
    nombre: "diamond",
    dias: 365,
    precio: 4499,
    color: "#26C6DA",
  },
];
const hndlClose = () => {
  setPlanSeleccionado(null);
  onClose();
}

    return (
        <Dialog open={open} onClose={hndlClose}
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
                RENOVACIÓN DE USUARIO
                <IconButton onClick={hndlClose} color="inherit">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{p: 2, bgcolor: '#000'}}>
                <Typography variant="body1" sx={{mt: 2, fontWeight: 'bold', color: '#fff'}}>
                Informacion del usuario:
                </Typography>

<Typography
    variant="body2"
    color="#888"
>
   <strong>ID: </strong> {user?.id}
</Typography>            
<Typography
    variant="body2"
    color="#888"
>
    <strong>Nombre: </strong> {user?.nombre}
</Typography>


<Typography
    variant="body2"
    color="#888"
>
    <strong>Plan actual:</strong> {user?.membresia_plan}
</Typography>

<Typography
    variant="body2"
    color="#888"
    mb={2}
>
    <strong>Estado:</strong> {user?.membresia_estado}
</Typography>
<Divider sx={{mb: 2}} />
<Typography
    color="#fff"
    fontWeight="bold"
    mb={2}
>
    Selecciona el nuevo plan
</Typography>

{PLANES.map((plan) => (
    <CardPlan
    key={plan.nombre}
    nombre={plan.nombre}
    dias={plan.dias}
    precio={plan.precio}
    color={plan.color}
    selected={planSeleccionado?.nombre === plan.nombre}
    onClick={() => {
        if (!renovarMutation.isPending) {
            setPlanSeleccionado(plan);
        }
    }}
  />
))}
            </DialogContent>

            <DialogActions sx={{p: 2, bgcolor: '#000'}}>
                
                <Button
                fullWidth
                disabled={!planSeleccionado || renovarMutation.isPending}
                onClick={renovarMutation.mutate}
                variant="contained"
                sx={{
                    bgcolor: '#00B3FF',
                    color: '#fff',
                    borderRadius: '16px',
                    fontWeight: 'bold',
                    '&:hover': { bgcolor: 'rgb(0, 204, 255)', color: '#fff', borderColor: 'rgb(0, 204, 255)' }
                }}
                >
                    {renovarMutation.isPending ? 'Renovando...' : 'Renovar'}
                </Button>
            </DialogActions>

        </Dialog>
    )
}