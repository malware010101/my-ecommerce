import React, { useState } from 'react';
import {
    Box,
    Typography,
    Autocomplete,
    TextField,
    Button
} from '@mui/material';



export default function SearchUsersForm({ programa, onAssign, onClose, allUsers }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const hndlAssign = () => {
    if (selectedUser) {
      onAssign(selectedUser);
    }
  };

  return (
    <Box>
      <Typography variant="h6" color="#fff" mb={2}>
        Selecciona un usuario para asignar el programa:
      </Typography>

      <Autocomplete
        options={allUsers} 
        getOptionLabel={(option) => option.nombre} // Muestra el nombre en el campo de texto
        onChange={(event, newValue) => {
          setSelectedUser(newValue); // Guarda el usuario seleccionado en el estado
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Buscar usuario"
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': { borderColor: 'rgb(0, 204, 255)' },
                '&:hover fieldset': { borderColor: 'rgb(0, 204, 255)' },
                '&.Mui-focused fieldset': { borderColor: 'rgb(0, 204, 255)' },
              },
              '& .MuiInputLabel-root': { color: '#bbb' },
              '& .MuiSvgIcon-root': { color: '#bbb' },
            }}
          />
        )}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, bgcolor: '#000', mt: 2 }}>
        <Button 
          variant="outlined" 
          onClick={onClose}
          sx={{ 
            borderColor: 'rgb(0, 204, 255)', 
            color: 'rgb(0, 204, 255)', 
            mr: 2, 
            fontWeight: 'bold', 
            '&:hover': { bgcolor: 'rgb(0, 204, 255)', color: '#fff', borderColor: 'rgb(0, 204, 255)' } 
          }}>
          Cerrar
        </Button>
        <Button
          variant="outlined"
          onClick={hndlAssign}
          disabled={!selectedUser} 
          sx={{
            borderColor: 'rgb(0, 204, 255)',
            color: 'rgb(0, 204, 255)',
            fontWeight: 'bold',
            '&:hover': { bgcolor: 'rgb(0, 204, 255)', color: '#fff', borderColor: 'rgb(0, 204, 255)' },
            '&.Mui-disabled': {
              borderColor: '#666',
              color: '#666'
            }
          }}>
          Asignar
        </Button>
      </Box>
    </Box>
  );
}