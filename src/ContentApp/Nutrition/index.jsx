import { useEffect, useState } from "react";
import { Box, Button, Container, Typography, Dialog,IconButton, DialogContent, TextField, Divider, Fab } from "@mui/material";
import { useAuth } from "../AuthContext";
import NutriViewer from "../NutriViewer";
import CrearNutricion from "../Workout/CrearNutricion";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { useQueryClient } from "@tanstack/react-query";


export default function Nutrition () {
    const [openDlgNutri, setOpenDlgNutri] = useState(false);

    const { obtenerUsuarioActual, obtenerTokenActual } = useAuth();

    const usuario = obtenerUsuarioActual();
    const userId = usuario?.id

    const queryClient = useQueryClient();


 const { data: planActivo, isLoading: loading } = useQuery({
  queryKey: ["planNutricional", userId],
  queryFn: async () => {
    try {
      const res = await api.get(`/nutricion/plan/activo/${userId}`);
      return res.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },
  enabled: !!userId
});

const diasRestantes = planActivo
  ? dayjs(planActivo.fecha_fin).diff(dayjs(), "day")
  : null;

  const calcularPlan = 
   !planActivo || planActivo.estado === 'vencido';

 

if (loading) {
  return (
    <Container maxWidth="lg">
      <Typography color="#fff" textAlign="center" mt={5}>
        Cargando tu plan nutricional...
      </Typography>
    </Container>
  );
}
    return (
        <Container maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3
            }}>
                <Typography  textAlign={'center'}  fontWeight={'bold'} color= {'#ccc'} sx={{ fontSize:{ xs: '1.2rem', md: '1.5rem' } }} >
                    ¡Hola {usuario?.nombre?.toUpperCase() || 'ATLETA'}!<br /> Bienvenido a tu espacio de nutrición personalizada.
                    </Typography>
            </Box>
            <Divider />
            
            {planActivo && (
  <Box sx={{ textAlign: "right", mb: 2, mt: 2, mr: 2 }}>
    {planActivo.estado === "activo" && (
      <Typography color="#414141" fontWeight="bold" fontSize={{ xs: ".8rem", md: "1rem" }}>
        <AccessTimeIcon sx={{ fontSize: 'medium', verticalAlign: 'middle' }} />
         Tu plan vence en {diasRestantes} días
      </Typography>
    )}

    {planActivo.estado === "vencido" && (
      <Typography color="red"  mb={1} fontSize={{ xs: ".8rem", md: "1rem" }}>
        <AccessTimeIcon sx={{ fontSize: 'medium', verticalAlign: 'middle' }} />
        Tu plan venció hace {Math.abs(diasRestantes)} días
      </Typography>
    )}
  </Box>
)}

{planActivo && (
  <Box sx={{ 
    display: "flex", 
    justifyContent: "center", 
    gap: 3, 
    mt: 2, 
    mb: 5,
    p: 1,
    flexWrap: "wrap"
  }}>
    <Box sx={{ maxWidth: 120 }}>
      <Typography 
        color= 'rgb(0, 204, 255)' 
        fontSize="0.7rem" 
        fontWeight={'bold'}
        textAlign={'left'}
        ml={2.2}
      >
        Inicio
      </Typography>
      <TextField
        fullWidth
        value={dayjs(planActivo.fecha_inicio).format("DD/MM/YYYY")}
        InputProps={{
          readOnly: true,
        }}
        sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              fontSize: "0.8rem",
              color: "#ccc",
              "& fieldset": { borderColor: "#1f1f1fff" },
              "&:hover fieldset": { borderColor: "rgba(94,166,255,.15)" },
            },
          }}
      />
    </Box>

    <Box sx={{ maxWidth: 120 }}>
      <Typography 
       color= 'rgb(0, 204, 255)' 
        fontSize="0.7rem" 
        ml={2}
        fontWeight={'bold'}
        textAlign={'left'}
      >
        Fin
      </Typography>
      <TextField
        fullWidth
        value={dayjs(planActivo.fecha_fin).format("DD/MM/YYYY")}
        InputProps={{
          readOnly: true,
        }}
      sx={{
            "& .MuiOutlinedInput-root": {
              fontSize: "0.8rem",
              borderRadius: "20px",
              color: "#ccc",
              "& fieldset": { borderColor: "#1f1f1fff" },
              "&:hover fieldset": { borderColor: "rgba(94,166,255,.15)" },
            },
          }}
      />
    </Box>
  </Box>
)}

          {calcularPlan && (
              
    <Fab
      variant="contained" 
      size= "large"
      onClick={() => setOpenDlgNutri(true)}
      sx={{
        position: 'fixed',
        bottom: 49,
        left: {
          xs: 30,
          sm: 260,
          md: 280,
        },
        zIndex: 1300,
        bgcolor: '#00CCFF',
        opacity: 0.7,
        color: '#000',
        fontWeight: 'bold',
        '&:hover': { bgcolor: 'rgb(0, 153, 204)' }
      }}
    >
      <RestaurantIcon sx={{ mr: 1 }} />
    </Fab>
          )}



            {/* SI HAY PLAN ACTUAL */}
            {planActivo ? (
                <NutriViewer plan={planActivo} />
            ) : (
            // SI NO HAY PLAN ACTUAL}
            <>
            <Box sx={{ display: 'column', justifyContent: 'center', alignItems: 'center', mt: 3, p: 2
            }}>
            <Box 
            sx={{ 
                display: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', mt: 0, 
                borderRadius: '10px ', 
                border: '1px solid #2a2f33',
                bgcolor: '#000',
                 p: 1, 
                 boxShadow: '0 4px 10px rgba(0, 183, 255, 0.7)'
            }}>
                <Typography 
                     variant="body2" color= {'#fff'} textAlign={'left'} padding={'10px'} fontStyle={'italic'} color={'#bbb'}>
                    Para generar o actualizar su plan de alimentación personalizado, es fundamental completar el siguiente formulario. Esto nos permitirá calcular sus requerimientos de macronutrientes con base en su perfil y objetivos específicos..<br></br> 
                Para optimizar el análisis de nuestra <strong>algoritmo Reps</strong> , recomendamos que el registro de sus datos <strong>(especialmente el peso)</strong>  se realice por la mañana, en ayunas. Esto asegura una mayor precisión en los cálculos y un ajuste alimenticio óptimo.<br></br>
                Mantener su información actualizada es clave para garantizar un diseño nutricional preciso y efectivo.</Typography>
                
            </Box>
            {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3, p: 2
            }}>
            <Button 
                 variant="contained" 
                 onClick={() => setOpenDlgNutri(true)}
                  sx={{ mt: 3,
                     mb: 5,
                      ml: 1,
                      bgcolor: 'rgb(0, 204, 255)', 
                      color: '#fff', 
                      fontWeight: 'bold',
                      borderRadius: '10px',
                      mb: 2,
                      '&:hover': { bgcolor: 'rgb(0, 153, 204)' } }}>
                    CALCULAR PLAN
                </Button>
            </Box> */}
            </Box>
            </>
            )}
<Dialog
  open={openDlgNutri}
  onClose={() => setOpenDlgNutri(false)}
  fullWidth
  maxWidth="md"
  PaperProps={{
    sx: {
      backgroundColor: "#000",
      padding: 0,
      position: "relative"
    }
  }}
>
    <IconButton
      onClick={() => setOpenDlgNutri(false)}
      sx={{
        position: "absolute",
        top: 10,
        right: 10,
        color: "#fff",
        zIndex: 10
      }}
    >
      <CloseIcon />
    </IconButton>
    <DialogContent
    sx={{
      padding: 0
    }}
    >
  <CrearNutricion
  selfMode={true}
  currentUser={usuario}
    onSaved={() => {
      setOpenDlgNutri(false);
      queryClient.invalidateQueries(["planNutricional", userId]);
    }}
  />
</DialogContent>
</Dialog>

        </Container>
    )
}