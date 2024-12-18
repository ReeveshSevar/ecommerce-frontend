import React from 'react'

const AddressCard = ({ address }) => {   
  return (
    <div>
      <h1>
        <div className='space-y-0'>
          <p className='font-semibold'>{address?.firstName+" "+address?.lastName}</p> 
          <p>{address?.state} {address?.streetAddress}, {address?.zipCode}</p>
          <div className='space-y-0'>
            <p className='font-semibold'>Phone Number</p>
            <p>{address?.mobile}</p>
          </div> 
        </div>
      </h1>
    </div>
  )
}

export default AddressCard
