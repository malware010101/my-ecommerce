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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ViewDayIcon from '@mui/icons-material/ViewDay';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import AnamnesisDlg from "./anamnesisDlg";
import Grafico from "./Grafico";
import DlgFechasPesajes from "./DlgFechasPesajes";
import DlgImg from "./DlgImg";
import AddSharpIcon from '@mui/icons-material/AddSharp';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export default function Porfile () {
const navigate = useNavigate();

const [ openDlgPsje, setOpenDlgPsje ] = useState(false); 
const [ avatar, setAvatar ] = useState(null);
const [ openDrawer , setOpenDrawer ] = useState(false);
const [openAnamnesis, setOpenAnamnesis] = useState(false);

const [openDlgFechas, setOpenDlgFechas] = useState(false);
const [ selectedPesaje, setSelectedPesaje ] = useState(null);

//estado paras las imagenes del pesaje registradas
const [openDlgImg, setOpenDlgImg] = useState(false);


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

const { data: pesajes = [], refetch:refetchPesajes } = useQuery({
  queryKey: ["pesajes", userId],
  queryFn: async () => {
    const endpoint =
      usuario.rol === "admin" || usuario.rol === "coach"
        ? `/pesajes/historico/usuario/${userId}`
        : `/pesajes/historico`;

    const res = await api.get(endpoint);
    return res.data;
  }
});

useEffect(() => {
  if (pesajes?.length) {
    setSelectedPesaje(pesajes[0]);
  }
}, [pesajes]);

const pesajeActivo = selectedPesaje ?? pesajes[0];

const hndlPsjCreated = () => {
  setSelectedPesaje(prev => {
    return prev;
  });
};

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
  p: 1,
  bgcolor: "#111",
  borderRadius: 3,
  textAlign: "center",
  color: "#ffffff"
};

const miniCardStyle2 = {
  p: 1,
  bgcolor: "#111",
  borderRadius: 10,
  textAlign: "center",
  color: "#ffffff"
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
    <Container maxWidth="lg" 
    sx={{ 
      mt: { xs: 0, md: 4} }}>

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
          border: "2px solid #888",
          bgcolor: "#151515",
          fontSize: "1.5rem"
        }}
      >
        {!avatar && "U"}
      </Avatar>
      {/* Aqui va el boton de subir avatar hasta que lo implemente en bunny*/}
{/* 
      <IconButton
        component="label"
        size="small"
        sx={{
          position: "absolute",
          bottom: -4,
          right: -4,
           background: "linear-gradient(180deg,rgb(0, 204, 255) 0%, #2E6CF6 100%)",
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
      </IconButton> */}
    </Box>

    <Box>
      <Typography
        fontSize= {{
          xs: ".9rem",
          md: "1.2rem"
        }}
        fontWeight="bold"
        color="#fff"
      >
        {headerUser?.nombre || "Atleta"} 
      </Typography>
      <Typography fontSize={12} color="#888">
       ID:<strong> {headerUser?.id || ""} </strong>
      </Typography>
      <Typography fontSize={12} color="#888">
        Usuario: <strong> {rolShow}</strong> 

      </Typography>
    </Box>

  </Box>

  {/* DERECHA: Botón */}
  <Button
    onClick= {() => 
      navigate(
        isOtroUser
          ? `/apptraining/membresia/${userId}`
          : `/apptraining/membresia`
      )}
    endIcon={<ArrowForwardIosIcon fontSize="small" sx={{ color: "#fff" }} />}
    size="small"
    sx={{
  px: {
    xs: 2,
    md: 2.6,
  },

  height: {
    xs: 38,
    md: 40,
  },

  minWidth: 0,
  borderRadius: "999px",

  textTransform: "none",

  fontWeight: 600,

  letterSpacing: ".15px",

  fontSize: {
    xs: ".7rem",
    md: ".84rem",
  },

  color: "#fff",

  background:
    "linear-gradient(180deg,rgb(0, 204, 255) 0%, #2E6CF6 100%)",

  boxShadow:
    "0 6px 22px rgba(41,118,255,.28)",

  transition: ".25s",

  "& .MuiButton-endIcon": {
    ml: 0.5,
    transition: ".25s",
  },

  "&:hover": {
    background:
      "linear-gradient(180deg,rgb(0, 204, 255) 0%, rgb(46, 108, 246) 100%)",

    transform: "translateY(-1px)",

    boxShadow:
      "0 10px 26px rgba(41,118,255,.38)",
  },
  "&:hover .MuiButton-endIcon": {
    transform: "translateX(3px)",
  },
}}
  >
    Membresia
  </Button>

