import { Box, Card, CardActions, CardContent, Button, Chip, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../State/Order/Action";
import { useNavigate } from "react-router-dom";

const DeliveryAddressForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { auth } = useSelector((store) => store);

    const [selectedAddress, setSelectedAddress] = useState(null);
    const address = auth.user?.address;  // This will contain all the addresses

    const handleAddressSelect = (address) => {
        setSelectedAddress(address);  // Set the selected address when clicked
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        // If no address is selected, use the form data
        const address = selectedAddress || {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            streetAddress: data.get("address"),
            city: data.get("city"),
            state: data.get("state"),
            zipCode: data.get("zip"),
            mobile: data.get("phoneNumber"),
        };

        // Ensure that navigate is passed to the action
        const orderData = { address, navigate };
        dispatch(createOrder(orderData)); // Dispatch action with the navigate function
    };

    return (
        <div className="p-4">
            <Grid container justifyContent="center" spacing={3}>
                {/* Render this only if there are addresses */}
                {address?.length > 0 && (
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Box
                            sx={{
                                maxHeight: 440,  // Fixed height for scrollable area
                                overflowY: 'auto',  // Make the container scrollable vertically
                                border: '1px solid #E0E0E0', // Light border for subtle separation
                                borderRadius: 2,
                                padding: 2,
                                background: '#defffe', // Soft cool gradient (light blue to teal)
                                boxShadow: 1,
                                '&:hover': {
                                    boxShadow: 3, // Slightly elevated shadow on hover
                                }
                            }}
                        >
                            {/* Render all addresses */}
                            {address.map((address) => (
                                <Card
                                    key={address.id}
                                    sx={{
                                        width: 250,
                                        margin: 2,
                                        cursor: 'pointer',
                                        border: selectedAddress?.id === address.id ? '2px solid #A1C6EA' : '1px solid #E0E0E0', // Light blue for selected
                                        background: 'linear-gradient(135deg, #F0E6F6 40%, #E3F6F1 100%)',  // Soft pastel peach to mint green gradient
                                        boxShadow: 1,
                                        borderRadius: 2, // Rounded corners
                                        transition: 'transform 0.3s, box-shadow 0.3s, background-color 0.3s', // Smooth hover effects
                                        '&:hover': {
                                            transform: 'scale(1.02)', // Slight scale on hover
                                            boxShadow: 3, // Slight shadow increase on hover
                                            background: 'linear-gradient(135deg, #F0E6F6 40%, #E3F6F1 100%)',  // Soft pastel peach to mint green gradient
                                        },
                                    }}
                                    onClick={() => handleAddressSelect(address)}
                                >
                                    <CardContent>
                                        <Typography variant="h6" sx={{ color: '#000000' }}> {/* Darker text for name, but still soft */}
                                            {address.firstName} {address.lastName}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#000000' }}> {/* Light gray for address */}
                                            {address.streetAddress}, {address.city}, {address.state}, {address.zipCode}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#000000' }}> {/* Light gray for mobile */}
                                            {address.mobile}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    </Grid>
                )}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Box sx={{
                        padding: 4,
                        borderRadius: 3,
                        boxShadow: 6,
                        backgroundColor: '#ffffff',
                        margin: 'auto',
                        background: 'linear-gradient(135deg, #F0E6F6 40%, #E3F6F1 100%)', // Gradient color applied here
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': { transform: 'translateY(-5px)', boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' }
                    }}>
                        <Typography variant="h5" align="center" sx={{ fontWeight: '700', mb: 3, color: '#5E4B8B' }}>
                            Delivery Address
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                {/* Form fields */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        name="firstName"
                                        label="First Name"
                                        fullWidth
                                        value={selectedAddress ? selectedAddress.firstName : ''}
                                        onChange={(e) => setSelectedAddress({ ...selectedAddress, firstName: e.target.value })}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        name="lastName"
                                        label="Last Name"
                                        fullWidth
                                        value={selectedAddress ? selectedAddress.lastName : ''}
                                        onChange={(e) => setSelectedAddress({ ...selectedAddress, lastName: e.target.value })}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Grid>
                                {/* Other form fields */}
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        name="address"
                                        label="Street Address"
                                        fullWidth
                                        multiline
                                        rows={2}
                                        value={selectedAddress ? selectedAddress.streetAddress : ''}
                                        onChange={(e) => setSelectedAddress({ ...selectedAddress, streetAddress: e.target.value })}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        name="city"
                                        label="City"
                                        fullWidth
                                        value={selectedAddress ? selectedAddress.city : ''}
                                        onChange={(e) => setSelectedAddress({ ...selectedAddress, city: e.target.value })}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        name="state"
                                        label="State/Region"
                                        fullWidth
                                        value={selectedAddress ? selectedAddress.state : ''}
                                        onChange={(e) => setSelectedAddress({ ...selectedAddress, state: e.target.value })}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        name="zip"
                                        label="Zip / Postal Code"
                                        fullWidth
                                        value={selectedAddress ? selectedAddress.zipCode : ''}
                                        onChange={(e) => setSelectedAddress({ ...selectedAddress, zipCode: e.target.value })}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        name="phoneNumber"
                                        label="Phone"
                                        fullWidth
                                        value={selectedAddress ? selectedAddress.mobile : ''}
                                        onChange={(e) => setSelectedAddress({ ...selectedAddress, mobile: e.target.value })}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Grid>
                                {/* Submit Button */}
                                <Grid item xs={12}>
                                    <Button
                                        sx={{
                                            py: 1.5,
                                            mt: 3,
                                            bgcolor: "#5E4B8B",
                                            color: "white",
                                            "&:hover": { bgcolor: "#4c3a72" },
                                            borderRadius: 2,
                                            boxShadow: 3
                                        }}
                                        size="large"
                                        variant="contained"
                                        type="submit"
                                        fullWidth
                                    >
                                        Deliver Here
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default DeliveryAddressForm;
