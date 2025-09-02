// En DetalleProductos.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Paper, Container } from "@mui/material";
import ImgGaleria from "../../components/ImgGaleria";
import InfoProductos from "../../components/InfoProductos";
import { productClothes, productSupls } from "../../Utils/Helper";

export default function DetalleProductos() {
    const { id } = useParams();
    const [ product, setProduct ] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);

    useEffect(() => {
        const allProducts = [...productSupls, ...productClothes];
        const foundProduct = allProducts?.find(p => p?.id === parseInt(id));
        setProduct(foundProduct);
        if (foundProduct?.variants) {
            setSelectedVariant(foundProduct.variants[0]);
        }
    }, [id]);

    if (!product || !selectedVariant) {
        return <p>Producto no encontrado o cargando...</p>;
    }

    return (
         <Container maxWidth='lg' sx={{ py: 5 }}>
             <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
                <Box sx={{ flex: 1 }}>
                    <Paper elevation={5} sx={{ p: 2, height: '100%', bgcolor: '#fff', borderRadius: '10px' }}>
                        <ImgGaleria
                            product={product}
                            selectedVariant={selectedVariant}
                            setSelectedVariant={setSelectedVariant}
                        />
                    </Paper>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Paper elevation={5} sx={{ p: 2, height: '100%', bgcolor: '#fff', borderRadius: '10px' }}>
                        <InfoProductos product={product} selectedVariant={selectedVariant} />
                    </Paper>
                </Box>
            </Box>
        </Container>
    );
};