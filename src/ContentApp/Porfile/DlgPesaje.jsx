import React, { useEffect, useState }  from 'react'
import { Dialog, DialogContent, DialogActions, Button, DialogTitle, TextField, IconButton, Stack, Typography, Box, Grid } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useMutation, useQueryClient } from '@tanstack/react-query';


export default function DlgPesaje( { open, onClose } ) {

    const [ form, setForm ] = useState({
        peso_kg: '',
        masa_muscular_kg: '',
        grasa_pct: '',
        imc: ''
    })

    const [ img, setImg ] = useState({
        foto_frontal_url: '',
        foto_izquierda_url: '',
        foto_derecha_url: '',
        foto_trasera_url: ''
    });

    const queryClient = useQueryClient();

    const createPesaje = useMutation({
  mutationFn: async (data) => {
    const res = await api.post("/pesajes/historico", data);
    return res.data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries(["pesajes"]);
    onClose();
  }
});

    const hndlImgChange = (key) => (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImg((prev) => ({
    ...prev,
    [key]: URL.createObjectURL(file)
  }));
    };

const hndlSubmit = async () => {
     createPesaje.mutate({
    ...form,
    peso_kg: Number(form.peso_kg),
    masa_muscular_kg: form.masa_muscular_kg ? Number(form.masa_muscular_kg) : null,
    grasa_pct: form.grasa_pct ? Number(form.grasa_pct) : null,
    imc: form.imc ? Number(form.imc) : null,
    foto_frontal_url: img.frontal,
    foto_izquierda_url: img.izquierda,
    foto_derecha_url: img.derecha,
    foto_trasera_url: img.trasera
  });
}

    const estiloTexfield = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#1f1f1fff',
                borderRadius: '10px',
            },
            '&:hover fieldset': {
                borderColor: 'rgb(0, 204, 255)',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'rgb(0, 204, 255)',
            },
            backgroundColor: 'transparent',
            color: '#fff',
        },
        '& .MuiInputBase-input': { color: '#fff' },
        '& .MuiInputLabel-root': { color: '#888' },
        '& .MuiInputLabel-root.Mui-focused': { color: 'rgb(0, 204, 255)' }
    };

   useEffect(() => {
  return () => {
    Object.values(img).forEach(url => {
      if (url) URL.revokeObjectURL(url);
    });
  };
}, []);

    return (
            <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
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

        }}
                >
                    Añadir Pesaje
                    <IconButton 
                         onClick={onClose} 
                         sx={{ color: '#bbb' }}>
                             <CloseIcon 
                                 sx= {{ color: '#fff', 
                                 fontSize: '1.7rem'}}/>
                     </IconButton>
                </DialogTitle>
                <DialogContent
                sx={{bgcolor: '#000', color: '#fff', textAlign: 'center' }}
                
                >
                    <Stack spacing={2} mt ={4} >
                 <TextField
                        value= {form.peso_kg}
                        onChange={(e) => setForm({ ...form, peso_kg: e.target.value })}
                        fullWidth
                        label="Peso (kg)"
                        type="number"
                        sx={estiloTexfield}
                    />
                    <TextField
                        value= {form.masa_muscular_kg}
                        onChange={(e) => setForm({ ...form, masa_muscular_kg: e.target.value })}
                        fullWidth
                        label="Masa Muscular (kg)"
                        type="number"
                        sx={estiloTexfield}
                    />
                    <TextField
                        value= {form.grasa_pct}
                        onChange={(e) => setForm({ ...form, grasa_pct: e.target.value })}
                        fullWidth
                        label="Grasa Corporal (%)"
                        type="number"
                        sx={estiloTexfield}
                    />
                    <TextField
                        value= {form.imc}
                        onChange={(e) => setForm({ ...form, imc: e.target.value })}
                        fullWidth
                        label='Imc'
                        type="number"
                        sx={estiloTexfield}
                    />
                    <Box mt={3}>
  <Typography
    fontWeight="bold"
    mb={1}
    color="#bbb"
    textAlign="left"
  >
    Fotos Actuales
  </Typography>
  <Typography
    mb={1}
    color="#bbb"
    textAlign="left"
    fontSize="0.75rem"
    opacity={0.5}
  >
    Sube tus fotos actuales para monitorear tu progreso (png, jpg, jpeg)
  </Typography>
        

  <Grid container spacing={2}>
    {[
      { key: 'frontal', label: 'Frontal' },
      { key: 'izquierda', label: 'Perfil izquierdo' },
      { key: 'derecha', label: 'Perfil derecho' },
      { key: 'trasera', label: 'Posterior' },
    ].map(({ key, label }) => (
      <Grid item xs={6} key={key}>
        <Box
          sx={{
            border: '1px  rgb(0, 204, 255)',
            bgcolor: '#111010ff',
            opacity: 0.7,
            borderRadius: '12px',
            height: 120,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
          component="label"
        >
          {img [key] ? (
            <img
              src={img[key]}
              alt={label}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <>
              <CloudUploadIcon sx={{ color: '#bbb', fontSize: 25 }} />
              <Typography fontSize="0.75rem" color="#bbb" mt={1}>
                {label}
              </Typography>
            </>
          )}

          <input
            hidden
            accept="image/*"
            type="file"
            onChange={hndlImgChange(key)}
          />
        </Box>
      </Grid>
    ))}
  </Grid>
</Box>
                    </Stack>
                    </DialogContent>
                <DialogActions sx= {{ px: 3, pb: 2, bgcolor: '#000'}}>
                    <Button
                    onClick= {hndlSubmit}
                    variant = "contained"
                    fullWidth
                    sx={{
            borderRadius: '20px',
            bgcolor: '#00B3FF',
            fontWeight: 'bold',
            '&:hover': { bgcolor: 'darkgreen' }
          }}
                    >
                    Guardar
                    </Button>
                    </DialogActions>
            </Dialog>
    );
}