import React, { useEffect, useState, useRef }  from 'react'
import { Dialog, DialogContent, DialogActions, Button, DialogTitle, TextField, IconButton, Stack, Typography, Box, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api';
import {useSnackbar} from 'notistack';


export default function DlgPesaje( { open, onClose, onPesajeCreated } ) {

    const [ form, setForm ] = useState({
        peso_kg: '',
        grasa_valor: '',
        grasa_tipo: '',

        musculo_valor: '',
        musculo_tipo: '',

        imc: ''
    })

    const [ img, setImg ] = useState({
        foto_frontal_url: '',
        foto_izquierda_url: '',
        foto_derecha_url: '',
        foto_trasera_url: ''
    });

const [files, setFiles] = useState({
    foto_frontal_url: null,
    foto_izquierda_url: null,
    foto_derecha_url: null,
    foto_trasera_url: null
});

  const peso = Number(form.peso_kg);
  const grasa = Number(form.grasa_valor);
  const musculo = Number(form.musculo_valor);

const formularioValido =
  peso > 0 &&
  peso <= 400 &&
  grasa > 0 &&
  musculo > 0 &&
  !!form.grasa_tipo &&
  !!form.musculo_tipo;

const resetForm = () => {
  setForm({
    peso_kg: '',
    grasa_valor: '',
    grasa_tipo: '',
    musculo_valor: '',
    musculo_tipo: '',
    imc: ''
  });

  setImg({
    foto_frontal_url: '',
    foto_izquierda_url: '',
    foto_derecha_url: '',
    foto_trasera_url: ''
  });
};

const uploadPsjImg = async (files) => {

  const formData = new FormData();

  if (files.foto_frontal_url)
        formData.append("foto_frontal", files.foto_frontal_url);

    if (files.foto_izquierda_url)
        formData.append("foto_izquierda", files.foto_izquierda_url);

    if (files.foto_derecha_url)
        formData.append("foto_derecha", files.foto_derecha_url);

    if (files.foto_trasera_url)
        formData.append("foto_trasera", files.foto_trasera_url);

    const res = await api.post("/upfiles/pesajes", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return res.data;
  
}

  const {enqueueSnackbar} = useSnackbar();
  const notiSound = useRef(
    new Audio('/sounds/success.mp3')
  )

    const queryClient = useQueryClient();

    const createPesaje = useMutation({
  mutationFn: async (data) => {
    const res = await api.post("/pesajes/historico", data);
    return res.data;
  },
  onSuccess: () => {

    queryClient.invalidateQueries(["pesajes"]);

    onPesajeCreated?.();

    enqueueSnackbar('Pesaje registrado exitosamente', 
      { variant: 'success' });
      
      notiSound.current.currentTime = 0;
      notiSound.current.play().catch(() => {});

      resetForm();
      onClose();
  },
  onError: (error) => {
    console.error("ERROR BACKEND", error);
    enqueueSnackbar(
      error.response?.data?.detail || "Error al registrar pesaje",
      { variant: 'error' }
    )
  }
});

    const hndlImgChange = (key) => (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFiles(prev => ({
        ...prev,
        [key]: file
    }));

        setImg((prev) => ({
    ...prev,
    [key]: URL.createObjectURL(file)
  }));
    };

const hndlSubmit = async () => {
try {
  let urls = {};
  
const HayImagenes = 
  files.foto_frontal_url ||
  files.foto_izquierda_url ||
  files.foto_derecha_url ||
  files.foto_trasera_url;

  if(
    HayImagenes) {
    urls = await uploadPsjImg(files);
  }
  const payload = {
      peso_kg: Number(form.peso_kg),

      grasa_valor: Number(form.grasa_valor),
      grasa_tipo: form.grasa_tipo,

      musculo_valor: Number(form.musculo_valor),
      musculo_tipo: form.musculo_tipo,

      imc: form.imc ? Number(form.imc) : null,
      ...urls
  }
  createPesaje.mutate(payload);

} catch (error) {
  enqueueSnackbar(
    'Error al registrar pesaje',
    { variant: 'error' }
  )
}    
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

    const estiloSelect = {
  minWidth: 70,

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#1f1f1f"
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgb(0,204,255)"
  },

  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgb(0,204,255)"
  },

  "& .MuiSelect-select": {
    color: "#fff"
  },

  "& .MuiSvgIcon-root": {
    color: "#fff"
  }
};

   useEffect(() => {
  return () => {
    Object.values(img).forEach(url => {
      if (url) URL.revokeObjectURL(url);
    });
  };
}, [img]);


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
                         onClick={() => { 
                          resetForm(); 
                          onClose();
                         }}
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
                    <Box display="flex" gap={2}>
                 <TextField
                     fullWidth
                     label="Masa Muscular"
                     type="number"
                     value={form.musculo_valor}
                     onChange={(e) =>
                        setForm({
                           ...form,
                           musculo_valor: e.target.value
                    })}
                   sx={estiloTexfield}
                  />

                 <FormControl sx={ {
                  ...estiloTexfield,
                  width: 120
                 }}>
                    <Select
                    sx={estiloSelect}
                       value={form.musculo_tipo}
                       onChange={(e) =>
                          setForm({
                            ...form,
                            musculo_tipo: e.target.value
                          })
                       }
                    >
                     <MenuItem value="%">%</MenuItem>
                     <MenuItem value="kg">kg</MenuItem>
                    </Select>
                 </FormControl>
               </Box>
               <Box display="flex" gap={2}>
                 <TextField
                     fullWidth
                     label="Grasa Corporal"
                     type="number"
                     value={form.grasa_valor}
                     onChange={(e) =>
                        setForm({
                           ...form,
                           grasa_valor: e.target.value
                    })
                   }
                   sx={estiloTexfield}
                  />

                 <FormControl sx={ {
                  ...estiloTexfield,
                  width: 120
                 }}>
                    <Select
                       sx={estiloSelect}
                       value={form.grasa_tipo}
                       onChange={(e) =>
                          setForm({
                            ...form,
                            grasa_tipo: e.target.value
                          })
                       }
                    >
                     <MenuItem value="%">%</MenuItem>
                     <MenuItem value="kg">kg</MenuItem>
                    </Select>
                 </FormControl>
               </Box>
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
      { key: 'foto_frontal_url', label: 'Frontal' },
      { key: 'foto_izquierda_url', label: 'Perfil izquierdo' },
      { key: 'foto_derecha_url', label: 'Perfil derecho' },
      { key: 'foto_trasera_url', label: 'Posterior' },
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
                    disabled = {!formularioValido || createPesaje.isPending}
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
                    {createPesaje.isPending 
                    ? 'Cargando...'
                     : 'Guardar'}
                    </Button>
                    </DialogActions>
            </Dialog>
    );
}