import {React, useEffect, useState} from 'react'
import { Dialog, DialogContent, DialogActions,IconButton,DialogTitle, Typography, Box } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';

export default function DlgImg({open, onClose, pesaje}) {

    const [index, setIndex] = useState(0);

    const [fotos, setFotos] = useState([]);

    const HayImgs = fotos.length > 0;
    const safeIndex = HayImgs ? index % fotos.length : 0;

    const hndlNext = () => {
        setIndex((prevIndex) => (prevIndex + 1) % fotos.length);
      };
    
      const hndlPrev = () => {
        setIndex((prevIndex) => (prevIndex - 1 + fotos.length) % fotos.length);
      };

useEffect(() => {
    if(!pesaje) return;
    const img = [
        pesaje.foto_frontal_url,
        pesaje.foto_izquierda_url,
        pesaje.foto_derecha_url,
        pesaje.foto_trasera_url
    ].filter(Boolean);
    setFotos(img);
    setIndex(0);
}, [open, pesaje]);

const currentImagen = fotos.length ? fotos[index % fotos.length] : null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth   
            sx={{
                '& .MuiDialog-paper': {
                    bgcolor: '#000',
                    borderRadius: '16px',
                    border: '1px solid rgba(0, 0, 0, 1)',
                    boxShadow: '0 4px 10px rgba(0, 204, 255, 0.7)'
                }
            }}
        >
            <DialogTitle
                sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    bgcolor: '#00B3FF',
                    p: 1,
                    fontSize: '1.0rem'
                }}
            >
                FOTOS DE EL PESAJE
                <IconButton 
                    onClick={onClose}
                    sx={{
                        color: 'white',
                        '&:hover': {
                            bgcolor: 'rgba(0, 0, 0, 0.2)',
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent
              sx={{
                  bgcolor: "#000",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: 500,
                  position: "relative",
                  overflow: "hidden"
                }}
            >
            { currentImagen ? (
                <>
               <Box
                  component="img"
                  src={currentImagen}
                  alt="Foto del pesaje"
                  sx={{
                   width: "100%",
                   maxHeight: "70vh",
                   objectFit: "contain",
                   borderRadius: 2,
                   animation: "fade .25s ease",

                 "@keyframes fade": {
                   from: {
                       opacity: 0,
                   },
                   to: {
                       opacity: 1,
                   },
                },
                }}
                />
                <IconButton
                onClick={hndlPrev}
                sx={{
                    position: "absolute",
        left: 16,
        top: "50%",
        transform: "translateY(-50%)",
        width: 44,
        height: 44,
        bgcolor: "rgba(255,255,255,.12)",
        backdropFilter: "blur(8px)",
        color: "#fff",
        transition: ".25s",

        "&:hover": {
            bgcolor: "rgba(0,179,255,.35)",
            transform: "translateY(-50%) scale(1.08)"
        }

                }}
                >
                <ArrowBackIosNewIcon />
                </IconButton>

                <IconButton
                onClick={hndlNext}
                sx={{
                    position: "absolute",
        right: 16,
        top: "50%",
        transform: "translateY(-50%)",
        width: 44,
        height: 44,
        bgcolor: "rgba(255,255,255,.12)",
        backdropFilter: "blur(8px)",
        color: "#fff",
        transition: ".25s",

        "&:hover": {
            bgcolor: "rgba(0,179,255,.35)",
            transform: "translateY(-50%) scale(1.08)"
        }

                }}
                >
                <ArrowForwardIosIcon />
                </IconButton>

                 {fotos.map((_, i) => (
        <Box
            key={i}
            onClick={() => setIndex(i)}
            sx={{
                width: index === i ? 11 : 8,
                height: index === i ? 11 : 8,
                borderRadius: "50%",
                bgcolor:
                    index === i
                        ? "#00B3FF"
                        : "rgba(255,255,255,.45)",
                cursor: "pointer",
                transition: ".25s",
                boxShadow:
                    index === i
                        ? "0 0 8px #00B3FF"
                        : "none"
            }}
        />
    ))}
                </>

            ) : (
                <Typography 
                variant="body1"
                color="#888"
                textAlign="center"
                sx={{ py: 6 }}
                >
                   Este pesaje no tiene fotografias
                </Typography>
            )}
            </DialogContent>
        </Dialog>
    )
}