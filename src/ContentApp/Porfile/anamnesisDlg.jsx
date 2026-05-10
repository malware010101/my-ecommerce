import { Dialog, DialogTitle, DialogContent, Typography, Box, Grid, Paper } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import InfoIcon from "@mui/icons-material/Info";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function AnamnesisDlg({ open, onClose, anamnesis, loading }) {

  const datos = anamnesis?.datos || {};

  const cardStyle = {
  p: 2,
  borderRadius: 3,
  bgcolor: "#090909",
  boxShadow: "0 0 15px rgba(0,204,255,0.15)",
  border: "1px solid rgba(0,204,255,0.2)",
  color: "#fff",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 0 25px rgba(0,204,255,0.3)"
  }
};

  return (
    <Dialog
     open={open} 
     onClose={onClose} 
     fullWidth 
     maxWidth="sm"
     bgcolor="#000"
     >

      <DialogTitle
      sx={{
          bgcolor: "#000",
          color: "rgb(0,204,255)",
          fontWeight: "bold"
        }}
      >
        Anamnesis del usuario
        </DialogTitle>

      <DialogContent sx={{ bgcolor: "#0b0b0b" }}>

        {loading ? (
          <Typography>Cargando...</Typography>
        ):!anamnesis ? (
          <Typography color ="#ccc">Este usuario no tiene anamnesis registrada.</Typography>
        ) : (

            <Grid container spacing={2} mt={1}>

            {/* EDAD */}
<Grid item xs={6}>
  <Paper sx={cardStyle}>
    <Typography fontSize={13} color="#888">
      Edad
    </Typography>
    <Typography fontWeight="bold">
      {datos?.edad} años
    </Typography>
  </Paper>
</Grid>

{/* GENERO */}
<Grid item xs={6}>
  <Paper sx={cardStyle}>
    <Typography fontSize={13} color="#888">
      Género
    </Typography>
    <Typography fontWeight="bold" sx={{ textTransform: "capitalize" }}>
      {datos?.genero}
    </Typography>
  </Paper>
</Grid>

            {/* OBJETIVO */}
            <Grid item xs={12}>
              <Paper sx={cardStyle}>
                <Box display="flex" alignItems="center" gap={1}>
                  <FitnessCenterIcon sx={{ color: "rgb(0,204,255)" }} />
                  <Typography fontWeight="bold">Objetivo</Typography>
                </Box>
                <Typography mt={1} color="#ccc">
                  {datos?.objetivo}
                </Typography>
              </Paper>
            </Grid>

            {/* NIVEL */}
            <Grid item xs={6}>
              <Paper sx={cardStyle}>
                <Typography fontSize={13} color="#888">
                  Nivel
                </Typography>
                <Typography fontWeight="bold">
                  {datos?.experiencia}
                </Typography>
              </Paper>
            </Grid>

            {/* DIAS */}
            <Grid item xs={6}>
              <Paper sx={cardStyle}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography fontSize={13} color="#888">
                    Dias de entrenamiento
                  </Typography>
                </Box>
                <Typography fontWeight="bold">
                  {datos?.frecuencia} dias
                </Typography>
              </Paper>
            </Grid>

            {/* ENFERMEDAD */}
            <Grid item xs={12}>
              <Paper
                sx={{
                  ...cardStyle,
                  border:
                    datos?.tieneEnfermedad === "si"
                      ? "1px solid rgba(255,0,0,0.4)"
                      : "1px solid rgba(0,255,100,0.3)"
                }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <MedicalServicesIcon
                    sx={{
                      color: datos.tieneEnfermedad === "si"
                      ? "#ff4d4f" : "#00ff99"
                    }}
                  />
                  <Typography fontWeight="bold">
                    Condición médica
                  </Typography>
                </Box>

                <Typography mt={1} fontWeight="bold">
                  {datos?.tieneEnfermedad === "si"
                   ? `Sí presenta (${datos?.enfermedad})`
                   : "No presenta"}
                </Typography>
              </Paper>
            </Grid>

            {/* LESIÓN */}
<Grid item xs={12}>
  <Paper
    sx={{
      ...cardStyle,
      border:
        datos?.tieneLesion === "si"
          ? "1px solid rgba(255,0,0,0.4)"
          : "1px solid rgba(0,255,100,0.3)"
    }}
  >
    <Box display="flex" alignItems="center" gap={1}>
      <MedicalServicesIcon
        sx={{
          color: datos?.tieneLesion === "si" ? "#ff4d4f" : "#00ff99"
        }}
      />
      <Typography fontWeight="bold">
        Lesiones
      </Typography>
    </Box>

    <Typography mt={1} fontWeight="bold">
      {datos?.tieneLesion === "si"
        ? `Sí presenta (${datos?.lesion})`
        : "No presenta"}
    </Typography>
  </Paper>
    </Grid>

            {/* INFO EXTRA */}
            <Grid item xs={12}>
              <Paper sx={cardStyle}>
                <Box display="flex" alignItems="center" gap={1}>
                  <InfoIcon sx={{ color: "#ccc" }} />
                  <Typography fontWeight="bold">
                    Información adicional
                  </Typography>
                </Box>

                <Typography mt={1} color="#aaa">
                  {datos?.comentarios || "Sin información adicional"}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
}