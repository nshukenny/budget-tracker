import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { CssBaseline } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
Navigate

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const handleSearch = () => {
    console.log("Search Query:", searchQuery);
    dispatch({ type: 'FILTER_TRANSACTIONS', searchQuery });
  };

    return (  
      <Box sx={{ flexGrow: 1}} >
      <CssBaseline/>
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
         <div style={{ position: 'relative', marginRight: '16px' }}>
         <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '8px' }}>
      <SearchIcon />
    </div>
    <InputBase
  placeholder=""
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  onKeyPress={(e) => {
    if (e.key === 'Enter') {
      handleSearch(); 
    }
  }}
  fullWidth
/>
  </div>
  <Link to="/report" style={{ textDecoration: 'none' }}>
            Go to Report
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
    );
}
export default Navbar;