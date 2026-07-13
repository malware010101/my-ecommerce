import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '../../api'
import { Typography, Box, Container, Divider, IconButton, Avatar, Button } from '@mui/material'
import { useAuth } from '../AuthContext'
import { useParams } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import dayjs from 'dayjs';
import CardMembresia from './CardMembresia';
import MockupEnergyBackground from '../../components/Landing/Effects/MockupEnergyBackground';

export default function Membresia() {
    
    const [ avatar, setAvatar ] = useState(null);
    const { obtenerUsuarioActual} = useAuth();
    const usuario = obtenerUsuarioActual();

    const { userId: paramUserId} = useParams();

    const userId = paramUserId 
    ? Number(paramUserId) 
    : usuario?.id;

    const isOtroUser =
    !!paramUserId && 
    Number(paramUserId) !== usuario?.id;

    const { data: profileUser, isLoading } = useQuery({
    queryKey: ["membresia", userId],
    queryFn: async () => {
        const res = await api.get(`/auth/users/${userId}`);
        return res.data;
    },
    enabled: isOtroUser && !!userId
});

    const User = isOtroUser
        ? profileUser ?? null
        : usuario;

    
    const rol = User?.rol?.toLowerCase();
    const tieneMembresia = !["admin", "coach"].includes(rol);
    
    const hndlAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatar(URL.createObjectURL(file));
}


const MEMBERSHIP_CONFIG = {
  trial: {
    label: "Prueba Gratis",
    background: "linear-gradient(180deg, #9E9E9E 0%, #616161 100%)",
    shadow: "0 6px 22px rgba(120,120,120,.28)",
  },

  standard: {
    label: "Standard",
    background: "linear-gradient(180deg, #00CCFF 0%, #2E6CF6 100%)",
    shadow: "0 6px 22px rgba(41,118,255,.28)",
  },

  platinum: {
    label: "Platinum",
    background: "linear-gradient(180deg, #ECEFF1 0%, #90A4AE 100%)",
    shadow: "0 6px 22px rgba(176,190,197,.35)",
  },

  gold: {
    label: "Gold",
    background: "linear-gradient(180deg, #FFD54F 0%, #F9A825 100%)",
    shadow: "0 6px 22px rgba(255,193,7,.35)",
  },

  diamond: {
    label: "Diamond",
    background: "linear-gradient(180deg, #80DEEA 0%, #26C6DA 100%)",
    shadow: "0 6px 22px rgba(38,198,218,.35)",
  },
};

const membresia = tieneMembresia
  ? (
      MEMBERSHIP_CONFIG[User?.membresia_plan] ??
      MEMBERSHIP_CONFIG.standard
    )
  : null;

const MEMBERSHIP_STATUS = {
  activa: {
    label: "ACTIVA",
    color: "#4CAF50",
  },

  vencida: {
    label: "VENCIDA",
    color: "#F44336",
  },

  cancelada: {
    label: "CANCELADA",
    color: "#FF9800",
  },
};

const estado = tieneMembresia
  ? (
      MEMBERSHIP_STATUS[User?.membresia_estado] ??
      MEMBERSHIP_STATUS.vencida
    )
  : null;

  const requiereRenovacion = 
  !isOtroUser &&
  tieneMembresia && User?.membresia_estado === "vencida";

  const PLANES = [
  {
    nombre: "Standard",
    duracion: 30,
    precio: 499,

    background:
      "linear-gradient(90deg,#00CCFF,#2E6CF6)",

    glow:
      "0 0 30px rgba(0,204,255,.18)",
  },

  {
    nombre: "Platinum",
    duracion: 90,
    precio: 1350,

    background:
      "linear-gradient(90deg,#ECEFF1,#90A4AE)",

    glow:
      "0 0 30px rgba(200,200,200,.18)",

    recommended: true,
  },

  {
    nombre: "Gold",
    duracion: 180,
    precio: 2499,

    background:
      "linear-gradient(90deg,#FFD54F,#F9A825)",

    glow:
      "0 0 30px rgba(255,193,7,.18)",
  },

  {
    nombre: "Diamond",
    duracion: 365,
    precio: 4499,

    background:
      "linear-gradient(90deg,#7DF9FF,#00BCD4)",

    glow:
      "0 0 30px rgba(0,255,255,.18)",
  },
];

