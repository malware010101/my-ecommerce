// src/ContentApp/SuscriptionApp/StripeForm.jsx
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Box, Typography } from '@mui/material';
import api from '../../api';
import { enqueueSnackbar } from 'notistack';

const StripeForm = ({ onPaymentSuccess, plan, email, name, password }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
        setLoading(false);
        return;
    }

    try {
        const { data: responseData } = await api.post(
            "/payments/create-subscription",
            {
                plan,
                email,
                name,
                password,
            }
        );


        if (responseData.status === "success_delegated") {

            enqueueSnackbar('Pago completado', { variant: 'success' });
            onPaymentSuccess();
            
            return;
        }

        const { client_secret } = responseData;

        const { error, paymentIntent } =
            await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        email,
                        name,
                    },
                },
            });

        if (error) {
           enqueueSnackbar(error.message, { variant: 'error' });
        } else if (paymentIntent.status === "succeeded") {
            enqueueSnackbar('Pago completado', { variant: 'success' });
            onPaymentSuccess();
        }

    } catch (error) {
        console.error();
        enqueueSnackbar(error?.response?.data?.detail ||
        error?.message ||
        "Error al procesar el pago", { variant: 'error' });
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