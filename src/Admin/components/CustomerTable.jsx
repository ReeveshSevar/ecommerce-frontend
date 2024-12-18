import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../State/Auth/Action';
import { Table, TableCell, TableBody, TableHead, TableRow, Paper, Box } from '@mui/material';
import { purple, blueGrey, teal } from '@mui/material/colors';

const CustomerTable = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const { auth } = useSelector((store) => store);
  const allUsers = auth.users;

  return (
    <Box sx={{ maxWidth: '1100px', margin: '30px auto', padding: '20px', backgroundColor: blueGrey[50], borderRadius: '10px' }}>
      <Paper sx={{ boxShadow: 6, borderRadius: '12px' }}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead sx={{
            background: 'linear-gradient(135deg, #00bcd4 30%, #3f51b5 90%)',
            color: '#fff',
            '& th': {
              fontWeight: 'bold',
              fontSize: '16px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              padding: '15px',
            }
          }}>
            <TableRow>
              <TableCell align="left">First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Mobile</TableCell>
              <TableCell align="left">Roles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers.map((item, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:nth-of-type(even)': {
                    backgroundColor: '#f9f9f9', // Light gray for even rows
                  },
                  '&:nth-of-type(odd)': {
                    backgroundColor: '#fafafa', // Slightly darker gray for odd rows
                  },
                  '&:hover': {
                    backgroundColor: teal[100], // Light teal background on hover
                    transform: 'scale(1.02)', // Slight scaling on hover
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Add a soft shadow on hover
                    transition: 'all 0.3s ease-in-out', // Smooth transition effect
                  },
                }}
              >
                <TableCell
                  sx={{
                    padding: '15px',
                    fontSize: '14px',
                    color: blueGrey[900],
                    fontWeight: 'bold',
                    borderRadius: '6px', // Rounded corners for cells
                    backgroundColor: '#ffffff'// White background for cells                    
                  }}
                >
                  {item.firstName}
                </TableCell>
                <TableCell
                  sx={{
                    padding: '15px',
                    fontSize: '14px',
                    color: blueGrey[900],
                    fontWeight: 'bold',
                    backgroundColor: '#ffffff',
                  }}
                >
                  {item.lastName}
                </TableCell>
                <TableCell
                  sx={{
                    padding: '15px',
                    fontSize: '14px',
                    color: blueGrey[600],
                    backgroundColor: '#ffffff',
                    '&:hover': {
                      color: teal[500], // Change text color on hover for better interactivity
                    },
                  }}
                >
                  {item.email}
                </TableCell>
                <TableCell
                  sx={{
                    padding: '15px',
                    fontSize: '14px',
                    color: blueGrey[600],
                    backgroundColor: '#ffffff',
                    '&:hover': {
                      color: teal[500], // Highlight phone numbers on hover
                    },
                  }}
                >
                  {item.mobile}
                </TableCell>
                <TableCell
                  sx={{
                    padding: '15px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: purple[500],
                    backgroundColor: '#ffffff',
                    '&:hover': {
                      color: teal[500], // Highlight role on hover
                    },
                  }}
                >
                  {item.roles.slice(5)} {/* Slice role to first 5 chars */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default CustomerTable;
