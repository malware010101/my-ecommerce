import { Container, Grid, Typography, Divider, Box, Button, Avatar, IconButton, Paper, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText  } from "@mui/material";
import Chart from "./Chart";
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from "react";
import DlgPesaje from "./DlgPesaje";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAuth } from "../AuthContext";
import api from "../../api";
import dayjs from "dayjs";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ViewDayIcon from '@mui/icons-material/ViewDay';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import AnamnesisDlg from "./anamnesisDlg";


export default function Porfile () {
const navigate = useNavigate();

const [ openDlgPsje, setOpenDlgPsje ] = useState(false); 
const [ avatar, setAvatar ] = useState(null);
const [ openDrawer , setOpenDrawer ] = useState(false);
const [openAnamnesis, setOpenAnamnesis] = useState(false);

const { obtenerUsuarioActual } = useAuth();
const usuario = obtenerUsuarioActual();

const { userId: paramUserId} = useParams();
const userId = paramUserId ? Number(paramUserId) : usuario?.id;


const isOtroUser =
  !!paramUserId && Number(paramUserId) !== usuario?.id;

const rolesPermitidos = ["admin", "coach"];

  useEffect(() => {
    if (
        isOtroUser &&
        !rolesPermitidos.includes(usuario?.rol)
    )
         {
            navigate('/apptraining/profile/');
    }
  }, [isOtroUser, usuario, navigate]);

const { data: profileUser, isLoading: loadingProfile } = useQuery({
  queryKey: ["profileUser", userId],
  queryFn: async () => {
    const res = await api.get(`/auth/users/${userId}`);
    return res.data;
  },
  enabled: isOtroUser && !!userId
});


const headerUser = isOtroUser
? profileUser ?? null
: usuario;


const rolShow = headerUser?.rol?.toLowerCase() === "admin" 
? "CEO" 
: headerUser?.rol

const backTable =
  isOtroUser && 
  (usuario?.rol === "admin" || usuario?.rol === "coach");


// historial y conteo con query
const { data: historial = [], isLoading } = useQuery({
  queryKey: ["historial", userId],
  queryFn: async () => {
    const endpoint =
      usuario.rol === "admin" || usuario.rol === "coach"
        ? `/entrenamiento/historico/usuario/${userId}`
        : `/entrenamiento/historico`;

    const res = await api.get(endpoint);
    return res.data;
  },
  enabled: !!userId
});

// plan nutricional query
const { data: planNutri, isLoading: isLoadingPlanNutri } = useQuery({
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
useEffect(() => {
  if (planNutri) {
    console.log("PLAN NUTRICIONAL:", planNutri);
  }
}, [planNutri]);

//query del plan activo prinicipal
const { data: workoutActivo, isLoading: loadingWorkout } = useQuery({
  queryKey: ["workoutActivo", userId],
  queryFn: async () => {

    const endpoint =
      usuario.rol === "admin" || usuario.rol === "coach"
        ? `/entrenamiento/programas/usuario/${userId}`
        : `/entrenamiento/programas/mis-programas`;

    const res = await api.get(endpoint);

    const principal = res.data.find(p =>
      ["base", "personalizado_base"].includes(p.tipo)
    );

    return principal || null;
  },
  enabled: !!userId
});

// para ver anamnesis completa
const { data: anamnesis, isLoading: loadingAnamnesis } = useQuery({
  queryKey: ["anamnesis", userId],
  queryFn: async () => {
    const res = await api.get(`/anamnesis/${userId}`);
    return res.data;
  },
  enabled: !!userId
});

const hndlOpenDlgPsje = () => {
    setOpenDlgPsje(true);
}  
const hndlClsDlgPsje= () => {
    setOpenDlgPsje(false);
}

const hndlAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatar(URL.createObjectURL(file));
}

const cardStyle = {
  p: 3,
  bgcolor: "#111",
  borderRadius: 3,
  boxShadow: "0 0 15px rgba(0,204,255,0.15)",
  color: "#fff"
};

const miniCardStyle = {
  p: 2,
  bgcolor: "#151515",
  borderRadius: 5,
  textAlign: "center",
  boxShadow: "0 0 10px rgba(0,204,255,0.1)",
  color: "#fff"
};


// datos del plan de entrenamiento activo
const workoutInfo = (() => {
  if (!workoutActivo) {
    return {
      nombre: "No hay plan activo",
      fechaInicio: "--",
      fechaFin: "--",
      diasRestantes: "--",
      vencido: false
    };
  }

  const inicio = dayjs(workoutActivo.fecha_inicio);
  const fin = dayjs(workoutActivo.fecha_fin);
  const diff = fin.diff(dayjs(), "day");

  return {
    nombre: workoutActivo.programa?.nombre,
    fechaInicio: inicio.format("DD/MM/YYYY"),
    fechaFin: fin.format("DD/MM/YYYY"),
    diasRestantes: diff < 0 ? "Vencido" : `${diff} días`,
    vencido: diff < 0
  };
})();


//datos del plan nutricional activo
const nutInfo = (() => {
  if (!planNutri) {
    return {
      kcal: 0,
      proteina: 0,
      carbs: 0,
      grasas: 0,
      fechaInicio: "--",
      fechaFin: "--",
      diasRestantes: "--",
      objetivo: null,
      vencido: false
    };
  }

  const inicio = dayjs(planNutri.fecha_inicio);
  const fin = dayjs(planNutri.fecha_fin);
  const diff = fin.diff(dayjs(), "day");

  return {
    kcal: planNutri.calorias_diarias,
    proteina: planNutri.macronutrientes?.proteinas ?? 0,
    carbs: planNutri.macronutrientes?.carbohidratos ?? 0,
    grasas: planNutri.macronutrientes?.grasas ?? 0,
    objetivo: planNutri.datos_recibidos?.objetivo ?? "Sin objetivo",
    fechaInicio: inicio.format("DD/MM/YYYY"),
    fechaFin: fin.format("DD/MM/YYYY"),
    diasRestantes: diff < 0 ? "Vencido" : `${diff} días`,
    vencido: diff < 0
  };
})();

if (isOtroUser && loadingProfile) {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography color="white">Cargando perfil...</Typography>
    </Container>
  );
}

return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>

      {/* ================= HEADER ================= */}
<Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3
  }}
