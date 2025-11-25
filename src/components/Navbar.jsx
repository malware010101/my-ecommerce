import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  InputBase,
  useMediaQuery,
  Tooltip,
  Button,
} from '@mui/material';
import { AiOutlineTikTok } from 'react-icons/ai';
import { RiFacebookFill } from 'react-icons/ri';
import { FaInstagram } from 'react-icons/fa';
import { FiSearch } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import { GiHamburgerMenu } from 'react-icons/gi';
import { CenterFocusStrong, ExpandLess, ExpandMore } from '@mui/icons-material';
import LogoGymKlanC from '../assets/logogymklanc.png';
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState({});
  
  const isMobile = useMediaQuery('(max-width:900px)');
  const navigate = useNavigate();

  //rutas
  const hndlNavigation = (path) => {
    if (path) {
        navigate(path);
    } else {
        console.warn("Ruta no encontrada.");
    }
    handleClose();
    toggleDrawer();
};


const hndlNvgApp = (path) => {
  setDrawerOpen(false); 
  navigate(path); 
};
  
  

  const handleMouseEnter = (event, menuName) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(menuName);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(null);
  };

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleSubmenuClick = (label) => {
    setOpenSubmenu((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const navItems = [
    { label: 'HOME', 
      submenu: [
      { label: 'Home', path: '/' }
  ] },
    { label: 'SUPPLEMENTS', 
      submenu: [
        { label: 'All', path: '/supplements/all' },
        { label: 'Proteins', path: '/supplements/proteins' }, 
        { label: 'Pre-Workouts', path: '/supplements/pre-workouts' }, 
        { label: 'Creatine', path: '/supplements/creatine' }
        ] },
        { label: 'CLOTHES', submenu: [ 
          { label: 'All', path: '/clothes/all' },
          { label: 'Mens', path: '/clothes/mens' },
          { label: 'Womens', path: '/clothes/womens' }
      ] },
      { label: 'ATHLETES', submenu: [ 
          { label: 'Athlete 1', path: '/athletes/athlete-1' },
          { label: 'Athlete 2', path: '/athletes/athlete-2' },
          { label: 'Athlete 3', path: '/athletes/athlete-3' },
          { label: 'All Athletes', path: '/athletes/all-athletes' }
      ] },
  ];

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: '#000',
          minHeight: '20px',
          boxShadow: 'none',
          zIndex: 2000,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: '20px !important',
            px: 2,
            justifyContent: isMobile ? 'center' : 'left', 
            gap: 2,
          }}
        >
          <IconButton sx={{ color: '#fff', '&:hover': { color: '#FF4500'} }}>
            <RiFacebookFill size={20}/>
          </IconButton>
          <IconButton sx={{ color: '#fff', '&:hover': { color: '#FF4500'} }}>
            <AiOutlineTikTok size={20} />
          </IconButton>
          <IconButton sx={{ color: '#fff', '&:hover': { color: '#FF4500'} }}>
            <FaInstagram size={20}/>
          </IconButton>
        </Toolbar>
      </AppBar>

      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: '#fff',
          color: '#000',
          boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
          zIndex: 1500,
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: { xs: 1, md: 3 },
            }}
          >
            {isMobile ? (
              <>
                <IconButton onClick={toggleDrawer}>
                  <GiHamburgerMenu size={28} style={{ color: '#000' }} />
                </IconButton>

                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={LogoGymKlanC}
                    alt="GymKlan"
                    style={{ height: '80px', width: '240px', filter: 'drop-shadow(2px 2px 3px rgba(0, 0, 0, 1))' }}
                  />
                </Box>

                <IconButton>
                  <LuShoppingCart style={{ color: '#000' }} />
                </IconButton>
              </>
            ) : (
              <>
                {/* Desktop original */}
                <Box sx={{ flexGrow: 1, flexBasis: '120px', minWidth: '120px' }} />

                <Box sx={{ flexShrink: 0 }}>
                  <img
                    src={LogoGymKlanC}
                    alt="GymKlan"
                    style={{
                      height: '100px',
                      width: '280px',
                      filter: 'drop-shadow(2px 2px 3px rgba(0, 0, 0, 1))',
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    flexGrow: 1,
                    justifyContent: 'flex-end',
                    pr: 7,
                  }}
                >
                  <IconButton>
                    <FiSearch style={{ color: 'black' }} />
                  </IconButton>
                  <IconButton>
                    <LuShoppingCart style={{ color: 'black' }} />
                  </IconButton>
                  <IconButton>
                    <FaRegUser style={{ color: 'black' }} />
                  </IconButton>
                </Box>
              </>
            )}
          </Toolbar>

          {!isMobile && (
            <Toolbar
              sx={{
                justifyContent: 'center',
                py: 0,
                minHeight: '80px',
              }}
            >
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                {navItems.map((item) => (
                  <Box
                    key={item.label}
                    onMouseEnter={(e) => handleMouseEnter(e, item.label)}
                    onMouseLeave={handleClose}
                    sx={{ position: 'relative' }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Alumni Sans SC',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        px: 1,
                        py: 1,
                        color: openMenu === item.label ? '#FF4500' : '#000',
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          bottom: '-5px',
                          height: '2px',
                          backgroundColor: 'transparent',
                          transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                        },
                        '&:hover::after, .active-menu::after': {
                          backgroundColor: '#FF4500',
                          boxShadow: '0 0 10px rgba(255, 69, 0, 0.7)',
                        },
                      }}
                    >
                      {item.label}
                    </Typography>
                    
                    <Menu
                      anchorEl={anchorEl}
                      open={openMenu === item.label}
                      onClose={handleClose}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                      MenuListProps={{ onMouseLeave: handleClose }}
                      PaperProps={{
                        sx: {
                          mt: 1,
                          boxShadow: '0 -5px 15px rgba(255, 69, 0, 0.7)',
                          px: 2,
                          py: 1,
                          minWidth: 200,
                          backgroundColor: '#000',
                        },
                      }}
                    >
                      {item.submenu.map((subItem) => (
                        <MenuItem
                          key={subItem.label}
                          onClick= {()=> hndlNavigation(subItem.path)}
                          sx={{
                            fontWeight: 'bold',
                            py: 1,
                            color: '#fff',
                            '&:hover': {
                              backgroundColor: '#333',
                              color: '#FF4500',
                            },
                          }}
                        >
                          {subItem.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                ))}
                <Tooltip
                title= 'Seccion de entrenamiento, donde podras encontrar cientos de ejercicios, rutinas, tips y más. ¡Próximamente!'
                arrow
                slotProps={{
                  popper: {
                      sx: {
                          '& .MuiTooltip-tooltip': {
                              bgcolor: '#ec1818', 
                              color: 'white',
                              fontSize: '0.7rem',
                              p: 1.5,
                              opacity: 0.5,
                          },
                          '& .MuiTooltip-arrow': {
                              color: '#ec1818', 
                          },
                      },
                  },
              }}>
                <Typography sx={{ fontWeight: 'bold', color: '#FF4500' }}>APPTRAINING</Typography>
                </Tooltip>
              </Box>
            </Toolbar>
          )}
        </Box>
      </AppBar>

      {isMobile && (
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}
        slotProps= {{
          paper: {
            sx: {
              bgcolor: '#fff',
              color: '#000',
            },
          },
        }}
        >
          <Box sx={{ width: 250, p: 2, mt: 10 }}>

            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 0.5, mt: 4 }}>
              <IconButton >
                <FaRegUser style={{ color: '#ff0000', }} /> 
                <Typography sx={{ ml: 1, color: '#ff0000', fontWeight: 'bold' }}>My Account</Typography>
                </IconButton>
            </Box>
            <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5, border: '1px solid #ccc', borderRadius: '5px', p: 1 }}>
              <FiSearch style={{ color: '#red' }} />
              <InputBase placeholder="Search..." fullWidth  sx={{ color: '#000', fontSize: '0.8rem' }} />
            </Box>

            

            <List>
              {navItems.map((item) => (
                <Box key={item.label}>
                  <ListItemButton onClick={() => handleSubmenuClick(item.label)}
                    sx= {{
                      color: openSubmenu[item.label] ? '#ff0000' : '#000',
                      '&:hover': {
                        backgroundColor: '#ff0000',
                        color: '#fff',
                      },
                    }}
                    >
                    <ListItemText primary={item.label} />
                    {openSubmenu[item.label] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openSubmenu[item.label]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.submenu.map((sub) => (
                        <ListItemButton key={sub.label} onClick={() => hndlNavigation(sub.path)} sx={{ pl: 4, color: '#848484', '&:hover': { backgroundColor: '#f44336', color: '#fff' } }}>
                          <ListItemText primary={sub.label} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              ))}
            </List>
            <Box sx={{ mt: 30 }}>
              <Button
               variant="contained"
                fullWidth
                onClick={() => hndlNvgApp('/apptraining/login')}
                 sx={{ fontWeight: 'bold', 
                 color: '#fff',
                 border: '1px solid #ff0000',
                 borderRadius: '10px',
                  backgroundColor: '#ff0000',
                   '&:hover': {
                     backgroundColor: '#ec1818',
                   }
                   }}
                   endIcon={<ArrowForwardIosIcon sx={{ ml: 2 }} />}
                   >
                    APPTRAINING
                    </Button>
                    <Typography  sx= {{ color: '#ccc', textAlign: 'center', mt: 1, fontSize: '0.8rem' }}>
                      pulsa para ingresar
                    </Typography>
                    
            </Box>
          </Box>
        </Drawer>
      )}
    </>
  );
}
