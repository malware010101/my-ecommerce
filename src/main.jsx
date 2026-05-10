// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RecoilRoot } from 'recoil'; 
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AuthProvider } from './ContentApp/AuthContext/index.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';

// Tu clave pública de Stripe, siempre empieza con 'pk_'
const stripePromise = loadStripe('pk_test_51S9zBKEyobt1BZsUymJKXirQqGk11OZWiJLz0JzvlUn3XxgAkxJGkXE90UIXO6D1EpjnYBsXPdVH3ttShr23T0gN00z3aSpjMq');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <RecoilRoot>
        <Elements stripe={stripePromise}>
          <AuthProvider>
            <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            >
          <App />
          </SnackbarProvider>
          </AuthProvider>
        </Elements>
      </RecoilRoot>
    </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);