>
  {/* IZQUIERDA: Avatar + Nombre */}
  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
    {backTable && (
  <IconButton
    onClick={() => navigate("/apptraining/usuarios")}
    sx={{
      mr: 1,
      color: "rgb(0,204,255)",
      "&:hover": { bgcolor: "rgba(0,204,255,0.15)" }
    }}
  >
    <ArrowBackIcon />
  </IconButton>
)}

    <Box sx={{ position: "relative" }}>
      <Avatar
        src={avatar}
        sx={{
          width: 60,
          height: 60,
          border: "2px solid rgb(0,204,255)",
          bgcolor: "#151515",
          fontSize: "1.5rem"
        }}
      >
        {!avatar && "U"}
      </Avatar>

      <IconButton
        component="label"
        size="small"
        sx={{
          position: "absolute",
          bottom: -4,
          right: -4,
          bgcolor: "rgb(0,204,255)",
          color: "#000",
          width: 22,
          height: 22,
          "&:hover": { bgcolor: "#00b3ff" }
        }}
      >
        <AddIcon sx={{ fontSize: 14 }} />
        <input
          hidden
          accept="image/*"
          type="file"
          onChange={hndlAvatarChange}
        />
      </IconButton>
    </Box>

    <Box>
      <Typography
        variant="h6"
        fontWeight="bold"
        color="rgb(0, 204, 255)"
      >
        {headerUser?.nombre || "Atleta"} 
      </Typography>
      <Typography fontSize={12} color="#888">
       ID:<strong> {headerUser?.id || ""} </strong>
      </Typography>
      <Typography fontSize={12} color="#888">
        Usuario: <strong> {rolShow}</strong> 

      </Typography>

      <Typography fontSize={12} color="#888">
        Último pesaje: 05 Feb 2026
      </Typography>
    </Box>

  </Box>

  {/* DERECHA: Botón */}
  <Button
    onClick={hndlOpenDlgPsje}
    startIcon={<AddIcon sx={{ color: "#fff" }} />}
    size="small"
    sx={{
      height: 36,
      px: 1.5,
      borderRadius: "18px",
      bgcolor: "rgb(0, 204, 255)",
      color: "#fff",
      fontWeight: 600,
      fontSize: "0.75rem",
      textTransform: "none",
      boxShadow: "0 0 10px rgba(0,204,255,0.3)",
      "&:hover": {
        bgcolor: "rgba(0,204,255,0.15)"
      }
    }}
  >
    Pesaje
  </Button>

