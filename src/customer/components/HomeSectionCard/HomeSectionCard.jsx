import React from "react";
import { useNavigate } from "react-router-dom";

const HomeSectionCard = ({ product }) => {
  const navigate = useNavigate();

  const handlePurchase = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="cursor-pointer rounded bg-white shadow p-2 w-[11.5rem] h-[18rem] flex flex-col justify-between items-center border hover:shadow-md transition">
      {/* Image Section */}
      <div className="h-[10rem] w-full flex justify-center items-start bg-gray-100 overflow-hidden">
        <img
          className="object-cover w-full rounded"
          src={`data:image/jpeg;base64,${product.image}`} 
          alt={product.title}
        />
      </div>


      {/* Product Details */}
      <div className="w-full text-left mt-2">
        <h3 className="text-sm font-semibold text-gray-800">{product.brand}</h3>
        <p className="text-sm text-gray-500 truncate">{product.title}</p>
      </div>

      {/* Price Section */}
      <div className="w-full text-sm text-gray-700 flex justify-between items-center">
        <p className="font-semibold text-green-600">₹{product.discountedPrice}</p>
        <p className="font-semibold text-green-600">{product.discountPercent}%off</p>
        <p className="line-through text-gray-400">₹{product.price}</p>
      </div>

      {/* Button */}
      <button
        className="mt-2 w-full py-2 bg-gradient-to-r from-purple-400 to-blue-400 text-white text-sm rounded shadow hover:opacity-90"
        onClick={handlePurchase}
      >
        Shop Now
      </button>
    </div>
  );
};

export default HomeSectionCard;
