import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import DeliveryAddressForm from './DeliveryAddressForm';
import OrderSummary from './OrderSummary';

const steps = ['Login', 'Delivery Address', 'Order Summary', 'Payment'];

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const location = useLocation();
  const querySearch = new URLSearchParams(location.search);
  const step = querySearch.get("step");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="px-6 lg:px-10 mt-5">
      <Box sx={{
        width: '100%',
        backgroundColor: '#ffffff', // Light background for a clean aesthetic
        borderRadius: '12px', // Rounded corners for smooth appearance
        padding: '30px',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)', // Soft, modern shadow
        backgroundImage: 'linear-gradient(to right, #f0f4f8, #e2e8f0)', // Subtle gradient background
      }}>
        <Stepper activeStep={parseInt(step)} alternativeLabel>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel sx={{
                  fontWeight: 'bold',
                  fontSize: '16px',
                  color: index === activeStep ? '#4A90E2' : '#B0BEC5', // Modern colors
                  '& .MuiStepLabel-label': {
                    textTransform: 'capitalize',
                  },
                }}>
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mb: 2, fontSize: '18px', fontWeight: '500', color: '#4A90E2' }}>
              All steps completed - you're finished!
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="mt-8">
              {step === '2' ? <DeliveryAddressForm /> : <OrderSummary />}
            </div>            
          </React.Fragment>
        )}
      </Box>
    </div>
  );
}
