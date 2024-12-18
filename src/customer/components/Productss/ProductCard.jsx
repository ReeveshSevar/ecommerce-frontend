import React from 'react'
import "./ProductCard.css"

const ProductCard = ({ product }) => {
  return (
    <div className='productCard w-[12rem] m-2 transition-all cursor-pointer border'>
      <div className='h-[16rem]'>
        <img className='h-full w-full object-cover object-left-top'
         src={`data:image/jpeg;base64,${product.image}`} 
        alt=''/>

      </div>
      <div className='textPart bg-white p-3'>
        <div>
          <p className='font-bold opacity-60'>{product.brand}</p>
          <p>{product.title}</p>
        </div>
        <div className='flex items-center space-x-2'>
          <p className='font-semibold'>₹{product.discountedPrice}</p>
          <p className='line-through opacity-50'>₹{product.price}</p>
          <p className='font-semibold text-green-600'>{product.discountPercent}% off</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
