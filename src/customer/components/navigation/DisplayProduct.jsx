import { Button, MenuItem, Select, InputLabel, FormControl, Slider, TextField } from '@mui/material';
import React, { useState } from 'react';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';

const DisplayProduct = ({ product }) => {
    const navigate = useNavigate();

    // State for filter options
    const [selectedColor, setSelectedColor] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(25000); // Set initial max price to some default
    const [minDiscount, setMinDiscount] = useState(0);
    const [maxDiscount, setMaxDiscount] = useState(100); // Max discount can be 100%

    // Filter the products based on selected filters
    const filteredProducts = product.filter((item) => {
        const matchesColor = selectedColor ? item.color === selectedColor : true;
        const matchesPrice = item.discountedPrice >= minPrice && item.discountedPrice <= maxPrice;
        const matchesDiscount = item.discountPercent >= minDiscount && item.discountPercent <= maxDiscount;
        return matchesColor && matchesPrice && matchesDiscount;
    });

    const handlePurchase = (productId) => {
        navigate(`/product/${productId}`);
    };

    const handlePriceChange = (event, newValue) => {
        setMinPrice(newValue[0]);
        setMaxPrice(newValue[1]);
    };

    const handleDiscountChange = (event, newValue) => {
        setMinDiscount(newValue[0]);
        setMaxDiscount(newValue[1]);
    };

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
    };

    const handleMinDiscountChange = (event) => {
        setMinDiscount(event.target.value);
    };

    const handleMaxDiscountChange = (event) => {
        setMaxDiscount(event.target.value);
    };

    return (
        <div className="flex">
            {/* Filter Section */}
            <div className="filter-section h-[88vh] w-full sm:w-1/4 p-2 bg-gradient-to-r from-indigo-100 via-blue-100 to-green-100 rounded-lg shadow-lg">
                <h3 className="font-semibold text-gray-700 mb-2 text-sm">Filters</h3>

                {/* Color Filter */}
                <FormControl fullWidth variant="outlined" className="mb-3">
                    <InputLabel className="text-gray-700">Color</InputLabel>
                    <Select
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        label="Color"
                        className="bg-white text-gray-800 rounded-md shadow-sm"
                    >
                        <MenuItem value="">
                            <span className="text-xs text-gray-600">All Colors</span>
                        </MenuItem>
                        {/* Map over unique colors */}
                        {Array.from(new Set(product.map((item) => item.color))).map((color, index) => (
                            <MenuItem key={index} value={color}>
                                <span className="text-xs">{color}</span>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>


                {/* Price Range Filter */}
                <div className="mb-3">
                    <label htmlFor="priceRange" className="block text-gray-700 text-xs mb-1">Price Range (₹)</label>
                    <Slider
                        value={[minPrice, maxPrice]}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `₹${value}`}
                        min={0}
                        max={25000} // Assuming 5000 is the max price
                        step={100}
                        aria-labelledby="price-range"
                        sx={{
                            color: '#2F363F', // Change slider color
                            '& .MuiSlider-thumb': {
                                width: 12, // Small thumb circle
                                height: 12, // Small thumb circle
                                backgroundColor: '#616C6F', // Green thumb color
                                border: '2px solid #fff', // White border around thumb
                            },
                            '& .MuiSlider-rail': {
                                backgroundColor: '#2F363F', // Light grey rail color
                            },
                            '& .MuiSlider-track': {
                                backgroundColor: '#EAF0F1', // Green active track color
                            },
                        }}
                    />
                    <div className="flex justify-between text-xs mt-1">
                        <TextField
                            type="number"
                            label="Min Price"
                            value={minPrice}
                            onChange={handleMinPriceChange}
                            className="w-1/2 mr-1"
                            variant="outlined"
                            size="small"
                        />
                        <TextField
                            type="number"
                            label="Max Price"
                            value={maxPrice}
                            onChange={handleMaxPriceChange}
                            className="w-1/2 ml-1"
                            variant="outlined"
                            size="small"
                        />
                    </div>
                </div>

                {/* Discount Percent Filter */}
                <div className="mb-3">
                    <label htmlFor="discountRange" className="block text-gray-700 text-xs mb-1">Discount Range (%)</label>
                    <Slider
                        value={[minDiscount, maxDiscount]}
                        onChange={handleDiscountChange}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `${value}%`}
                        min={0}
                        max={100}
                        step={1}
                        aria-labelledby="discount-range"
                        sx={{
                            color: '#2F363F', // Change slider color for discount range
                            '& .MuiSlider-thumb': {
                                width: 12, // Small thumb circle
                                height: 12, // Small thumb circle
                                backgroundColor: '#616C6F', // Red thumb color
                                border: '2px solid #fff', // White border around thumb
                            },
                            '& .MuiSlider-rail': {
                                backgroundColor: '#E0E0E0', // Light grey rail color
                            },
                            '& .MuiSlider-track': {
                                backgroundColor: '#EAF0F1', // Red active track color
                            },
                        }}
                    />
                    <div className="flex justify-between text-xs mt-1">
                        <TextField
                            type="number"
                            label="Min Discount"
                            value={minDiscount}
                            onChange={handleMinDiscountChange}
                            className="w-1/2 mr-1"
                            variant="outlined"
                            size="small"
                        />
                        <TextField
                            type="number"
                            label="Max Discount"
                            value={maxDiscount}
                            onChange={handleMaxDiscountChange}
                            className="w-1/2 ml-1"
                            variant="outlined"
                            size="small"
                        />
                    </div>
                </div>

                {/* Filter Button */}
                <div className="w-full mt-3">
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={() => { }}
                        style={{
                            background: 'linear-gradient(60deg, #A3D8F4, #A8D5BA)', // Light gradient background
                            color: 'white',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            padding: '8px 16px',
                        }}
                        className="transition-all hover:opacity-90 hover:scale-105 hover:shadow-lg"
                    >
                        Apply Filters
                    </Button>
                </div>
            </div>

            {/* Display Filtered Products */}
            <div className="product-list w-full flex flex-wrap justify-center">
                {filteredProducts.map((item) => (
                    <div
                        onClick={() => navigate(`/product/${item.id}`)}
                        className="productCard transition-all cursor-pointer border rounded-2xl"
                        key={item.id}
                    >
                        <div className="h-[14rem] w-[12rem] mt-1 ml-1 rounded-lg">
                            <img
                                className="h-full w-full object-cover object-top justify-center rounded-2xl"
                                src={`data:image/jpeg;base64,${item.image}`}
                                alt=""
                            />
                        </div>
                        <div className="textPart bg-white p-3">
                            <div>
                                <p className="font-bold opacity-60 text-sm">{item.brand}</p>
                                <p className="text-sm">{item.title.slice(0, 20)}...</p>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                                <p className="font-semibold">₹{item.discountedPrice}</p>
                                <p className="line-through opacity-50">{item.price}</p>
                                <p className="text-green-600 font-semibold">{item.discountPercent}% off</p>
                            </div>
                            <div className="w-full flex justify-center">
                                <Button
                                    variant="contained"
                                    onClick={() => handlePurchase(item.id)}
                                    style={{
                                        background: 'linear-gradient(60deg, #bd8cf5, #7acff5)', // Darker pink and blue gradient
                                        width: '13rem',
                                        color: 'white',
                                        borderRadius: '8px', // Rounded corners
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        padding: '10px 20px', // Increased padding
                                        transition: 'all 0.3s ease-in-out', // Smooth transition
                                    }}
                                    className="hover:opacity-90 hover:scale-105 hover:shadow-xl transition-all duration-300"
                                >
                                    Shop Now
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DisplayProduct;
