import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cancelOrder, confirmOrder, deleteOrder, deliverOrder, getOrders, shipOrder } from '../../State/Admin/Order/Action';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, AvatarGroup, Button, Card, CardHeader } from '@mui/material';

const OrderTableView = () => {
  const dispatch = useDispatch();
  const { adminOrder } = useSelector((store) => store)
  const [anchorEls, setAnchorEls] = React.useState({}); // Track each row's anchorEl
  const open = (id) => Boolean(anchorEls[id]); // Determine if menu is open for this row

  const handleClick = (event, id) => {
    setAnchorEls(prev => ({ ...prev, [id]: event.currentTarget }));
  };

  const handleClose = (id) => {
    setAnchorEls(prev => {
      const newAnchorEls = { ...prev };
      delete newAnchorEls[id];
      return newAnchorEls;
    });
  };


  const handleConfirmOrder = (orderId) => {
    dispatch(confirmOrder(orderId))
    handleClose()
  }

  const handleShipOrder = (orderId) => {
    dispatch(shipOrder(orderId))
    handleClose()
  }


  const handleDeliverOrder = (orderId) => {
    dispatch(deliverOrder(orderId))
    handleClose()
  }

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId))
    handleClose()
  }

  useEffect(() => {
    dispatch(getOrders())
  }, [adminOrder.confirmed, adminOrder.delivered, adminOrder.shipped, adminOrder.deleted]);

  const orderContent = adminOrder.orders;

  return (
    <div>
      <Card className='mt-2' sx={{
        background: 'linear-gradient(145deg, #d3cce3, #e9e4f0)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        borderRadius: 2,
        padding: 2
      }}>
        <CardHeader
          title='Recent Orders'
          sx={{
            fontWeight: 'bold',
            color: '#333',
            padding: '16px',
            textAlign: 'center',
            fontSize: '1.5rem'
          }}
        />
        <TableContainer component={Paper} sx={{
          background: 'linear-gradient(45deg, #f5f5f5, #f9f9f9)',
          borderRadius: 2,
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
          padding: 2
        }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{
              background: 'linear-gradient(45deg, #e6f7ff, #b3e0ff)',
              borderRadius: 2,
              color: 'black'
            }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>Title</TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>Customer</TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>Price</TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderContent.length > 0 ? (
                orderContent.map((item, index) => (
                  <TableRow
                    key={item.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      background: index % 2 === 0
                        ? 'linear-gradient(45deg, #f0f8ff, #e6f7ff)'
                        : 'linear-gradient(45deg, #fdfdfd, #f9f9f9)',
                      borderRadius: 2,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <TableCell align='' className=''>.
                      <AvatarGroup max={2} sx={{ justifyContent: 'start' }}>
                        {item.items.map((orderItem) => <Avatar src={`data:image/jpeg;base64,${orderItem.product?.image}`} />)}
                      </AvatarGroup>
                    </TableCell>
                    <TableCell align='left' scope='row'>
                      {item.items.map((orderItem) => <p>{orderItem.product.title.slice(0, 50)}...</p>)}
                    </TableCell>
                    <TableCell align='left' scope='row'>
                      {item.user.firstName}
                    </TableCell>
                    <TableCell align='left' sx={{ color: '#40942f', fontWeight: 'bold' }}>
                      {item.items.map((orderItem) => <p> ₹{orderItem.product.price}</p>)}
                    </TableCell>
                    <TableCell align='left'>
                      <span className={`text-white px-5 py-2 rounded-full 
                        ${item.orderStatus === "CONFIRMED" ? "bg-[#369236]" :
                          item.orderStatus === "SHIPPED" ? "bg-[#4141ff]" :
                            item.orderStatus === "PLACED" ? "bg-[#02B290]" :
                              item.orderStatus === "PENDING" ? "bg-[gray]" : "bg-[red]"
                        }
                        `}>{item.orderStatus}</span>
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
}

export default OrderTableView;
