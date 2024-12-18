import React from "react"
import { Grid, Typography, Button } from '@mui/material'

const Footer = () => {
    return (
        <div>
            <Grid className='bg-black text-white text-center mt-10' container sx={{ bgcolor: 'black', color: 'white', py: 2 }}>
                {/* Company Section */}
                <Grid item xs={12} sm={6} md={3}>
                    <Typography  variant="body1">Company</Typography>
                    <div>
                        <Button className="pb-0.5" variant="body2" gutterBottom>About</Button>
                    </div>
                    <div>
                        <Button className="pb-0.5" variant="body2" gutterBottom>Blog</Button>
                    </div>
                    <div>
                        <Button className="pb-0.5" variant="body2" gutterBottom>Press</Button>
                    </div>
                    <div>
                        <Button className="pb-0.5" variant="body2" gutterBottom>Jobs</Button>
                    </div>
                    <div>
                        <Button className="pb-0.5" variant="body2" gutterBottom>Partners</Button>
                    </div>
                </Grid>

                {/* Solutions Section */}
                <Grid item xs={12} sm={6} md={3}>
                    <Typography  variant="body1">Solutions</Typography>
                    <div>
                        <Button className="pb-0.5" variant="body2" gutterBottom>Marketing</Button>
                    </div>
                    <div>
                        <Button className="pb-0.5" variant="body2" gutterBottom>Analytics</Button>
                    </div>
                    <div>
                        <Button className="pb-0.5" variant="body2" gutterBottom>Commerce</Button>
                    </div>
                    <div>
                        <Button className="pb-0.5" variant="body2" gutterBottom>Insights</Button>
                    </div>
                    <div>
                        <Button className="pb-0.5" variant="body2" gutterBottom>Support</Button>
                    </div>
                </Grid>

                {/* Documentation Section */}
                <Grid item xs={12} sm={6} md={3}>
                    <Typography  variant="body1">Documentation</Typography>
                    <div>
                        <Button className="pb-0.5" variant="body2" gutterBottom>Guides</Button>
                    </div>
                    <div>
                        <Button className="pb-0.5" variant="body2" gutterBottom>API Status</Button>
                    </div>
                </Grid>

                {/* Legal Section */}
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body1">Legal</Typography>
                    <div>
                        <Button className="pb-0.5" variant="body2" gutterBottom>Claim</Button>
                    </div>
                    <div>
                        <Button className="pb-0.5" variant="body2" gutterBottom>Privacy</Button>
                    </div>
                    <div>
                        <Button className="pb-0.5" variant="body2" gutterBottom>Terms</Button>
                    </div>
                </Grid>

                {/* Copyright Section */}
                <Grid className="pt-2" item xs={12}>
                    <Typography variant="body2" component="p" align="center">
                        &copy; 2024 Severson Company. All rights reserved.
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default Footer;
