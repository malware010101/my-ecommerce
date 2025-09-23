// src/ContentApp/SuscriptionApp/StripeForm.jsx
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Box, Typography } from '@mui/material';

const StripeForm = ({ onPaymentSuccess, plan, email, user_id }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        console.log('Datos enviados al backend:', { plan, email, user_id });

        if (!stripe || !elements) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/payments/create-subscription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plan, email, user_id }),
            });

            const { client_secret } = await response.json();

            const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret);
               
            
            if (error) {
                console.error(error.message);
                alert(error.message);
                setLoading(false);
            } else if (paymentIntent.status === "succeeded") {
                console.log("Pago exitoso:", paymentIntent);
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