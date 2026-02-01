import React, { useState, useEffect } from "react";
import { Box, Typography, Tabs, Tab, Snackbar, Button, TextField, Grid, Divider } from "@mui/material";
import { Dialog, DialogContent } from "@mui/material";
import ExerciseCard from "../ExerciseCard";
import MethodCard from "../MethodCard";
import api from "../../api";
import dayjs from "dayjs";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function ProgramDetails({ entrenamiento }) {
  const programa = entrenamiento?.programa || {};
  const [value, setValue] = useState(0);
  const [abrirVideo, setAbrirVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [completadosPorDia, setCompletadosPorDia] = useState({});
  const [snackOpen, setSnackOpen] = useState(false);
  const notiSound = new Audio("/sounds/success.mp3");

  const handleChange = (event, newValue) => setValue(newValue);

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
    try {
      await api.post("/entrenamiento/historico", {
        entrenamiento_id: entrenamiento.entrenamiento_id,
        dia_realizado: programa.dias[value].dia,
      });

      setSnackOpen(true);
      notiSound.currentTime = 0;
      notiSound.play().catch(() => {});

      setCompletadosPorDia((prev) => {
        const copy = { ...prev };
        copy[value] = new Set();
        const normalized = {};
        Object.keys(copy).forEach((k) => (normalized[k] = new Set(copy[k])));
        return normalized;
      });
    } catch (e) {
      console.log("Error registrando historial", e);
    }
  };

  const hndlVerVideo = (url) => {
    setVideoUrl(url);
    setAbrirVideo(true);
  };

  const hndlCloseVideo = () => {
    setAbrirVideo(false);
    setVideoUrl("");
  };

  const hndlCloseSnack = () => setSnackOpen(false);

  // --- Conteo de días al estilo Nutrición ---
  const hoy = dayjs();
  const fechaFin = dayjs(entrenamiento?.fecha_fin);
  const diasRestantes = fechaFin.diff(hoy, "day");
  const planActivo = diasRestantes >= 0;

  return (
    <Box sx={{ bgcolor: "#000", color: "#fff", textAlign: "center" }}>
      {entrenamiento?.fecha_inicio && entrenamiento?.fecha_fin && (
        <Box sx={{ textAlign: "center", mb: 2}}>
          {planActivo ? (
            <Typography color="#1ddf47" fontWeight="bold" mb={5}  >
              <AccessTimeIcon sx={{ fontSize: 'medium', verticalAlign: 'middle' }} /> 
              Tu plan vence en {diasRestantes} días
            </Typography>
          ) : (
            <Typography color="red" fontWeight="bold" textAlign='left' mb={10}>
              ❌ Tu plan venció hace {Math.abs(diasRestantes)} días
            </Typography>
          )}
        </Box>
      )}

      
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
        <Box sx={{ minWidth: 100 }}>
      <Typography 
        color= '#ccc' 
        fontSize="0.9rem" 
        fontWeight={'bold'}
        textAlign={'left'}
        ml={2.5}
      >
        Inicio
      </Typography>
        <TextField
          value={dayjs(entrenamiento.fecha_inicio).format("DD/MM/YYYY")}
          InputProps={{ readOnly: true }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              color: "#ccc",
              "& fieldset": { borderColor: "rgb(0, 204, 255)" },
              "&:hover fieldset": { borderColor: "rgb(0, 204, 255)" },
            },
          }}
        />
        </Box>
        <Box sx={{ minWidth: 100 }}>
      <Typography 
        color= '#ccc' 
        fontSize="0.9rem" 
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
              borderRadius: "20px",
              color: "#ccc",
              "& fieldset": { borderColor: "rgb(0, 204, 255)" },
              "&:hover fieldset": { borderColor: "rgb(0, 204, 255)" },
            },
          }}
        />
        </Box>
      </Box>
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

      <Dialog open={abrirVideo} onClose={hndlCloseVideo} maxWidth="xs" fullWidth sx={{ "& .MuiDialog-paper": { bgcolor: "#000", borderRadius: "10px" } }}>
        <DialogContent>
          <video src={videoUrl || null} controls muted autoPlay loop style={{ width: "100%", height: "auto", borderRadius: "10px", display: "block" }} />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackOpen}
        onClose={hndlCloseSnack}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        ContentProps={{
          sx: {
            bgcolor: "green",
            color: "#fff",
            borderRadius: 2,
            fontWeight: "bold",
            px: 2,
            py: 1,
            textAlign: "center",
            minHeight: 50,
            minWidth: "unset",
            maxWidth: 300,
            width: "fit-content",
          },
        }}
        message="¡Completaste tu entrenamiento del día!"
      />
    </Box>
  );
}
