import React, { useState } from 'react';
import { Box, Button, Container } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import PlanCards from './PlanCards';
import RegistroForm from './RegistroForm';
import StripeForm from '../LoginApp/StripeForm';
import { useNavigate } from "react-router-dom";

export default function SuscriptionApp() {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [userData, setUserData] = useState({ email: '', plan: '', userId: null });

    const steps = ['Registro', 'Selección de plan', 'Pago'];

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const hndlRegistrar = (email, userId) => {
        setUserData({ ...userData, email: email, userId: userId });
        handleNext(); 
    };

    const hndlSeleccionarPlan = (plan) => {
        setUserData({ ...userData, plan: plan });
        handleNext(); 
    };

    const hndlPaymentExitoso = () => {
        navigate('/apptraining/login');
    };

    const getStepContent = (step) => {
        if (step === 0) {
            return <RegistroForm onNext={hndlRegistrar} />;
        } else if (step === 1) {
            return <PlanCards onSelectPlan={hndlSeleccionarPlan} />;
        } else if (step === 2) {
            return <StripeForm plan={userData.plan} email={userData.email} user_id={userData.userId} onPaymentSuccess={hndlPaymentExitoso} />;
        } else {
            return 'Paso desconocido';
        }
    };

    return (
        <Container maxWidth="lg" >
            <Stepper
             activeStep={activeStep}
             sx={{
                '& .MuiStepLabel-root .Mui-completed': {
                    color: 'rgb(0, 179, 255)', // Color del texto de los pasos completados
                },
                '& .MuiStepLabel-root .Mui-active': {
                    color: 'rgb(0, 179, 255)', 
                },
                '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel': {
                    color: 'rgb(0, 179, 255)', 
                },
                '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel': {
                    color: 'rgb(0, 179, 255)', 
                },
                '& .MuiStepIcon-root.Mui-completed': {
                    color: 'rgb(0, 179, 255)', 
                },
                '& .MuiStepIcon-root.Mui-active': {
                    color: 'rgb(0, 179, 255)', 
                },
            }}
             >
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel
                        
                        >
                            {label}
                            </StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box>
                {getStepContent(activeStep)}
            </Box>
        </Container>
    );
}