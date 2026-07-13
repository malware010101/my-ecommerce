import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Button,
  useMediaQuery,
} from '@mui/material';

import { AiOutlineTikTok } from 'react-icons/ai';
import { RiFacebookFill } from 'react-icons/ri';
import { FaInstagram } from 'react-icons/fa';
import { Socials } from '../Config/socials';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { useNavigate } from 'react-router-dom';

import LogoReps from '../assets/LogoReps.webp';

export default function Navbar() {
  const navigate = useNavigate();

  const isMobile = useMediaQuery('(max-width:900px)');

  const hndlNvgApp = () => {
    navigate('/apptraining/login');
  };

  return (
    <>
      {/* =======================
          Barra superior redes
      ======================== */}

      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: '#000',
          boxShadow: 'none',
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: '32px !important',
            px: 2,
            justifyContent: 'center',
            gap: 2,
            borderBottom: '1px solid rgba(75,150,255,.45)',
          }}
        >
          <IconButton
          component='a'
          href= {Socials.facebook}
          target='_blank'
          size='small'
            sx={{
              color: '#4B96FF',
              '&:hover': {
                color: '#76B3FF',
              },
            }}
          >
            <RiFacebookFill />
          </IconButton>

          <IconButton
          component='a'
          href= {Socials.tiktok}
          target='_blank'
          size='small'
            sx={{
              color: '#4B96FF',
              '&:hover': {
                color: '#76B3FF',
              },
            }}
          >
            <AiOutlineTikTok />
          </IconButton>

          <IconButton
          component='a'
          href= {Socials.instagram}
          target='_blank'
          size='small'
            sx={{
              color: '#4B96FF',
              '&:hover': {
                color: '#76B3FF',
              },
            }}
          >
            <FaInstagram />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* =======================
              Navbar
      ======================== */}

      <AppBar
  position="sticky"
  elevation={0}
  sx={{
    background: "rgba(8,8,8,.62)",
    backdropFilter: "blur(22px)",
    WebkitBackdropFilter: "blur(22px)",

    borderBottom: "1px solid rgba(255,255,255,.045)",

    boxShadow: "none",

    transition: "all .25s ease",

    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(to bottom, rgba(255,255,255,.025), transparent)",
      pointerEvents: "none",
    },
  }}
>
        <Toolbar
  sx={{
    height: {
      xs: 72,
      md: 78,
    },

    px: {
      xs: 2,
      md: 5,
    },

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
          {/* Logo */}

          <Box
          sx={{
    cursor: "pointer",

    transition: ".25s",

    "&:hover img": {
      opacity: 1,
      transform: "scale(1.02)",
      filter:
        "drop-shadow(0 0 14px rgba(67,156,255,.65))",
    },
  }}
          >
            <img
              src={LogoReps}
              alt="REPS"
              style={{
                width: isMobile ? 125 : 165,
                height: 'auto',

                opacity: 0.72,
                transition: ".3s",

                filter:
                  "drop-shadow(0 0 10px rgba(67,156,255,.45))",
              }}
            />
          </Box>

          {/* Botón */}
         <Button
  onClick={hndlNvgApp}
  endIcon={<ArrowForwardIosIcon sx={{ fontSize: ".5rem" }} />}
  sx={{
  px: {
    xs: 2,
    md: 2.6,
  },

  height: {
    xs: 38,
    md: 40,
  },

  minWidth: 0,
  borderRadius: "999px",

  textTransform: "none",

  fontWeight: 600,

  letterSpacing: ".15px",

  fontSize: {
    xs: ".7rem",
    md: ".84rem",
  },

  color: "#fff",

  background:
    "linear-gradient(180deg,#3F8CFF 0%, #2E6CF6 100%)",

  boxShadow:
    "0 6px 22px rgba(41,118,255,.28)",

  transition: ".25s",

  "& .MuiButton-endIcon": {
    ml: 0.5,
    transition: ".25s",
  },

  "&:hover": {
    background:
      "linear-gradient(180deg,#4B96FF 0%, #3577FF 100%)",

    transform: "translateY(-1px)",

    boxShadow:
      "0 10px 26px rgba(41,118,255,.38)",
  },
  "&:hover .MuiButton-endIcon": {
    transform: "translateX(3px)",
  },
}}
>
  Ir a la aplicación
</Button>
        </Toolbar>
      </AppBar>
    </>
  );
}