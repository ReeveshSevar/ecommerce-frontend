import React, { useState } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // For Orders
import { Box, CssBaseline, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomerTable from "./components/CustomerTable";
import OrderTable from "./components/OrderTable";
import ProductTable from "./components/ProductTable";
import AdminDashboard from './components/AdminDashboard';
import CreateProductForm from './components/CreateProductForm';
import HomeIcon from '@mui/icons-material/Home';

const menu = [
  { name: 'Home', path: '/', icon: <HomeIcon /> },
  { name: 'Dashboard', path: '/admin', icon: <DashboardIcon /> },
  { name: 'Products', path: '/admin/products', icon: <InventoryIcon /> },
  { name: 'Customers', path: '/admin/customers', icon: <PeopleIcon /> },
  { name: 'Orders', path: '/admin/orders', icon: <ShoppingCartIcon /> }, // Icon for Orders
  { name: 'Add Product', path: '/admin/product/create', icon: <AddCircleOutlineIcon /> }
];

const Admin = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisiable, setSideBarVisiable] = useState(false);
  const navigate = useNavigate();

  // Colors from the custom palette
  const sidebarBg = '#F5F5F7'; // Light gray for sidebar
  const hoverBg = '#E0E9F4'; // Light blue for hover
  const primaryColor = '#4A90E2'; // Vibrant blue
  const secondaryColor = '#A9D6A8'; // Soft green for accents
  const textColor = '#2A2A2A'; // Darker text for better readability
  const contentBg = '#FAFAFA'; // Off-white background for content

  const drawer = (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      width: isLargeScreen ? '250px' : '200px', // Responsive width based on screen size
      backgroundColor: sidebarBg, // Light background for sidebar
      color: textColor,
      paddingTop: '16px',
      paddingBottom: '16px',
      boxShadow: '4px 0px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow for a more modern feel
      borderRadius: '8px',
    }}>
      {/* Logo or Branding Section */}
      <Box sx={{ padding: '8px 16px', textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>
        <h2 style={{ color: primaryColor, fontSize: '1.5rem', fontWeight: 'bold' }}>Admin Panel</h2>
      </Box>      
      <List>
        {menu.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                '&:hover': {
                  backgroundColor: hoverBg, // Smooth hover effect
                  transform: 'scale(1.05)', // Slight zoom-in effect on hover
                },
                borderRadius: '8px',
                padding: '12px 20px',
                transition: 'transform 0.2s ease-in-out', // Smooth transition for hover effect
              }}
            >
              <ListItemIcon sx={{ minWidth: 32, color: primaryColor }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText sx={{ marginLeft: 1, color: textColor }}>
                {item.name}
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{
            padding: '12px 20px',
            '&:hover': {
              backgroundColor: hoverBg, // Smooth hover effect for account
            }
          }}>
            <ListItemIcon sx={{ minWidth: 32, color: primaryColor }}>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText sx={{ marginLeft: 1, color: textColor }} onClick={()=> navigate('/account/profile')}>
              Account
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <div className="flex h-[100vh]">

        {/* Sidebar */}
        <CssBaseline />
        <div className="w-auto">
          {drawer}
        </div>

        {/* Main content section */}
        <div className="flex-1 overflow-auto" style={{ backgroundColor: contentBg, paddingLeft: '16px' }}>
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/products" element={<ProductTable />} />
            <Route path="/customers" element={<CustomerTable />} />
            <Route path="/orders" element={<OrderTable />} />
            <Route path="/product/create" element={<CreateProductForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
