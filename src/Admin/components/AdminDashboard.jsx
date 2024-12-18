import { Grid } from '@mui/material'
import React from 'react'
import Acheivement from './Acheivement'
import MonthlyOverview from './MonthlyOverview'
import OrderTableView from "../view/OrderTableView"

const AdminDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">

      <Grid container spacing={3}>
        {/* Achievement Card */}
        <Grid item xs={12} md={4}>
          <div className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6">
            <Acheivement />
          </div>
        </Grid>

        {/* Monthly Overview Card */}
        <Grid item xs={12} md={8}>
          <div className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6">
            <MonthlyOverview />
          </div>
        </Grid>

        {/* Order Table View Card */}
        <Grid item xs={12} md={12}>
          <div className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6">
            <OrderTableView />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default AdminDashboard
