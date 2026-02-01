import { useState } from "react";
import {
  Box,
  Grid,
  Tabs,
  Tab,
  Typography,
  Card,
  CardContent,
  FormGroup,
  FormControlLabel,
  Switch,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { ORDEN_COMIDAS, ORDEN_INGREDIENTES, formatearIngrediente } from "./utilsApp.jsx";
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';



export default function NutriViewer({ plan }) {
  const [tabValue, setTabValue] = useState(0);
  const [openDlgTips, setOpenDlgTips] = useState(false);  


  const hndlopenDlg = () => {
    setOpenDlgTips(true);
  }
  const handleCloseDlg = () => {
    setOpenDlgTips(false);
  }

  if (!plan) return null;

  return (
    <>
      <Typography
        variant="h5"
        color="rgb(0, 204, 255)"
        textAlign="center"
        mb={3}
        fontWeight="bold"
      >
        Plan Nutricional
      </Typography>

      {/* MACROS */}
      <Grid container spacing={2} sx={{ mb: 6, textAlign: "center" }}>
        <Grid item xs={6} sm={6} md={3}>
          <Box
            sx={{
              p: 2,
              bgcolor: "#17343d",
              borderRadius: "50px",
              border: "1px solid rgb(0, 204, 255)",
              boxShadow: "0px 0px 10px rgba(0, 204, 255, 0.5)"
            }}
          >
            <Typography color="#bbb" variant="body2">
              Calorías Totales
            </Typography>
            <Typography color="#fff" variant="h6">
              {plan.calorias_diarias} kcal
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={6} sm={6} md={3}>
          <Box
            sx={{
              p: 2,
              bgcolor: "#17343d",
              borderRadius: "50px",
              border: "1px solid rgb(0, 204, 255)",
              boxShadow: "0px 0px 10px rgba(0, 204, 255, 0.5)"
            }}
          >
            <Typography color="#bbb" variant="body2">
              Proteína
            </Typography>
            <Typography color="#fff" variant="h6">
              {plan.macronutrientes.proteinas} g
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={6} sm={6} md={3}>
          <Box
            sx={{
              p: 2,
              bgcolor: "#17343d",
              borderRadius: "50px",
              border: "1px solid rgb(0, 204, 255)",
              boxShadow: "0px 0px 10px rgba(0, 204, 255, 0.5)"
            }}
          >
            <Typography color="#bbb" variant="body2">
              Carbohidratos
            </Typography>
            <Typography color="#fff" variant="h6">
              {plan.macronutrientes.carbohidratos} g
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={6} sm={6} md={3}>
          <Box
            sx={{
              p: 2,
              bgcolor: "#17343d",
              borderRadius: "50px",
              border: "1px solid rgb(0, 204, 255)",
              boxShadow: "0px 0px 10px rgba(0, 204, 255, 0.5)"
            }}
          >
            <Typography color="#bbb" variant="body2">
              Grasas
            </Typography>
            <Typography color="#fff" variant="h6">
              {plan.macronutrientes.grasas} g
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "space-between"}}> 
        <Box sx={{ display: "flex" }}>
          <Button 
          variant="contained" 
          size= "small" 
          onClick={hndlopenDlg} 
           sx={{ bgcolor: "darkred", color: "#fff", fontWeight: "bold", borderRadius: "20px" }}>
            NutriTips <SpeakerNotesIcon fontSize="small" sx={{ ml: 1 }} />
          </Button>
        </Box>
        <Box sx={{ display: "flex"}}>
        <FormGroup>
  <FormControlLabel 
  control={
  <Switch 
  defaultChecked 
  color="success"
   />} 
   label= "Dia de entrenamiento" />
</FormGroup>
        </Box>
      </Box>

      {/* TABS MENÚS */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={(e, v) => setTabValue(v)}
          centered
          TabIndicatorProps={{
            style: { backgroundColor: "rgb(0, 204, 255)" }
          }}
        >
          {plan.opciones_menu?.map((opcion, index) => (
            <Tab
              key={index}
              label={`Menú ${opcion.opcion}`}
              sx={{
                color: "#fff",
                "&.Mui-selected": {
                  color: "rgb(0, 204, 255)"
                }
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/*  MENÚS */}
      {plan.opciones_menu?.map((opcion, index) =>
        tabValue === index ? (
          <Box key={index} sx={{ p: 3, minHeight: "300px" }}>
            <Grid container spacing={2}>
              {Object.entries(opcion.menu).sort(
                ((a, b)=> ORDEN_COMIDAS.indexOf(a[0]) - ORDEN_COMIDAS.indexOf(b[0]))
              ).map(([nombreComida, comida], comidaIndex) => (
  <Grid item xs={12} sm={6} md={3} key={comidaIndex}>
    <Card
      sx={{
        bgcolor: "#000",
        border: "1px solid #000",
        color: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 183, 255, 0.7)"
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          color="rgb(0, 204, 255)"
          fontWeight="bold"
          gutterBottom
        >
          {nombreComida.toUpperCase()}
        </Typography>
<Typography
    variant="body2"
    color="#fff"
    mt={1}
    mb={2}
    fontStyle="italic"
    fontWeight="bold"
  >
    {comida.nombre}
  </Typography>

  <Typography
    variant="body2"
    color="#bbb"
    mt={1}
    mb={2}
    fontWeight="bold"
    fontStyle="italic"
  >
   Ingredientes:
  </Typography>

  {/* Ingredientes */}
  {Object.entries(comida.ingredientes || {}).sort((a, b) => ORDEN_INGREDIENTES.indexOf(a[0]) - ORDEN_INGREDIENTES.indexOf(b[0])).map(
    ([tipo, items]) => (
      <Box key={tipo} sx={{ mb: 1 }}>
        

        <ul style={{ paddingLeft: "20px", marginTop: 2 }}>
          {items.map((item, i) => (
            <li key={i} style={{ color: "#bbb", fontSize: "15px" }}>
              {formatearIngrediente(item)}
            </li>
          ))}
        </ul>
      </Box>
    )
  )}

  {/* Descripción */}
  <Typography
    variant="body2"
    color="#bbb"
    mt={1}
    fontStyle="italic"
  >
   <strong> Descripcion: </strong> {comida.descripcion}
  </Typography>
      </CardContent>
    </Card>
  </Grid>
))}
<Divider 
orientation="horizontal"
flexItem
sx={{ mt: 2, mb: 2,color: "rgb(0, 204, 255)", borderColor: "rgb(0, 204, 255)" }}/>
<Grid item xs={12} sm={12} md={12}>
  <Box
    sx={{
      p: 2
    }}
  >

    <Dialog
    open={openDlgTips}
  onClose={handleCloseDlg}
  scroll="paper"
  maxWidth="sm"
  fullWidth
    >
      <DialogTitle sx={{ bgcolor: 'rgb(0, 204, 255)', color: '#fff', fontWeight: 'bold', textAlign: 'center'}}>
        RECOMENDACIONES GENERALES
      </DialogTitle>
      <DialogContent dividers sx={{bgcolor: '#000', color: '#fff', textAlign: 'left', p: 6, fontSize: '1.2rem'}}>
        <Typography color="#bbb" sx={{ mt: 1, fontSize: "12px", fontStyle: "italic" }}>
          💧 <strong>Hidratación</strong> 
<br></br>

<ul>Consume entre 35–45 ml de agua por kg de peso corporal al día.
  (Ejemplo: una persona de 70 kg → 2.5 a 3.2 L diarios)</ul>
 <ul>En días de entrenamiento o calor intenso, <strong>aumenta 500–1000 ml adicionales </strong>.</ul>
<ul>Puedes consumir agua natural, mineral o con gas <strong>sin azúcar. </strong></ul>

<strong>☕ Bebidas permitidas</strong>
<br></br>
<ul>Café y té <strong>sin azúcar</strong> están permitidos.</ul>
 <ul>Puedes usar <strong>endulcorantes sin calorías </strong> como <strong>Splenda, Stevia </strong>(en cantidades moderadas).</ul>
<ul> Evita bebidas azucaradas, jugos industriales y refrescos.</ul>

<strong>🍳 Aceites y métodos de cocción</strong>
<br></br>
Prioriza:
<br></br>

  <ul>Aceite de oliva</ul>
  <ul>Aceite de aguacate</ul>
  <ul>Aceite en aerosol (controla mejor las calorías)</ul>
  <ul>Evita frituras profundas</ul>
  <ul>Prefiere métodos como: Plancha, Horno, Air fryer, Vapor</ul>

<strong>🥗 Verduras </strong>
<br></br>

<ul>Las verduras marcadas como “libre / al gusto” pueden consumirse sin restricción.</ul>
<ul>Prioriza variedad y colores (verde, rojo, naranja).</ul>
<ul>Aportan fibra, micronutrientes y mejoran la digestión.</ul>

<strong>🧂 Sal y condimentos</strong>
<br></br>

<ul>Usa sal con moderación.</ul>
<ul>Puedes usar sin problema: Especias, Hierbas, Limón, Vinagre, Ajo, Cebolla, Chile.</ul>
<ul>Evita salsas ultraprocesadas y altas en azúcar.</ul>

<strong>⏰ Horarios</strong>
<br></br>

<ul>No es obligatorio comer a una hora exacta, pero:</ul>
<ul>Mantén horarios consistentes.</ul>
<ul>Evita ayunos prolongados si tu objetivo es hipertrofia.</ul>
<ul>Prioriza proteína distribuida en el día.</ul>

<strong>💪 Entrenamiento y nutrición</strong>
<br></br>

<ul>La nutrición funciona mejor si:</ul>
<ul>Duermes 7 / 9 horas.</ul>
<ul>Entrenas con sobrecarga progresiva, segun tu plan de entrenamiento asignado.</ul>
<ul>Sigues el plan al menos 80–90% del tiempo.</ul>

<strong>📌 Constancia mejor que perfección</strong>
<br></br>

<ul>Un dia fuera del plan no arruina el progreso.</ul>
<ul>La clave es la adherencia a largo plazo.</ul>

        </Typography>
      </DialogContent>
      <DialogActions justifyContent="center" sx={{ bgcolor: "#000" }}>
  <Button
    onClick={handleCloseDlg}
    variant="contained"
    color="error"
    sx={{
      bgcolor: "darkred",
      color: "#fff",
      fontWeight: "bold",
      borderRadius: "20px",
      justifyContent: "center",
      "&:hover": {
        bgcolor: "darkred",
        color: "#fff",
      },
    }}
  >
    Cerrar
  </Button>
</DialogActions>

    </Dialog>
  </Box>
</Grid>

            </Grid>
          </Box>
        ) : null
      )}
    </>
  );
}
