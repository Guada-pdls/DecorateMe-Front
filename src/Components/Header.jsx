import { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";
import { AppBar, Container, Toolbar, Box, IconButton, Typography, Menu, Button, MenuItem } from "@mui/material";
import { Adb } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import UserWidget from "./UserWidget/UserWidget";
import CartWidget from "./Cart/CartWidget";
import LogoutWidget from "./LogoutWidget/LogoutWidget";

const Header = () => {

  const context = useContext(UserContext)

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar sx={{ backgroundColor: '#161616' }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Adb sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link style={{ textDecoration: 'none', color: 'black' }} to={`/products`}><Typography textAlign="center">PRODUCTS</Typography></Link>
              </MenuItem>
            </Menu>
          </Box>
          <Adb sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link to='/products'>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Products
                </Button>
              </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton>
              <CartWidget />
            </IconButton>
            <IconButton sx={{ p: 0, paddingLeft: '.8rem' }}>
              {Object.keys(context.user).length !== 0 ? <LogoutWidget /> : <UserWidget />}
            </IconButton>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
