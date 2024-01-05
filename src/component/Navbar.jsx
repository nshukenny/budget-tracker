import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { CssBaseline } from '@mui/material';

const Navbar = () => {
  return (  
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {/* Remove the unnecessary empty div and replace with Box */}
          <Box sx={{ position: 'relative', marginRight: '16px' }}>
            <Box sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '8px' }}>
              {/* Content inside this Box */}
            </Box>
          </Box>
          <Link to="/report" style={{ textDecoration: 'none' }}>
            Go to Report
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
