import React from 'react'
import { useLocation } from 'react-router-dom';
import DisplayProduct from './DisplayProduct';
import { Box } from '@mui/material';

const SearchData = () => {
  const location = useLocation();
  const { searchProducts } = location.state || {};
  return (
    <div>
      {searchProducts.length > 0 ? (
        <div>
          <DisplayProduct product={searchProducts}/>
        </div>
      ) : (
        <Box className="flex justify-center items-center h-full p-4">
          <div className="flex flex-col justify-center items-center bg-gray-100 h-96 rounded-lg shadow-lg p-8 text-center">
            <div className="text-2xl font-semibold text-red-500 mb-4">
              No Data Found
            </div>
            <div className="text-lg text-gray-700 mb-4">
              We couldn't find any data matching your search. Please try again later or check your filters.
            </div>
          </div>
        </Box>
      )}
    </div>

  )
}

export default SearchData
