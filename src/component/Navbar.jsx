import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
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
          <Link to="/" style={{ textDecoration: 'none', color: 'white', marginRight: '16px' }}>
            <strong>Home</strong>
          </Link>
          <Box sx={{ flexGrow: 1 }} /> 
          <Link to="/report" style={{ textDecoration: 'none', color: 'white' }}>
            <strong>Report</strong>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
