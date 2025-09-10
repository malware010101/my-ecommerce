import { Box, Button, Container, Typography } from "@mui/material";

export default function Nutrition () {
    return (
        <Container maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3, p: 2
            }}>
                <Typography variant="h4"  fontWeight={'bold'} color= {'#ccc'} >¡Bienvenido a tu nutricion!</Typography>
            </Box>
            <Box sx={{ display: 'column', justifyContent: 'center', alignItems: 'center', mt: 3, borderRadius: '10px ', border: '1px solid #2a2f33',bgcolor: '#000', p: 1, boxShadow: '0 4px 10px rgba(0, 183, 255, 0.7)'
            }}>
                <Typography variant="h6"  color= {'#fff'} textAlign={'left'} padding={'10px'}  >Para calcular tu plan alimenticio, es necesario que respondas el siguiente formulario, para calcular tus macronutrientes, basado en tus datos y objetivo a lograr.<br></br> 
                Es Importante tener tu información actualizada de peso en kg, indice de masa corporal, indice de masa muscular e indice de grasa corporal con el fin de obtener plan nutricional adecuado y preciso.</Typography>
                <Button variant="contained" sx={{ mt: 2,ml: 1,bgcolor: 'rgb(0, 204, 255)', color: '#fff', fontWeight: 'bold',borderRadius: '10px',mb: 2 }}>Responder</Button>
            </Box>
           
        </Container>
    )
}