</Box>
<Divider sx={{ mb: 3 }}/>

      {/* ================= GRID PRINCIPAL ================= */}
      <Grid container spacing={3}>

        {/* ===== Training Plan Actual ===== */}
        <Grid item xs={12} md={6}>
          <Paper sx={cardStyle}>
            <Box>
                <Typography fontSize={18} color="#ccc" mb={1}>
              Plan Entrenamiento
            </Typography> 
            <Divider sx={{ mb: 4 }} />
            
            <Typography variant="h5" mt={1} mb={1} fontWeight="bold"  >
              {workoutInfo.nombre}
            </Typography>
            </Box>
           <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, mb: 1 }}>
                <Typography fontSize={13} color="#888">
              <strong>Inicio:</strong> {workoutInfo.fechaInicio}
            </Typography>
                <Typography fontSize={13} color="#888">
              <strong>Fin:</strong> {workoutInfo.fechaFin}
            </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1}}>
                <Typography fontSize={13} color={ workoutInfo.diasRestantes === "Vencido" ? "#ff4d4f" : "#888"}>
              <strong>Dias restantes: </strong> {workoutInfo.diasRestantes}
            </Typography>
            </Box>
            
        
          </Paper>
        </Grid>

        {/* ===== Activities ===== */}
        <Grid item xs={12} md={6}>
          <Paper sx={cardStyle}>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, mb: 0 }}>
                <Typography fontSize={18} color="#ccc">
              Actividad
            </Typography>

            <IconButton size="small" onClick= {() => setOpenDrawer(true)}>
                <VisibilityIcon sx={{ color: "#888" }} />
            </IconButton>
            </Box>
            <Divider sx={{ mb: 4 }} />
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
                <Typography fontSize={18} color="#ccc">
              Anamnesis
            </Typography>

            <IconButton size="small" onClick= {() => setOpenAnamnesis(true)}>
                <VisibilityIcon sx={{ color: "#888" }} />
            </IconButton>
            </Box>
            <Divider sx={{ mb: 2 }} />
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
            <Divider sx={{ mb: 1 }} />
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
            <IconButton
             onClick={() => setOpenDlgFechas(true)}
             size="small" >
                <CalendarViewDayIcon  sx={{ color: "#888" }} />
            </IconButton>
            <IconButton 
            size="small"
            onClick={() => setOpenDlgImg(true)}
            pesaje={pesajeActivo}
            >
                <VisibilityIcon sx={{ color: "#888" }} />
            </IconButton>
             <IconButton 
            size="small"
            onClick={hndlOpenDlgPsje}
            >
                <AddSharpIcon sx={{ color: "#888" }} />
            </IconButton>
           
            
            </Box>
            <Divider sx={{ mb: 1 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, mb: 1 }}>
                <Typography variant="body2" color="#888" >
              Fecha de pesaje:
            </Typography>
            <Typography variant="body2" color="#888">
              {dayjs(pesajeActivo?.registrado_en).format("DD/MM/YYYY HH:mm")}
            </Typography>
            </Box>
            <Grafico
            data={pesajeActivo}
            style={{ width: "100%", height: 500 }}
            />

            <Grid container spacing={2}>

              {[
                { label: "Peso", value: `${pesajeActivo?.peso_kg ?? 0 } kg` },
                { label: "Masa Muscular", value: `${pesajeActivo?.masa_muscular_kg ?? 0} kg` },
                { label: "Grasa Corporal", value: `${pesajeActivo?.grasa_kg ?? 0} kg` },
                { label: "IMC", value: `${pesajeActivo?.imc ?? 0 }` },
              ].map((item, index) => (
                <Grid item xs={12} md={3} key={index} mb={0} >
                    <Box sx={
                      miniCardStyle2
                      }>
                        <Typography variant="body2" color="#888" textAlign="center">
                      {item.label}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold" textAlign="center">
                      {item.value}
                    </Typography>
                    </Box>
                </Grid>
              ))}

            </Grid>
          </Paper>
        </Grid>

      </Grid>

      <DlgPesaje
        open={openDlgPsje}
        onClose={hndlClsDlgPsje}
        onPesajeCreated={hndlPsjCreated}
      />
      <DlgFechasPesajes
        open= {openDlgFechas}
        onClose={() => setOpenDlgFechas(false)}
        pesajes={pesajes}
        selected={selectedPesaje}
        setSelected={setSelectedPesaje}
        onApply={() => {setOpenDlgFechas(false);}}
      />
      <DlgImg
        open={openDlgImg}
        onClose={() => setOpenDlgImg(false)}
        pesaje={pesajeActivo}
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