import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getAllProducts } from '../../State/Product/Action';
import { Avatar, Button, Card, CardHeader, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((store) => store);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(getAllProducts()); 
  }, [dispatch, products.deletedProduct]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const productContent = Array.isArray(products?.products) ? products?.products : [];

  const categories = [
    ...new Set(productContent.map((item) => item.category.name)) 
  ];

  const filteredProducts = selectedCategory
    ? productContent.filter((item) => item.category.name === selectedCategory)
    : productContent;

  return (
    <div className='p-5'>
      {/* Card with light gradient background */}
      <Card className='mt-2' sx={{
        background: 'linear-gradient(145deg, #d3cce3, #e9e4f0)', 
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        borderRadius: 2,
        padding: 2
      }}>
        <CardHeader
          title='All Products'
          sx={{
            fontWeight: 'bold',
            color: '#333', // Darker text for contrast
            padding: '16px',
            textAlign: 'center',
            fontSize: '1.5rem'
          }}
        />

        {/* Table Container with soft light background */}
        <TableContainer component={Paper} sx={{
          background: 'linear-gradient(45deg, #f5f5f5, #f9f9f9)', // Very light grey gradient
          borderRadius: 2,
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
          padding: 2
        }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{
              background: 'linear-gradient(45deg, #e6f7ff, #b3e0ff)', // Light blue gradient
              borderRadius: 2,
              color: 'black'
            }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>Title</TableCell>
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel id="category-select-label">Category</InputLabel>
                  <Select
                    labelId="category-select-label"
                    value={selectedCategory}
                    label="Category"
                    onChange={handleCategoryChange}
                  >
                    <MenuItem value="">All</MenuItem>
                    {/* Dynamically populate categories */}
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>Price</TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item, index) => (
                  <TableRow
                    key={item.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      background: index % 2 === 0
                        ? 'linear-gradient(45deg, #f0f8ff, #e6f7ff)' // Soft pastel blue gradient for even rows
                        : 'linear-gradient(45deg, #fdfdfd, #f9f9f9)', // Very light grey for odd rows
                      borderRadius: 2,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <TableCell align='left'>
                      <Avatar
                        // src={item.image}
                        src={`data:image/jpeg;base64,${item.image}`} 
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: '8px',
                          boxShadow: 3,
                          border: '2px solid #ffffff'
                        }}
                      />
                    </TableCell>
                    <TableCell align='left' scope='row'>{item.title}</TableCell>
                    <TableCell align='left'>{item.category.name}</TableCell>
                    <TableCell align='left' sx={{ color: '#40942f', fontWeight: 'bold' }}>₹{item.price}</TableCell>
                    <TableCell align='left'>{item.quantity}</TableCell>
                    <TableCell align='left'>
                      <Button
                        variant='contained'
                        sx={{
                          background: 'linear-gradient(45deg, #85e085, #66b2ff)', // Soft green to light blue gradient
                          color: 'white',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #66b2ff, #85e085)'
                          },
                          borderRadius: 2
                        }}
                        onClick={() => handleProductDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{
                    padding: '20px',
                    color: '#777',
                    fontStyle: 'italic'
                  }}>
                    No products available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default ProductTable;
