// src/ContentApp/SuscriptionApp/StripeForm.jsx
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Box, Typography } from '@mui/material';

const StripeForm = ({ onPaymentSuccess, plan, email, name, password }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log('Datos enviados al backend:', { plan, email, name, password });

    if (!stripe || !elements) {
        setLoading(false);
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:8001/payments/create-subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ plan, email, name, password }),
        });
        
        const responseData = await response.json(); 
        console.log("Respuesta BACKEND:", responseData);


        if (!response.ok) {
             throw new Error(responseData.detail || "Error al crear la suscripción.");
        }
        
        if (responseData.status === "success_delegated") {
            // Caso B: Stripe resolvió el pago instantáneamente. 
            // El Webhook ya se está encargando del registro.
            console.log("Suscripción creada. Pago completo sin confirmación adicional. Delegando el registro al Webhook.");
            onPaymentSuccess(); // <-- Redirigir al login/éxito
            return; 
        }

        // CASO A: Se obtuvo el client_secret, requiere confirmación del frontend.
        const { client_secret } = responseData; // Desestructuramos si no fue "success_delegated"

        const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    email: email, 
                    name: name,   
                },
            }
        });
           
        
        if (error) {
            console.error(error.message);
            alert(error.message);
        } else if (paymentIntent.status === "succeeded") {
            console.log("Pago exitoso: El usuario se ha suscrito correctamente.");
             onPaymentSuccess();
        }
    } catch (error) {
        console.error("Error al procesar el pago:", error);
        alert("Ocurrió un error. Intenta de nuevo.");
    } finally {
        setLoading(false);
    }
};


    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
                Ingresa tus datos de pago
            </Typography>
            <Box
                sx={{
                    p: 2,
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    bgcolor: '#fff',
                }}
            >
                <CardElement />
            </Box>
            <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                    mt: 3,
                    bgcolor: 'rgb(0, 179, 255)',
                    '&:hover': { bgcolor: 'rgb(0, 179, 255)' },
                }}
                disabled={!stripe || loading}
            >
                {loading ? 'Procesando...' : 'Pagar Suscripción'}
            </Button>
        </Box>
    );
};

export default StripeForm;