</Box>
<Divider sx={{ mb: 3 }}/>

      {/* ================= GRID PRINCIPAL ================= */}
      <Grid container spacing={3}>

        {/* ===== Training Plan Actual ===== */}
        <Grid item xs={6}>
          <Paper sx={cardStyle}>
            <Box>
                <Typography variant="h6" color="#ccc">
              Plan Entrenamiento
            </Typography> 
            
            <Typography variant="h5" mt={1} mb={1} fontWeight="bold"  >
              {workoutInfo.nombre}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, mb: 1 }}>
                <Typography fontSize={13} color={ workoutInfo.diasRestantes === "Vencido" ? "#ff4d4f" : "#888"}>
              <strong>Dias restantes: </strong> {workoutInfo.diasRestantes}
            </Typography>
            </Box>
            </Box>
           <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, mb: 1 }}>
                <Typography fontSize={13} color="#888">
              <strong>Inicio:</strong> {workoutInfo.fechaInicio}
            </Typography>
                <Typography fontSize={13} color="#888">
              <strong>Fin:</strong> {workoutInfo.fechaFin}
            </Typography>
            </Box>
            
        
          </Paper>
        </Grid>

        {/* ===== Activities ===== */}
        <Grid item xs={6} md={6}>
          <Paper sx={cardStyle}>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, mb: 1 }}>
                <Typography variant="h6" color="#ccc">
              Actividad
            </Typography>

            <IconButton size="small" onClick= {() => setOpenDrawer(true)}>
                <VisibilityIcon sx={{ color: "#888" }} />
            </IconButton>
            </Box>
            <Typography variant="h3" fontWeight="bold" mb ={1}>
              {historial.length}
            </Typography>

            <Typography variant="body2" color="#888">
              Entrenamientos realizados
            </Typography>
          </Paper>
        </Grid>
        {/* ===== Anamnesis ===== */}
        <Grid item xs={12} md={6}>
          <Paper sx={cardStyle}>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, mb: 1 }}>
                <Typography variant="h6" color="#ccc">
              Anamnesis
            </Typography>

            <IconButton size="small" onClick= {() => setOpenAnamnesis(true)}>
                <VisibilityIcon sx={{ color: "#888" }} />
            </IconButton>
            </Box>
            <Box >
              <FitnessCenterIcon sx={{ color: "#fff", fontSize: 30 }} />
            </Box>

            <Typography variant="body2" color="#888">
              Historial deportivo y clinico
            </Typography>
          </Paper>
        </Grid>

        {/* ===== Nutrition Plan Actual ===== */}
        <Grid item xs={12} md={6}>
          <Paper sx={cardStyle}>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, mb: 1 }}>
                <Typography variant="h6" color="#ccc">
              Plan Nutricional
            </Typography>
            <Typography variant="body2" color="#888">
              <strong>Objetivo: </strong> {nutInfo.objetivo}
            </Typography>
            </Box>
             <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2}}>
                <Box sx={miniCardStyle}>
                    <Typography variant="h5" fontWeight="bold">
                      {nutInfo.kcal}
                    </Typography>
                    <Typography variant="body2" color="#888">
                      kcal
                    </Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

                <Box sx={miniCardStyle}>
                    <Typography variant="h5" fontWeight="bold">
                      {nutInfo.proteina }
                    </Typography>
                    <Typography variant="body2" color="#888">
                      Proteina g
                    </Typography>
                </Box>

                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

                <Box sx={miniCardStyle}>
                    <Typography variant="h5" fontWeight="bold">
                      { nutInfo.carbs }
                    </Typography>
                    <Typography variant="body2" color="#888">
                      Carbs g
                    </Typography>
                </Box>

                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

                <Box sx={miniCardStyle}>
                    <Typography variant="h5" fontWeight="bold">
                      { nutInfo.grasas }
                    </Typography>
                    <Typography variant="body2" color="#888">
                      Grasas g
                    </Typography>
                </Box>
            </Box>
             <Typography fontSize={13} color="#888" mr={1} >
              <strong>Inicio: </strong>{nutInfo.fechaInicio }
            </Typography>
            <Typography fontSize={13} color="#888" mr= {8}>
              <strong>Fin: </strong> {nutInfo.fechaFin}
            </Typography>
            <Typography fontSize={13} color= {nutInfo.diasRestantes === "Vencido" ? "#ff4d4f" : "#888"}>
              <strong>Dias restantes: </strong> {nutInfo.diasRestantes}
            </Typography>
          </Paper>
        </Grid>

        {/* ===== Analysis ===== */}
        <Grid item xs={12} mb= {6}>
          <Paper sx={cardStyle}>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, mb: 1 }}>
                <Typography variant="h6" color="#ccc">
              Analisis de resultados
            </Typography>
            <IconButton size="small" >
                <CalendarViewDayIcon  sx={{ color: "#888" }} />
            </IconButton>
            <IconButton size="small">
                <VisibilityIcon sx={{ color: "#888" }} />
            </IconButton>
            
            </Box>
            <Chart
              pesoKg={70}
              grasaPct={20}
              masaMuscularKg={50}
            />
            <Grid container spacing={2}>

              {[
                { label: "Peso", value: "70 kg" },
                { label: "Masa Muscular", value: "50 kg" },
                { label: "Grasa Corporal", value: "20%" },
                { label: "IMC", value: "24.1" }
              ].map((item, index) => (
                <Grid item xs={6} md={3} key={index} mb={0}>
                  <Paper
                   >
                    <Box sx={miniCardStyle}>
                        <Typography variant="body2" color="#888" textAlign="center">
                      {item.label}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold" textAlign="center">
                      {item.value}
                    </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}

            </Grid>
          </Paper>
        </Grid>

      </Grid>

      <DlgPesaje
        open={openDlgPsje}
        onClose={hndlClsDlgPsje}
      />
      <Drawer
  anchor="right"
  open={openDrawer}
  onClose={() => setOpenDrawer(false)}
  PaperProps={{
    sx: {
      width: 300,
      bgcolor: "#0b0b0b",
      color: "#fff",
      borderLeft: "1px solid #111",
      boxShadow: "-10px 0 30px rgba(0,0,0,0.6)",
      display: "flex",
      flexDirection: "column"
    }
  }}
  slotProps={{
    backdrop: {
      sx: {
        backgroundColor: "rgba(0,0,0,0.85)"
      }
    }
  }}
>
  {/* HEADER FIJO */}
  <Box
    sx={{
      p: 2,
      borderBottom: "1px solid #111",
      flexShrink: 0,
      bgcolor: "rgb(0,204,255)"
    }}
  >
    <Typography
      variant="h6"
      fontWeight="bold"
      color="#fff"
    >
      Historial Entrenamiento
    </Typography>
  </Box>

  {/* CONTENIDO SCROLL */}
  <Box
    sx={{
      flex: 1,
      overflowY: "auto",
      p: 3,
      bgcolor: "#0b0b0b"
    }}
  >
    <Timeline
      position="right"
      sx={{
        p: 0,
        "& .MuiTimelineItem-root:before": {
          flex: 0,
          padding: 0
        }
      }}
    >
      {historial.map((item, index) => (
        <TimelineItem key={item.id}>
          <TimelineSeparator>
            <TimelineDot
              sx={{
                bgcolor: "rgb(0,204,255)",
                boxShadow: "0 0 10px rgba(0,204,255,0.7)"
              }}
            />
            {index !== historial.length - 1 && (
              <TimelineConnector sx={{ bgcolor: "#333" }} />
            )}
          </TimelineSeparator>

          <TimelineContent>
            <Typography fontWeight="bold" fontSize={14}>
              Programa "{item.programa_nombre}""
            </Typography>

            <Typography fontSize={13} color="#bbb">
              Rutina {item.dia_realizado}
            </Typography>

            <Typography fontSize={12} color="#888">
              completado el {dayjs(item.completado_en).format("DD/MM/YYYY HH:mm")}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  </Box>
</Drawer>
<AnamnesisDlg
        open={openAnamnesis}
        onClose={() => setOpenAnamnesis(false)}
        anamnesis={anamnesis}
        loading={loadingAnamnesis}
      />
    </Container>
  );
}