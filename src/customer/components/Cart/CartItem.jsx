import { Button, IconButton } from '@mui/material'
import React from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from 'react-redux';
import { removeCartItem, updateCartItem } from '../../../State/Cart/Action';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItem = ({ item }) => {

    const dispatch = useDispatch();

    const handleUpdateCartItem = (num) => {
        if (item?.quantity + num > 0) {
            const data = { data: { quantity: item?.quantity + num }, cartItemId: item?.id };
            dispatch(updateCartItem(data));
        }
    };

    const handleRemoveCartItem = () => {
        dispatch(removeCartItem(item?.id));
    };


    return (
        <div className='p-3 shadow-lg border rounded-md my-3'>
            <div className='flex items-center'>
                <div className='w-[4rem] h-[4rem] lg:w-[6rem] lg:h-[6rem]'>
                    <img
                        className='w-full h-full object-cover object-top'
                        src={`data:image/jpeg;base64,${item?.product.image}`}
                        alt=''
                    />
                </div>
                <div className='ml-3 space-y-2'>
                    <p className='font-semibold text-sm'> {item?.product.title?.slice(0, 60)} </p>
                    <p className='opacity-70 text-xs'>Size: {item?.size}, {item?.product.color}</p>
                    <p className='opacity-70 text-xs'>Seller: {item?.product.brand}</p>
                    <div className='flex space-x-3 items-center text-gray-900 pt-2'>
                        <p className='font-semibold text-sm'>₹{item?.product.discountedPrice}</p>
                        <p className="opacity-50 line-through text-xs">₹{item?.product.price}</p>
                        <p className='text-green-600 font-semibold text-xs'>{item?.product.discountPercent}% off</p>
                    </div>
                </div>
            </div>

            <div className='lg:flex items-center lg:space-x-2 pt-2'>
                <div className='flex items-center space-x-2'>
                    <IconButton onClick={() => handleUpdateCartItem(-1)} disabled={item?.quantity <= 1} sx={{ color: 'rgb(145, 85, 253)' }} size="small">
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                    <span className='py-1 px-5 border rounded-sm border-[#9155FD]' style={{ color: '#9155FD' }}>{item?.quantity}</span>
                    <IconButton onClick={() => handleUpdateCartItem(+1)} sx={{ color: 'rgb(145, 85, 253)' }} size="small">
                        <AddCircleOutlineIcon />
                    </IconButton>
                </div>
                <div>
                    <Button
                        onClick={handleRemoveCartItem}
                        sx={{
                            color: 'red',
                            padding: '2px',  // Reduce padding for a more compact button
                            minWidth: 'auto', // Remove any default minimum width
                            fontSize: 'small', // Reduce font size of the icon inside the button
                            '&:hover': {
                                backgroundColor: 'rgba(255, 0, 0, 0.1)', // A subtle hover effect
                                color: 'red'
                            }
                        }}
                        size="small"
                    >
                        <DeleteIcon sx={{ fontSize: 18 }} />  {/* Adjust the icon size here */}
                    </Button>

                </div>
            </div>
        </div>
    )
}

export default CartItem;
