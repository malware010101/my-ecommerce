import React, { useState, useEffect } from "react";
import { Box, Typography, Tabs, Tab, Button, TextField, Grid, Divider, Stack, IconButton } from "@mui/material";
import { Dialog, DialogContent } from "@mui/material";
import ExerciseCard from "../ExerciseCard";
import MethodCard from "../MethodCard";
import api from "../../api";
import dayjs from "dayjs";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";



export default function ProgramDetails({ entrenamiento }) {
  const programa = entrenamiento?.programa || {};
  const [value, setValue] = useState(0);
  const [abrirVideo, setAbrirVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [completadosPorDia, setCompletadosPorDia] = useState({});
  const [videoError, setVideoError] = useState('');
  const notiSound = new Audio("/sounds/success.mp3");
  const [ snack, setSnack] = useState ({
    open: false,
    message : '',
    severity: 'success'
  })

  const navigate = useNavigate();
  const handleChange = (event, newValue) => setValue(newValue);

  const queryClient = useQueryClient();

 const mutation = useMutation({
  mutationFn: async () => {
    const res = await api.post("/entrenamiento/historico", {
      entrenamiento_id: entrenamiento.entrenamiento_id,
      dia_realizado: programa.dias[value].dia,
    });
    return res.data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["historial"] });
    setSnack({
      open: true,
      message: '¡Completaste tu entrenamiento del dia!',
      severity: 'success'
    });

      notiSound.currentTime = 0;
      notiSound.play().catch(() => {});
  },
  onError: () => {
    setSnack({
      open: true,
      message: 'Hubo un error al completar el entrenamiento',
      severity: 'error'
    })
  }
});

  const hndlBack = () => {
    navigate('/apptraining/entrenamiento', { replace: true });
  }

  useEffect(() => {
    if (!programa) return;
    const init = {};
    programa.dias?.forEach((_, idx) => {
      init[idx] = new Set();
    });
    setCompletadosPorDia(init);
  }, [programa]);

  const onToggleComplete = (exerciseId) => {
    setCompletadosPorDia((prev) => {
      const copy = { ...prev };
      if (!copy[value]) copy[value] = new Set();
      if (copy[value].has(exerciseId)) copy[value].delete(exerciseId);
      else copy[value].add(exerciseId);

      const normalized = {};
      Object.keys(copy).forEach((k) => (normalized[k] = new Set(copy[k])));
      return normalized;
    });
  };

  const allExercisesCompleted = () => {
    const diaObj = programa?.dias?.[value];
    if (!diaObj) return false;
    const exercises = diaObj.items.filter((i) => i.type === "exercise");
    const total = exercises.length;
    const completedSet = completadosPorDia?.[value] || new Set();
    return total > 0 && completedSet.size === total;
  };

  const hndlFnlrRutina = async () => {
     mutation.mutate();

      setCompletadosPorDia((prev) => {
        const copy = { ...prev };
        copy[value] = new Set();
        const normalized = {};
        Object.keys(copy).forEach((k) => (normalized[k] = new Set(copy[k])));
        return normalized;
      });
  };

  const hndlVerVideo = async (videoId) => {
  if (!videoId) {
    setVideoError('Este ejercicio no tiene video disponible');
    setVideoUrl('');
    setAbrirVideo(true);
    return;
  }

  try {
    const res = await api.get(`/videos/${videoId}/stream`);

    if (!res.data?.embed_url) {
      setVideoError('Este ejercicio no tiene video disponible');
      setVideoUrl('');
      setAbrirVideo(true);
      return;
    }

    setVideoError('');
    setVideoUrl(res.data.embed_url);
    setAbrirVideo(true);

  } catch (err) {
    console.error('Error al obtener video', err);
    setVideoError('Este ejercicio no tiene video disponible');
    setVideoUrl('');
    setAbrirVideo(true);
  }
};

  const hndlCloseVideo = () => {
    setAbrirVideo(false);
    setVideoUrl("");
    setVideoError('');
  };

  const hoy = dayjs();
  const fechaFin = dayjs(entrenamiento?.fecha_fin);
  const diasRestantes = fechaFin.diff(hoy, "day");
  const planActivo = diasRestantes >= 0;

  return (
    <Box sx={{ bgcolor: "#000", color: "#fff", textAlign: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center", ml: 2}}>
      <IconButton
        onClick={hndlBack}
        sx={{
          color: "rgb(0, 204, 255)",
          opacity: 0.5,
         
        }}
      >
        <ArrowBackIosIcon sx= {{ fontSize: "1.5rem"}}  />
      </IconButton>
    </Box>
 
      <Box 
      sx={{ display: "flex", 
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
          value={dayjs(entrenamiento.fecha_inicio).format("DD/MM/YYYY")}
          InputProps={{ readOnly: true }}
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
          value={dayjs(entrenamiento.fecha_fin).format("DD/MM/YYYY")}
          InputProps={{ readOnly: true }}
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
      {entrenamiento?.fecha_inicio && entrenamiento?.fecha_fin && (
        <Box sx={{ textAlign: "center", mb: 1}}>
          {planActivo ? (
            <Typography color="#414141" fontWeight="bold" mb={1} fontSize={{ xs: '.8rem', md: '1rem'}}  >
              <AccessTimeIcon sx={{ fontSize: 'medium', verticalAlign: 'middle' }} /> 
              Tu plan vence en {diasRestantes} días
            </Typography>
          ) : (
            <Typography color="red" fontWeight="bold" textAlign='left' mb={1} ml= {2} fontSize={{ xs: '.8rem', md: '1rem'}}>
              <AccessTimeIcon sx={{ fontSize: 'medium', verticalAlign: 'middle' }} />
              Tu plan venció hace {Math.abs(diasRestantes)} días
            </Typography>
          )}
        </Box>
      )}
      <Divider sx={{ mb: 2 }} />

      
      <Typography variant="h5" fontWeight="bold" color="rgb(0, 204, 255)" mb={2}>
        {programa?.nombre?.toUpperCase() || "Cargando..."}
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }} p= {4}>
        <Grid item xs={6} md={3} lg>
          <Box
                      sx={{
                        p: 2,
                        bgcolor: "#17343d",
                        borderRadius: "50px",
                        border: "1px solid rgb(0, 204, 255)",
                        boxShadow: "0px 0px 10px rgba(0, 204, 255, 0.5)"
                      }}
                    >
              <Typography variant="body1" color="#bbb">
                Objetivo
          </Typography> 
          <Typography variant="body1" color="#fff" fontWeight={'bold'}>
           {programa?.objetivo || "Cargando..."}
          </Typography>          
          </Box>
        </Grid>
        <Grid item xs={6} md={3} lg={3} >
          <Box
                      sx={{
                        p: 2,
                        bgcolor: "#17343d",
                        borderRadius: "50px",
                        border: "1px solid rgb(0, 204, 255)",
                        boxShadow: "0px 0px 10px rgba(0, 204, 255, 0.5)"
                      }}
                    >
              <Typography variant="body1" color="#bbb">
            Categoría 
          </Typography>    
          <Typography variant="body1" color="#fff" fontWeight={'bold'}>
            {programa?.categoria || "Cargando..."}
          </Typography>       
           </Box>
        </Grid>
        <Grid item xs={6} md={3} lg={3} >
           <Box
                      sx={{
                        p: 2,
                        bgcolor: "#17343d",
                        borderRadius: "50px",
                        border: "1px solid rgb(0, 204, 255)",
                        boxShadow: "0px 0px 10px rgba(0, 204, 255, 0.5)"
                      }}
                    >
              <Typography variant="body1" color="#bbb">
            Nivel
          </Typography> 
          <Typography variant="body1" color="#fff" fontWeight={'bold'}>
            {programa?.nivel || "Cargando..."}
          </Typography> 

                    </Box>
          
        </Grid>
        <Grid item xs={6} md={3} lg={3}>
          <Box
                      sx={{
                        p: 2,
                        bgcolor: "#17343d",
                        borderRadius: "50px",
                        border: "1px solid rgb(0, 204, 255)",
                        boxShadow: "0px 0px 10px rgba(0, 204, 255, 0.5)"
                      }}
                    >
           <Typography variant="body1" color="#bbb">
            Duración 
          </Typography>
          <Typography variant="body1" color="#fff" fontWeight={'bold'}>
            {programa?.duracion_semanas || "Cargando..."} semanas
          </Typography>           
          </Box>
          
        </Grid>
      </Grid>


      <Box sx={{ borderBottom: 1, borderColor: "rgb(0, 204, 255)", mt: 3, display: "flex", justifyContent: "center" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{ style: { backgroundColor: "rgb(0, 204, 255)" } }}
          sx={{
            "& .MuiTab-root": { color: "#ccc", "&.Mui-selected": { color: "rgb(0, 204, 255)", fontWeight: "bold" } },
            "& .MuiTabs-indicator": { backgroundColor: "rgb(0, 204, 255)", boxShadow: "0 4px 10px rgba(0, 204, 255, 0.7)" },
          }}
        >
          {programa?.dias?.map((diaObj, index) => (
            <Tab label={diaObj.dia} key={index} />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ p: 4 }}>
        {programa?.dias?.[value]?.items?.map((item) => {
          if (item.type === "method") return <MethodCard key={item.id} method={item} />;
          if (item.type === "exercise") {
            const isCompleted = completadosPorDia?.[value]?.has(item.id) ?? false;
            return (
              <ExerciseCard
                key={item.id}
                exercise={item}
                onShowVideo={hndlVerVideo}
                isInteractive={true}
                isCompleted={isCompleted}
                onToggleComplete={onToggleComplete}
              />
            );
          }
          return null;
        })}

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 4 }}>
          <Button
            variant="contained"
            size="large"
            disabled={!allExercisesCompleted()}
            onClick={hndlFnlrRutina}
            sx={{
              fontWeight: "bold",
              borderRadius: "20px",
              bgcolor: allExercisesCompleted() ? "green" : "gray",
              "&:hover": { bgcolor: allExercisesCompleted() ? "darkgreen" : "gray" },
            }}
          >
            Finalizar Rutina
          </Button>
        </Box>
      </Box>

      <Dialog
                open={abrirVideo}
                onClose={hndlCloseVideo} 
                maxWidth="xs"
                fullWidth
                  sx={{
                    '& .MuiDialog-paper': { bgcolor: '#000', borderRadius: '10px' }
                      }}
              >
                  <DialogContent
                    sx={{ p: 0 }}>
                      {videoError ? (
                        <Typography
                        backgroundColor="#000"
              color="#bbb"
              textAlign="center"
              sx={{ 
                py: 4,
              borderColor: 'rgb(0, 204, 255)',
              borderStyle: 'solid',
              borderWidth: '0.5px',
              borderRadius: '15px' }}
            >
              {videoError}
            </Typography>
                      ): (
                    <Box sx={{ 
                       position: 'relative', 
                       paddingTop: '56.25%',
                       aspectRatio: '9/16',
                       backgroundColor: '#000'
                              }}>
                  <iframe
                      src={videoUrl}
                      loading="lazy"
                      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                      allowFullScreen
                        style={{
                            border: 0,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            }}
                   />
                      </Box>
                    )}
                  </DialogContent>
              </Dialog>   

      <Snackbar
  open={snack.open}
  autoHideDuration={3000}
  onClose={() => setSnack({ ...snack, open: false })}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
>
  <Alert
    onClose={() => setSnack({ ...snack, open: false })}
    severity={snack.severity}
    variant="filled"
    sx={{ width: "100%" }}
  >
    {snack.message}
  </Alert>
</Snackbar>
    </Box>
  );
}

