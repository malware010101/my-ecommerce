import React from "react";
import {
  Card,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";

export default function CardMembresia({
  nombre,
  duracion,
  precio,
  background,
  glow,
  recommended = false,
  onClick,
}) {

  return (
    <Card
      sx={{
        mt: 2,
        mb: 2,
        position: "relative",
        width: {
          xs: "100%",
          md: 340,
        },

        bgcolor: "#080808",

        borderRadius: 4,

        overflow: "hidden",

        border: "1px solid #171717",

        transition: ".25s",

        "&:hover": {
          transform: "translateY(-6px)",
          borderColor: "#00CCFF",
          boxShadow: glow,
        },
      }}
    >

      {/* Barra superior */}

      <Box
        sx={{
          height: 6,
          background,
        }}
      />

      {recommended && (
        <Chip
          label="RECOMENDADO"
          size="small"
          sx={{
            position: "absolute",
            top: 18,
            right: 18,

            bgcolor: "#00CCFF",
            color: "#000",

            fontWeight: 700,
            fontSize: ".65rem",
          }}
        />
      )}

      <Box p={4}>

        <Typography
          sx={{
            color: "#555",
            letterSpacing: 2,
            fontSize: ".75rem",
            fontWeight: 700,
          }}
        >
          REPS MEMBERSHIP
        </Typography>

        <Typography
          mt={2}
          sx={{
            color: "#FFF",
            fontWeight: 800,
            fontSize: "2rem",
          }}
        >
          {nombre}
        </Typography>

        <Typography
          mt={.5}
          sx={{
            color: "#8A8A8A",
            fontSize: ".8rem",
            letterSpacing: 1.5,
          }}
        >
          {duracion} DÍAS DE ACCESO
        </Typography>

        <Typography
          mt={4}
          sx={{
            color: "#FFF",
            fontSize: "2.3rem",
            fontWeight: 800,
          }}
        >
          ${precio}
        </Typography>

        <Typography
          sx={{
            color: "#7B7B7B",
            fontSize: ".85rem",
          }}
        >
          MXN
        </Typography>

        <Box
          mt={4}
          sx={{
            borderTop: "1px solid #181818",
            borderBottom: "1px solid #181818",
            py: 2,
          }}
        >

          <Typography color="#DDD">
            ✓ Acesso a los programas de reps
          </Typography>

          <Typography mt={1} color="#DDD">
            ✓ Nutrición Inteligente
          </Typography>

          <Typography mt={1} color="#DDD">
            ✓ Programas Personalizados
          </Typography>

           <Typography mt={1} color="#DDD">
            ✓ Soporte y acompanamiento 24/7
          </Typography>

          <Typography mt={1} color="#DDD">
            ✓ Segimiento de resultados
          </Typography>

          <Typography mt={1} color="#DDD">
            ✓ Actualizaciones Incluidas
          </Typography>

        </Box>

        <Button
          fullWidth
          onClick={onClick}
          sx={{
            mt: 4,

            height: 48,

            borderRadius: "999px",

            color: "#FFF",

            fontWeight: 700,

            background,

            transition: ".25s",

            "&:hover": {
              filter: "brightness(1.12)",
              transform: "translateY(-2px)",
            },
          }}
        >
          SOLICITAR PLAN
        </Button>

      </Box>

    </Card>
  );
}