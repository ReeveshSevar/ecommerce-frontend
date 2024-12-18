import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../State/Product/Action';
import { Button, FormControl, IconButton, Grid, Input, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { teal, purple, deepOrange, blueGrey, deepPurple } from '@mui/material/colors';
import ClearIcon from '@mui/icons-material/Clear'; // Material-UI icon for clear action

// Initial state for sizes
const initialState = [
  { name: "S", quantity: 25 },
  { name: "M", quantity: 25 },
  { name: "L", quantity: 25 },
  { name: "XL", quantity: 25 }
];

const topLevelCategories = [
  { name: 'Men', id: 'men' },
  { name: 'Women', id: 'women' },
  { name: 'Kid', id: 'kid' }
];

const secondLevelCategories = [
  { name: "Clothing", id: 'clothing' },
  { name: "Accessories", id: 'accessories' },
  { name: "Brands", id: 'brands' }
];

const thirdLevelCategories = [
  // Women Section
  { name: 'Tops', id: "top" },
  { name: 'Women Dress', id: "women" },
  { name: 'Girl Dress', id: 'Dress' },
  { name: 'Women Jeans', id: 'women' },
  { name: 'Lengha', id: 'lengha' },
  { name: 'Sweaters', id: 'sweater' },
  { name: 'Jackets', id: 'jacket' },
  { name: 'Gouns', id: 'gouns' },
  { name: 'Sarees', id: 'saree' },
  { name: 'Suite', id: 'suite' },
  // Men Section
  { name: 'Mens Kurtas', id: 'mens_kurta' },
  { name: 'Shirt', id: 'shirt' },
  { name: 'Men Jeans', id: 'men_jeans' },
  { name: 'Sweaters', id: 'sweater' },
  { name: 'T-Shirts', id: 't-shirt' },
  { name: 'Jackets', id: 'jackets' },
  { name: 'Activewear', id: 'activewear' },
  // Men Accessories
  { name: 'Men Watches', id: 'mens_watch' },
  { name: 'Men Wallets', id: 'mens_wallet' },
  { name: 'Men Bags', id: 'mens_bag' },
  { name: 'Men Sunglasses', id: 'mens_sunglasses' },
  { name: 'Men Hats', id: 'mens_hat' },
  { name: 'Men Belts', id: 'mens_belt' },
  // Women Accessories
  { name: 'Women Watches', id: 'women_watch' },
  { name: 'Women Wallets', id: 'women_wallet' },
  { name: 'Women Bags', id: 'women_bag' },
  { name: 'Women Sunglasses', id: 'women_sunglasses' },
  { name: 'Women Hats', id: 'women_hat' },
  { name: 'Women Belts', id: 'women_belt' },
];

const CreateProductForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [productData, setProductData] = useState({
    image: "",
    brand: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    discountPercent: "",
    size: initialState,
    quantity: "",
    description: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: ""
  });

  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    if (productData.price && productData.discountedPrice) {
      const discountPercent = ((productData.price - productData.discountedPrice) / productData.price) * 100;
      setProductData((prevState) => ({
        ...prevState,
        discountPercent: Math.round(discountPercent) // Round to the nearest integer
      }));
    }
  }, [productData.price, productData.discountedPrice]); // Recalculate when price or discountedPrice changes

  // Handle size change
  const handleSizeChange = (e, index) => {
    let { name, value } = e.target;
    name === "size_quantity" ? name = "quantity" : name = e.target.name;
    const sizes = [...productData.size];
    sizes[index][name] = value;
    setProductData((prevState) => ({
      ...prevState,
      size: sizes
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(productData));
    window.location.reload();
  };

  // Clear the selected image and preview
  const handleClearImage = () => {
    setSelectedImage(null);
    setImagePreview(""); // Reset the preview
  };

  // Handle image file selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Check the file size (in bytes), if it's larger than 100 KB (100 * 1024 bytes)
      if (file.size > 100 * 1024) {
        setErrorMessage("File size should not exceed 100 KB.");
        return; // Exit the function if the file is too large
      } else {
        setErrorMessage(""); // Clear error if file size is valid
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result; // The base64 encoded image
        setImagePreview(base64Image); // Set the base64 string as the image preview
        setProductData((prevState) => ({
          ...prevState,
          image: base64Image // Store the base64 image in productData
        }));
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  };

  return (
    <div className="p-10" style={{
      background: 'linear-gradient(90deg, #E3F6FF, #B5E1FF)',
      padding: '2rem',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      maxWidth: '1100px',
      margin: 'auto',
    }}>
      <Typography variant='h3' sx={{
        textAlign: 'center',
        color: purple[700],
        fontWeight: 'bold',
        marginBottom: '2rem',
        fontFamily: 'Roboto, sans-serif',
      }}>Add New Product</Typography>

      <form onSubmit={handleSubmit} className='createProductContainer'>
        <Grid container spacing={3}>
          {/* Image URL */}
          <Grid item xs={12}>
            {imagePreview && (
              <div style={{ position: 'relative', display: 'inline-block', marginLeft: '150vh' }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxWidth: '80px', maxHeight: '80px' }}
                  className="mb-3 rounded-lg"
                />
                {/* Clear Button (X icon) */}
                <IconButton
                  onClick={handleClearImage}
                  style={{
                    position: 'absolute',
                    top: '1px',
                    right: '1px',
                    width: '1px',
                    height: '1px',
                    borderRadius: '50%',
                  }}
                >
                  <ClearIcon sx={{ color: '#000000' }} />
                </IconButton>
              </div>
            )}
            <Input
              fullWidth
              name="image"
              required
              type="file"
              onChange={handleImageChange} // Update the preview on file change
              disableUnderline
              sx={{
                display: 'none', // Hides the default file input
              }}
              id="file-input"
            />
            <label htmlFor="file-input">
              <Button
                component="span"
                variant="outlined"
                fullWidth
                sx={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: '#fff',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  color: blueGrey[800],
                  borderColor: teal[400],
                  '&:hover': {
                    borderColor: teal[600],
                  },
                }}
              >
                Upload Product Image
              </Button>
            </label>
            {errorMessage && (
              <Typography color="error" variant="body2" sx={{ marginTop: '8px' }}>
                {errorMessage}
              </Typography>
            )}
          </Grid>
          {/* Brand */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Brand"
              name='brand'
              required
              value={productData.brand}
              onChange={handleChange}
              variant="outlined"
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                  background: '#fff',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                },
              }}
            />
          </Grid>

          {/* Title */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Title"
              name='title'
              value={productData.title}
              onChange={handleChange}
              variant="outlined"
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                  background: '#fff',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                },
              }}
            />
          </Grid>

          {/* Color */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Color"
              name='color'
              value={productData.color}
              onChange={handleChange}
              variant="outlined"
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                  background: '#fff',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                },
              }}
            />
          </Grid>

          {/* Quantity */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Quantity"
              name='quantity'
              value={productData.quantity}
              onChange={handleChange}
              variant="outlined"
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                  background: '#fff',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                },
              }}
            />
          </Grid>

          {/* Discounted Price */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              label="Discounted Price"
              name='discountedPrice'
              value={productData.discountedPrice}
              onChange={handleChange}
              variant="outlined"
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                  background: '#fff',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                },
              }}
            />
          </Grid>

          {/* Price */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              label="Price"
              name='price'
              value={productData.price}
              onChange={handleChange}
              variant="outlined"
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                  background: '#fff',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                },
              }}
            />
          </Grid>

          {/* Discount Percent */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              label="Discount Percent"
              name='discountPercent'
              value={productData.discountPercent}
              onChange={handleChange}
              variant="outlined"
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                  background: '#fff',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                },
              }}
            />
          </Grid>

          {/* Category Selection */}
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Top Level Category</InputLabel>
              <Select
                name='topLevelCategory'
                value={productData.topLevelCategory}
                onChange={handleChange}
                required
                label='Top Level Category'
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: '8px',
                    background: '#fff',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  }
                }}
              >
                {topLevelCategories.map((item) => <MenuItem value={item.id}>{item.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>

          {/* Second Category */}
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Second Level Category</InputLabel>
              <Select
                name='secondLevelCategory'
                value={productData.secondLevelCategory}
                required
                onChange={handleChange}
                label='Second Level Category'
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: '8px',
                    background: '#fff',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  }
                }}
              >
                {secondLevelCategories.map((item) => <MenuItem value={item.id}>{item.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>

          {/* Third Category */}
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Third Level Category</InputLabel>
              <Select
                name='thirdLevelCategory'
                value={productData.thirdLevelCategory}
                required
                onChange={handleChange}
                label='Third Level Category'
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: '8px',
                    background: '#fff',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  }
                }}
              >
                {thirdLevelCategories.map((item) => <MenuItem value={item.id}>{item.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Description"
              name='description'
              value={productData.description}
              onChange={handleChange}
              variant="outlined"
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                  background: '#fff',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                },
              }}
            />
          </Grid>

          {/* Sizes */}
          {productData.size.map((size, index) => (
            <Grid container item spacing={3} key={index}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Size Name"
                  name="name"
                  value={size.name}
                  onChange={(event) => handleSizeChange(event, index)}
                  variant="outlined"
                  sx={{
                    '& .MuiInputBase-root': {
                      borderRadius: '8px',
                      background: '#fff',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Quantity"
                  name="size_quantity"
                  type='number'
                  value={size.quantity}
                  onChange={(event) => handleSizeChange(event, index)}
                  variant="outlined"
                  sx={{
                    '& .MuiInputBase-root': {
                      borderRadius: '8px',
                      background: '#fff',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    }
                  }}
                />
              </Grid>
            </Grid>
          ))}

          {/* Submit Button */}
          <Grid item xs={12} sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              variant="contained"
              sx={{
                padding: '12px 30px',
                backgroundColor: deepPurple[500],
                fontSize: '16px',
                fontWeight: 'bold',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: deepOrange[700],
                }
              }}
              size='large'
              type='submit'
            >
              Add New Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateProductForm;
