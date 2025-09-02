import { Box, Container, Typography, Grid } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import TabsGnrl from "./TabsGnrl";
import CardSupls from "./CardSupls";
import { useEffect, useState } from "react";
import { productSupls, hndlAgregarAlCarrito } from "../../Utils/Helper";
import { useNavigate, useParams } from "react-router-dom";

export default function Supplements() {
  const navigate = useNavigate();
  const { category } = useParams();
  const [tabActivo, setTabActivo] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Etiquetas de productos para cada tab
  const tabLabels = ['All' ,"Proteins", "Pre-workouts", "Creatine"];

  useEffect(() => {
    if (category) {
      if (category.toLowerCase() === 'all') {
        setTabActivo(0);
      } else {
        const categoryIndex = tabLabels.findIndex(label => label.toLowerCase() === category.toLowerCase());
        if (categoryIndex !== -1) {
          setTabActivo(categoryIndex);
        }
      }
    }
  }, [category, tabLabels]); 

  const handleTabChange = (event, newValue) => {
    const newCategory = tabLabels[newValue].toLowerCase().replace(/\s/g, '-');
    navigate(`/supplements/${newCategory}`);
  };

  // Función para filtrar los productos según la pestaña activa
  const getProductsForTab = () => {
    const currentTabLabel = tabLabels[tabActivo];
    if (currentTabLabel === 'All') {
        return productSupls;
    }
    return productSupls.filter(product => product.type === currentTabLabel);
};

  return (
    <Container maxWidth="xl" disableGutters>
      {/* Banner superior */}
      <Box
        sx={{
          width: "100%",
          height: isMobile ? 200 : 400,
          backgroundImage: `url('/ruta/de/tu/imagen.jpg')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Contenido */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 3,
          px: isMobile ? 1 : 0,
          color: "text.primary",
          bgcolor: "rgba(0,0,0,0.5)",
          borderRadius: 2,
          mt: -5,
        }}
      >
        <Typography
          variant={isMobile ? "h4" : "h3"}
          gutterBottom
          sx={{ fontWeight: "bold", fontFamily: "serif", textAlign: "center" }}
        >
          SUPLEMENTOS
        </Typography>
        <Box sx={{ width: "100%", mt: 2, justifyContent: "center", alignItems: "center", display: "flex"}}>
          {/* Debes pasar el estado y el manejador a TabsGnrl */}
          <TabsGnrl value={tabActivo} onChange={handleTabChange} />
        </Box>

        {/* Esta es la nueva parte: el contenedor para las tarjetas */}
        <Grid container spacing={2} sx={{ mt: 4, justifyContent: "center" }}>
          {getProductsForTab().map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <CardSupls
                product={product}
                 onAddToCart={hndlAgregarAlCarrito}
                 basePath= "supplements"
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}