const solicitarPlan = (plan) => {

    const mensaje =
       `Hola.
       Soy usuario de REPS y mi membresía ha vencido.

       Quisiera renovar mi membresía.

       INFORMACION DE USUARIO:
       ID: ${userId}
       Nombre: ${User?.nombre}

       PLAN SOLICITADO:
       Plan: ${plan.nombre}
       Duración: ${plan.duracion} días
       Precio: $${plan.precio} MXN`;

    const url = `https://wa.me/525669391146?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
};
 
    return (
        <Container sx={{width:"100%"}}>
            <Button
            startIcon = {<ArrowBackIcon sx={{mr:1}} />}
            sx={{
                color: "#535353",
                bgcolor: "#000",
                fontWeight: "bold",
                "&:hover": {
                    bgcolor: "#000",
                },
            }}

            >
                Informacion de Membresia
            </Button>
           <Box
             sx={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
               mb: 3,
               border: "1px solid #151515",
               borderRadius: 10,
               p: 2,
               mt:{
                 md: 3
               }
             }}
           >
             {/* IZQUIERDA: Avatar + Nombre */}
             <Box sx={{ 
                display: "flex", 
                alignItems: "center",
                 gap: 2, 
                }}>
           
               <Box sx={{ position: "relative" }}>
                 <Avatar
                   src={avatar}
                   sx={{
                     width: {
                       xs: 80,
                       md: 110
                     },
                     height: {
                       xs: 80,
                       md: 110
                     },
                     border: "2px solid #888",
                     bgcolor: "#151515",
                     fontSize: "1.5rem"
                   }}
                 >
                   {!avatar && "U"}
                 </Avatar>
           
                   {/* <IconButton
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
                 </IconButton>    */}
               </Box>
           
               <Box>
                 <Typography
                   fontSize= {{
                     xs: ".8rem",
                     md: "1.2rem"
                   }}
                   fontWeight="bold"
                   color="#fff"
                 >
                   {User?.nombre || "Usuario"}
                 </Typography>
                 <Typography
                   fontSize= {{
                     xs: ".7rem",
                     md: "1.2rem"
                   }}
                   fontWeight="bold"
                   color="#ccc"
                 >
                   Membresia:
                 </Typography>
                 <Typography fontSize={{xs: ".6rem", md: "1rem"}} color="#888">
                   <strong>Plan Actual:</strong>   {tieneMembresia ? membresia.label : "No aplica"}
                 </Typography>
                 <Typography fontSize={{xs: ".6rem", md: "1rem"}} color="#888">
                   <strong> Duracion:</strong>  {tieneMembresia
                   ? `${User?.duracion_plan} días`
                   : "-"}
                 </Typography>

                  
                 <Typography fontSize={{xs: ".6rem", md: "1rem"}} color="#888">
                   <strong> Inicio:</strong>   {
                    tieneMembresia && User?.membresia_inicio
                    ? dayjs(User.membresia_inicio).format("DD/MM/YYYY HH:mm")
                    : "-"
                   }
                 </Typography>
                 <Typography fontSize={{xs: ".6rem", md: "1rem"}} color="#888">
                   <strong> Fin:</strong>   {
                   tieneMembresia && User?.membresia_fin
                     ? dayjs(User.membresia_fin).format("DD/MM/YYYY HH:mm")
                     : "-"
                    }
                 </Typography>
                  <Typography fontSize={{xs: ".6rem", md: "1rem"}} color="#888">
                   <strong> Expira en:</strong> {
                    tieneMembresia
                       ? `${User?.dias_restantes} días`
                       : "-"
                    }
                 </Typography>
                 <Typography fontSize={{xs: ".6rem", md: "1rem"}} color='#888'>
                   <strong> Estado Actual:</strong> 
                 </Typography>

                  <Typography fontSize={{xs: ".7rem", md: "1rem"}} color={tieneMembresia ? estado.color : "#888"}fontWeight="bold">
                   {tieneMembresia ? estado.label : "NO APLICA"}
                 </Typography>
                  
               </Box>
             </Box>
             
           
             {/* DERECHA: Botón */}
             {tieneMembresia && (
               <Button
                  size="small"
                    sx={{
                         px:{ xs:2, md:2.6 },
                         height:{ xs:38, md:40 },
                         minWidth:0,
                         borderRadius:"999px",
                         textTransform:"none",
                         fontWeight:600,
                         letterSpacing:".15px",
                         fontSize:{
                                 xs:".7rem",
                                 md:".84rem",
                         },
                         color:"#fff",
                         background:membresia.background,
                         boxShadow:membresia.shadow,
                         transition:".25s",
                         "&:hover":{
                              transform:"translateY(-1px)"
                         }
                       }}
                >
                  {membresia.label}
               </Button>
             )}
           </Box>
           {/* {tieneMembresia && (
              <Box display="flex" justifyContent="space-between" mr={2} ml={2}>
            <Box>
            <Button
            sx={{
            color: "red",
            fontSize: ".7rem"
           }}
            > 
            cancelar membresia
            </Button>
            </Box>
           </Box> 
           )} */}
           <Box mt={2}>
            
           </Box>
    {requiereRenovacion && (
         
           <Box
    display="flex"
    flexWrap="wrap"
    justifyContent="center"
    gap={3}
>
    <Typography fontSize={{xs: ".7rem", md: "1rem"}} color="#888">
                   Tu membresía ha vencido
                   <br/> 
                    No te preocupes.
                    <br/>
                   Para seguir utilizando todas las funciones de REPS únicamente necesitas renovar tu membresía.
                   <br/>
                   Selecciona uno de nuestros planes disponibles y nuestro equipo activará nuevamente tu cuenta una vez confirmado el pago.
                 </Typography>
    {PLANES.map((plan) => (
        <MockupEnergyBackground> 
        <CardMembresia
            key={plan.nombre}
            nombre={plan.nombre}
            duracion={plan.duracion}
            precio={plan.precio}
            background={plan.background}
            shadow={plan.glow}
            onClick={() => solicitarPlan(plan)}
        />
        </MockupEnergyBackground>
    ))}
</Box>
    )}
           
        </Container>
    )
}