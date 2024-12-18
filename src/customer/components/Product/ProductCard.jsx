import React from 'react'
import "./ProductCard.css"
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

export const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const handlePurchase = () => {
        navigate(`/product/${product.id}`)
    };
    return (
        <div onClick={() => navigate(`/product/${product.id}`)} className='productCard p-1 rounded-3xl w-[12rem] m-3 transition-all cursor-pointer border'>
            <div className='h-[15rem]'>
                <img className='h-full w-full object-cover object-left-top rounded-3xl'
                    src={`data:image/jpeg;base64,${product.image}`} 
                    alt=''
                />
            </div>
            <div className='textPart bg-white p-2'>
                <div>
                    <p className='font-bold opacity-60 text-sm'>{product.brand}</p>
                    <p className='text-sm'>{product.title.slice(0, 21)}...</p>
                </div>
                <div className='flex items-center space-x-2 text-sm'>
                    <p className='font-semibold'>₹{product.discountedPrice}</p>
                    <p className='line-through opacity-50'>{product.price}</p>
                    <p className='text-green-600 font-semibold'>{product.discountPercent}% off</p>
                </div>
                <div className="w-full flex justify-center">
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handlePurchase}
                        style={{
                            background: 'linear-gradient(60deg, #bd8cf5, #7acff5)', // Darker pink and blue gradient
                            color: "white",
                            borderRadius: "8px", // Rounded corners
                            // boxShadow: "0 4px 20px rgba(213, 0, 109, 0.6)", // Darker pink glow effect
                            fontWeight: "bold",
                            textTransform: "none",
                            padding: "8px 16px", // Increased padding
                            transition: "all 0.3s ease-in-out", // Smooth transition
                        }}
                        className="hover:opacity-90 hover:scale-105 hover:shadow-xl transition-all duration-300"
                    >
                        Shop Now
                    </Button>
                </div>
            </div>
        </div>
    )
}

