import { TrendingUp } from '@mui/icons-material';
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';

const salesData = [
    { state: '451K', title: 'Sales', color: '#273c75', icon: <TrendingUp sx={{ fontSize: '1.75rem' }} /> },
    { state: '15K', title: 'Customers', color: '#22CB5C', icon: <AccountCircleIcon sx={{ fontSize: '1.75rem' }} /> },
    { state: '1.9K', title: 'Products', color: '#DE4839', icon: <PhoneAndroidIcon sx={{ fontSize: '1.75rem' }} /> },
    { state: '147K', title: 'Revenue', color: '#fff200', icon: <AttachMoneyIcon sx={{ fontSize: '1.75rem' }} /> },
];

const render = () => {
    return salesData.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                    variant="rounded"
                    sx={{
                        mr: 3,
                        width: 44,
                        height: 44,
                        boxShadow: 3,
                        color: 'white',
                        backgroundColor: `${item.color}`,
                    }}
                >
                    {item.icon}
                </Avatar>
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <Typography variant="caption">{item.title}</Typography>
                    <Typography variant="h6">{item.state}</Typography>
                </Box>
            </Box>
        </Grid>
    ));
};

const MonthlyOverview = () => {
    return (
        <div>
            <Card sx={{}}>
                <CardHeader
                    title="Monthly Overview"
                    action={
                        <IconButton size="small">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    subheader={
                        <Typography variant="body2">
                            <Box component="span" sx={{ fontWeight: 600, mx: 2 }}>
                                Total 73.6% Growth
                            </Box>
                            This Month
                        </Typography>
                    }
                    titleTypographyProps={{
                        sx: { mb: 2.5, lineHeight: '2rem !important', letterSpacing: '1.5px !important' },
                    }}
                />
                <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
                    <Grid container spacing={5}>
                        {render()}
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
};

export default MonthlyOverview;
