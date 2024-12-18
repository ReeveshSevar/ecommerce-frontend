import { Grid, Button, TextField, Typography, Box, InputAdornment, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../State/Auth/Action';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Importing the visibility icons

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const userData = {
            email: data.get("email"),
            password: data.get("password"),
        };
        dispatch(login(userData));
    };

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev); // Toggle password visibility
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault(); // Prevents the mouse down event from doing anything (preventing focus loss)
    };

    return (
        <Box sx={{
            backgroundColor: '#F9F9FB',
            padding: '3rem 2rem',
            borderRadius: '20px',
            boxShadow: 5,
            maxWidth: '500px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, #E6D7F5 30%, #F9F9FB 100%)', // Light purple gradient
        }}>
            {/* Title */}
            <Typography variant="h4" align="center" sx={{
                color: '#6C63FF',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                fontFamily: 'Poppins, sans-serif',
            }}>
                Welcome Back
            </Typography>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {/* Email */}
                    <Grid item xs={12}>
                        <TextField
                            required
                            type='email'
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            autoComplete='email'
                            variant="outlined"
                            sx={{
                                '& .MuiInputLabel-root': { color: '#6C63FF' }, // Soft purple label
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#D0C9E2' }, // Subtle border color
                                    '&:hover fieldset': { borderColor: '#6C63FF' }, // Hover effect
                                    '&.Mui-focused fieldset': { borderColor: '#6C63FF' }, // Focused effect
                                },
                            }}
                        />
                    </Grid>

                    {/* Password */}
                    <Grid item xs={12}>
                        <TextField
                            required
                            type={showPassword ? 'text' : 'password'} // Toggle between text and password input types
                            id="password"
                            name="password"
                            label="Password"
                            fullWidth
                            autoComplete='password'
                            variant="outlined"
                            sx={{
                                '& .MuiInputLabel-root': { color: '#6C63FF' }, // Soft purple label
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#D0C9E2' }, // Subtle border color
                                    '&:hover fieldset': { borderColor: '#6C63FF' }, // Hover effect
                                    '&.Mui-focused fieldset': { borderColor: '#6C63FF' }, // Focused effect
                                },
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            sx={{ color: '#5A4E9E' }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />} {/* Eye icon */}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    {/* Login Button */}
                    <Grid item xs={12}>
                        <Button
                            type='submit'
                            variant='contained'
                            size='large'
                            sx={{
                                backgroundColor: '#6C63FF', // Soft purple background
                                color: 'white',
                                padding: '1rem',
                                '&:hover': { backgroundColor: '#5A52D4' }, // Darker purple on hover
                                width: '100%',
                                borderRadius: '10px',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
                            }}
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>

            {/* Register Link */}
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <Typography variant="body2" color="textSecondary" sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                }}>
                    Don't have an account? 
                    <Button
                        onClick={() => navigate("/register")}
                        sx={{
                            color: '#6C63FF',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            marginLeft: '0.5rem',
                            '&:hover': { color: '#5A52D4' },
                        }}
                    >
                        Register
                    </Button>
                </Typography>
            </div>
        </Box>
    );
};

export default LoginForm;
