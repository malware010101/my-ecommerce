import { useState } from "react";
import {
  Box,
  Grid,
  Tabs,
  Tab,
  Typography,
  Card,
  CardContent
} from "@mui/material";

export default function NutriViewer({ plan }) {
  const [tabValue, setTabValue] = useState(0);

  if (!plan) return null;

  return (
    <>
      <Typography
        variant="h5"
        color="#fff"
        textAlign="center"
        mb={2}
        fontWeight="bold"
      >
        Plan Nutricional
      </Typography>

      {/* MACROS */}
      <Grid container spacing={2} sx={{ mb: 4, textAlign: "center" }}>
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              p: 2,
              bgcolor: "#17343d",
              borderRadius: "8px",
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

        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              p: 2,
              bgcolor: "#17343d",
              borderRadius: "8px",
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

        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              p: 2,
              bgcolor: "#17343d",
              borderRadius: "8px",
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

        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              p: 2,
              bgcolor: "#17343d",
              borderRadius: "8px",
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
              {opcion.menu.map((comida, comidaIndex) => (
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
                        {comida.comida}
                      </Typography>

                      <ul
                        style={{
                          listStyleType: "disc",
                          paddingLeft: "20px"
                        }}
                      >
                        {comida.alimentos.map((alimento, alimentoIndex) => (
                          <li key={alimentoIndex} style={{ color: "#fff" }}>
                            {alimento.nombre} - {alimento.gramos} g
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : null
      )}
    </>
  );
}
