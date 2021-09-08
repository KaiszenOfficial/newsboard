import React from 'react'
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import logo from '../../logo.svg';
import './AppHeader.css';
import { countries } from '../../constants'
import { Language } from '@material-ui/icons';

export default function AppHeader({ onCountryChange }) {

	const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
  };

  const handleClose = (country) => {
		// console.log(country);
    setAnchorEl(null);
		onCountryChange(country);
  };

	return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <img src={logo} alt="Logo" className="app-logo" />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          NewsBoard
        </Typography>

        <IconButton
          size="large"
          aria-label="Select language"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <Language />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {countries.map((country) => (<MenuItem key={country.code} onClick={() => handleClose(country)}>{country.name}</MenuItem>))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
