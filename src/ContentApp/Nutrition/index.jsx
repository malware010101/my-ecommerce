import { useEffect, useState } from "react";
import { Box, Button, Container, Typography, Dialog,IconButton, DialogContent } from "@mui/material";
import { useAuth } from "../AuthContext";
import NutriViewer from "../NutriViewer";
import CrearNutricion from "../Workout/CrearNutricion";
import CloseIcon from "@mui/icons-material/Close";

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
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3, mb: 3
            }}>
                <Typography variant="h5" textAlign={'center'}  fontWeight={'bold'} color= {'#ccc'} >
                    ¡Hola {usuario?.nombre?.toUpperCase() || 'ATLETA'}!, Bienvenido a tu espacio de nutrición personalizada.
                    </Typography>
            </Box>

            {/* SI HAY PLAN ACTIVO */}
            {planActivo ? (
                <NutriViewer plan={planActivo} />
            ) : (
            // SI NO HAY PLAN ACTIVO}
            <>
            <Box sx={{ display: 'column', justifyContent: 'center', alignItems: 'center', mt: 3, p: 2
            }}>
            <Box 
            sx={{ 
                display: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', mt: 3, 
                borderRadius: '10px ', 
                border: '1px solid #2a2f33',
                bgcolor: '#000',
                 p: 1, 
                 boxShadow: '0 4px 10px rgba(0, 183, 255, 0.7)'
            }}>
                <Typography 
                     variant="h6" color= {'#fff'} textAlign={'left'} padding={'10px'}>
                    Para generar o actualizar su plan de alimentación personalizado, es fundamental completar el siguiente formulario. Esto nos permitirá calcular sus requerimientos de macronutrientes con base en su perfil y objetivos específicos..<br></br> 
                Para optimizar el análisis de nuestra <strong>IA</strong> , recomendamos que el registro de sus datos <strong>(especialmente el peso)</strong>  se realice por la mañana, en ayunas. Esto asegura una mayor precisión en los cálculos y un ajuste alimenticio óptimo.<br></br>
                Mantener su información actualizada es clave para garantizar un diseño nutricional preciso y efectivo.</Typography>
                
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3, p: 2
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
            </Box>
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