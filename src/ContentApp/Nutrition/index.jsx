import { useEffect, useState } from "react";
import { Box, Button, Container, Typography, Dialog,IconButton, DialogContent, TextField, Divider, Fab } from "@mui/material";
import { useAuth } from "../AuthContext";
import NutriViewer from "../NutriViewer";
import CrearNutricion from "../Workout/CrearNutricion";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';

export default function Nutrition () {
    const [planActivo, setPlanActivo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openDlgNutri, setOpenDlgNutri] = useState(false);

    const { obtenerUsuarioActual, obtenerTokenActual } = useAuth();

    const usuario = obtenerUsuarioActual();
    const userId = usuario?.id
    const token = obtenerTokenActual();
    console.log("User ID en Nutricion:", userId);


   

  const fetchPlanActivo = async () => {
  if (!userId || !token) return;

  try {
    const res = await fetch(
      `http://127.0.0.1:8001/nutricion/plan/activo/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!res.ok) {
      if (res.status === 404) {
        setPlanActivo(null);
        return;
      }
      throw new Error("Error al consultar plan");
    }

    const data = await res.json();
    setPlanActivo(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
  fetchPlanActivo();
}, [userId, token]);

useEffect(() => {
  if (!planActivo) return;

  const hoy=dayjs().format('YYYY-MM-DD');
  const fin = dayjs(planActivo.fecha_fin).format('YYYY-MM-DD');

  console.log("Estado del plan:", planActivo.estado);
  console.log("Fecha inicio:", planActivo.fecha_inicio);
  console.log("Fecha fin:", planActivo.fecha_fin);
}, [planActivo]);

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
                <Typography variant="h5" textAlign={'center'}  fontWeight={'bold'} color= {'#ccc'} >
                    ¡Hola {usuario?.nombre?.toUpperCase() || 'ATLETA'}!<br /> Bienvenido a tu espacio de nutrición personalizada.
                    </Typography>
            </Box>
            <Divider />
            
            {planActivo && (
  <Box sx={{ textAlign: "leftt", mb: 2, mt: 2 }}>
    {planActivo.estado === "activo" && (
      <Typography color="#1ddf47" fontWeight="bold">
        <AccessTimeIcon sx={{ fontSize: 'medium' }} /> Tu plan vence en {diasRestantes} días
      </Typography>
    )}

    {planActivo.estado === "vencido" && (
      <Typography color="red" fontWeight="bold">
        ❌ Tu plan venció hace {Math.abs(diasRestantes)} días
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
    <Box sx={{ minWidth: 100 }}>
      <Typography 
        color= '#ccc' 
        fontSize="0.9rem" 
        mb={0.5}
        ml={2}
        fontWeight={'bold'}
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
            color: '#ccc',
            "& fieldset": { borderColor: "rgb(0, 204, 255)" },
            "&:hover fieldset": { borderColor: "rgb(0, 204, 255)" },

          }
        }}
      />
    </Box>

    <Box sx={{ minWidth: 100 }}>
      <Typography 
        color= '#ccc' 
        fontSize="0.9rem" 
        mb={0.5}
        ml={2}
        fontWeight={'bold'}
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
            borderRadius: "20px",
            color: "#ccc",
            "& fieldset": { borderColor: "rgb(0, 204, 255)" },
            "&:hover fieldset": { borderColor: "rgb(0, 204, 255)" },
          }
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
                Para optimizar el análisis de nuestra <strong>IA</strong> , recomendamos que el registro de sus datos <strong>(especialmente el peso)</strong>  se realice por la mañana, en ayunas. Esto asegura una mayor precisión en los cálculos y un ajuste alimenticio óptimo.<br></br>
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
      fetchPlanActivo(); 
    }}
  />
</DialogContent>
</Dialog>

        </Container>
    )
}