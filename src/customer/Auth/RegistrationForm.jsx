import { Grid, Button, TextField, Typography, Box, InputAdornment, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser, register } from '../../State/Auth/Action';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Importing visibility icons

const RegistrationForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector(store => store);

    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt));
        }
    }, [jwt, auth.jwt]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const userData = {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            email: data.get("email"),
            password: data.get("password"),
            mobile: data.get("mobile")
        };
        dispatch(register(userData));
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
                color: '#2E1D78', // Dark purple text color for the title
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                fontFamily: 'Poppins, sans-serif',
            }}>
                Create Your Account
            </Typography>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {/* First Name */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            fullWidth
                            autoComplete='given-name'
                            variant="outlined"
                            sx={{
                                '& .MuiInputLabel-root': { color: '#5A4E9E' }, // Soft lavender label
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#D0C9E2' }, // Subtle border color
                                    '&:hover fieldset': { borderColor: '#6C63FF' }, // Hover effect
                                    '&.Mui-focused fieldset': { borderColor: '#6C63FF' }, // Focused effect
                                },
                            }}
                        />
                    </Grid>

                    {/* Last Name */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            fullWidth
                            autoComplete='family-name'
                            variant="outlined"
                            sx={{
                                '& .MuiInputLabel-root': { color: '#5A4E9E' }, // Soft lavender label
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#D0C9E2' }, // Subtle border color
                                    '&:hover fieldset': { borderColor: '#6C63FF' }, // Hover effect
                                    '&.Mui-focused fieldset': { borderColor: '#6C63FF' }, // Focused effect
                                },
                            }}
                        />
                    </Grid>

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
                                '& .MuiInputLabel-root': { color: '#5A4E9E' }, // Soft lavender label
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#D0C9E2' }, // Subtle border color
                                    '&:hover fieldset': { borderColor: '#6C63FF' }, // Hover effect
                                    '&.Mui-focused fieldset': { borderColor: '#6C63FF' }, // Focused effect
                                },
                            }}
                        />
                    </Grid>
                     {/* Mobile */}
                     <Grid item xs={12}>
                        <TextField
                            required
                            type='mobile'
                            id="mobile"
                            name="mobile"
                            label="Mobile"
                            fullWidth
                            autoComplete='mobile'
                            variant="outlined"
                            sx={{
                                '& .MuiInputLabel-root': { color: '#5A4E9E' }, // Soft lavender label
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
                                '& .MuiInputLabel-root': { color: '#5A4E9E' }, // Soft lavender label
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

                    {/* Register Button */}
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
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </form>

            {/* Login Link */}
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <Typography variant="body2" sx={{
                    color: '#5A4E9E', // Muted lavender for secondary text
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                }}>
                    Already have an account?
                    <Button
                        onClick={() => navigate("/login")}
                        sx={{
                            color: '#6C63FF',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            marginLeft: '0.5rem',
                            '&:hover': { color: '#5A52D4' },
                        }}
                    >
                        Login
                    </Button>
                </Typography>
            </div>
        </Box>
    );
};

export default RegistrationForm;
