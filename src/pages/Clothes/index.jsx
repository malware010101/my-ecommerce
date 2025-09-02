import { Box, Container, Typography, Grid } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { hndlAgregarAlCarrito, productClothes } from "../../Utils/Helper";
import TabsClothes from "./TabsClothes";
import CardClothes from "./CardClothes";

export default function Clothes() {
  const { category } = useParams();
  const [tabActivo, setTabActivo] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const tabLabels = ["All", "T-Shirts", "Pants", "Sets", "Accessories"];
  const genderCategories = ["mens", "womens", "unisex"];

  useEffect(() => {
    // Si la URL es una categoría de género, activa la pestaña "All" (índice 0).
    if (genderCategories.includes(category)) {
      setTabActivo(0);
      return;
    }
    // Si la URL es una categoría de producto (ej. 't-shirts'), activa esa pestaña.
    const categoryIndex = tabLabels.findIndex(label => label.toLowerCase().replace(/\s/g, '-') === category);
    if (categoryIndex !== -1) {
      setTabActivo(categoryIndex);
    }
  }, [category, tabLabels]);

  const handleTabChange = (event, newValue) => {
    const newCategory = tabLabels[newValue].toLowerCase().replace(/\s/g, '-');
    navigate(`/clothes/${newCategory}`);
  };
  
  const getProductsForTab = () => {
    const currentTabLabel = tabLabels[tabActivo];
    const isGenderCategory = genderCategories.includes(category);
    
    let filteredByGender = productClothes;
    // Si la URL tiene una categoría de género, filtra por ese genero
    if (isGenderCategory) {
      filteredByGender = productClothes.filter(product => product.gender.toLowerCase() === category);
    }

    // Si la pestaña activa es "All", devuelve los productos filtrados por genero (o todos si no hay filtro de género).
    if (currentTabLabel.toLowerCase() === "all") {
      return filteredByGender;
    }

    // Si no es "All", filtra los productos por el tipo de producto.
    return filteredByGender.filter(product => product.type === currentTabLabel);
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
          CLOTHES
        </Typography>
        <Box sx={{ width: "100%", mt: 2, justifyContent: "center", alignItems: "center", display: "flex"}}>
          <TabsClothes value={tabActivo} onChange={handleTabChange} tabLabels={tabLabels} />
        </Box>

        <Grid container spacing={2} sx={{ mt: 4, justifyContent: "center" }}>
          {getProductsForTab().map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <CardClothes
                product={product}
                onAddToCart={hndlAgregarAlCarrito}
                basePath= 'clothes'
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}