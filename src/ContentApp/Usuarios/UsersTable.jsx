
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import DlgRenovacion from "./DlgRenovacion";

export default function UsersTable() {
    const [search, setSearch] = useState("");
    const [openDlg, setOpenDlg] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const navigate = useNavigate();

    const hndlShowPerfil = (row) => {
        navigate(`/apptraining/profile/${row.id}`);
    }


    const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await api.get("/auth/users");
      return data;
    },
  });
  
  const filteredUsers = search
  ? users?.filter((user) => {
      const value = search.toLowerCase();
      return (
        `${user?.id ?? ""}`.includes(value) ||
        `${user?.nombre ?? ""}`.toLowerCase().includes(value) ||
        `${user?.rol ?? ""}`.toLowerCase().includes(value) ||
        `${user?.membresia_plan ?? ""}`.toLowerCase().includes(value)||
        `${user?.membresia_estado ?? ""}`.toLowerCase().includes(value)
      );
    })
  : users;

  const columns = [
    { field: 'id', headerName: 'ID', width: 89},
    { field: 'nombre', headerName: 'Nombre', flex: 1, minWidth: 200 },
    { field: 'rol', headerName: 'Rol', width: 120},
    {field: 'membresia_plan', headerName: 'Plan', width: 120},
    {field: 'duracion_plan', headerName: 'Duración', width: 120,
      valueGetter: (value) => value ? `${value} días` : "-"
    },
    {field: "membresia_inicio",
  headerName: "Inicio",
  width: 170,
  valueGetter: (value) =>
    value
      ? dayjs(value).format("DD/MM/YYYY HH:mm")
      : "-"
      
    },
    {field: "membresia_fin",
    headerName: "Fin",
    width: 170,
    valueGetter: (value) =>
    value
      ? dayjs(value).format("DD/MM/YYYY HH:mm")
      : "-"
    },
    {field: "dias_restantes",
     headerName: "Expira",
     width: 120,
     valueGetter: (value) =>
       value != null ? `${value} días` : "-"
    },
    {
  field: "membresia_estado",
  headerName: "Estado",
  width: 130,
  renderCell: (params) => {

    const color = {
      activa: "#4CAF50",
      vencida: "#F44336",
      cancelada: "#FF9800",
    }[params.value] || "#888";

    return (
      <Box
        sx={{
          color,
          fontWeight: "bold",
          textTransform: "uppercase"
        }}
      >
        {params.value}
      </Box>
    );
  }
},
     {
  field: "Membresia",
  headerName: "Membresia",
  sortable: false,
  width: 140,
  renderCell: (params) => {

    const vencida = params.row.membresia_estado === "vencida";

    return (
      <Button
        variant="contained"
      
        size="small"
        disabled={!vencida}
        onClick={() => {
          setSelectedUser(params.row);
          setOpenDlg(true);
        }}
        sx={{
          bgcolor: vencida ? "rgb(0, 179, 255)" : "#424242",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "11px",
          borderRadius: "20px",

          "&:hover": {
            bgcolor: vencida
              ? "rgb(3, 160, 228)"
              : "#424242",
          },

          "&.Mui-disabled": {
            bgcolor: "#1d1d1d",
            color: "#666",
          },
        }}
      >
       {vencida ? "Renovar" : "Vigente"}
      </Button>
    );
  },
},
    {
    field: "accion",
    headerName: "Acción",
    sortable: false,
    width: 120,
    renderCell: (params) => (
      <Button
        variant="contained"
        size="small"
        onClick={() => hndlShowPerfil(params.row)}
        sx={{
          bgcolor: "rgb(0, 179, 255)",
          fontWeight: "bold",
          fontSize: "11px",
          borderRadius: "20px",
          "&:hover": {
            bgcolor: "rgb(3, 160, 228)",
          },
        }}
      >
        Ver Perfil
      </Button>
    ),
  },
  ]

  if (isLoading) return <CircularProgress />;

  return (
    <>
    <Box
  sx={{
    display: "flex",
    justifyContent: "flex-end",
    mb: 1,
    mt: 3,
  }}
>
  <TextField
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    label="Buscar"
    name="busqueda"
    size="small"
    sx={{
      width: 220, 
      '& .MuiOutlinedInput-root': { color: '#fff' },
      '& .MuiInputLabel-root': { color: '#424242ff' },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#272727ff',
        borderRadius: '20px'
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgb(0, 204, 255)'
      },
      ' & .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgb(0, 204, 255)'
      }
      
    }}
    InputProps={{
      startAdornment: <SearchIcon sx={{ color: '#888', mr: 1 }} />,
    }}
  />
</Box>
    
    <Box sx={{ height: 500, width: '100%', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0, 204, 255, 0.7)' }}>
      <DataGrid
        rows={filteredUsers || []}
        columns={columns}
        rowsPerPageOptions={[10]}
        initialState ={{
            pagination: {
                paginationModel: {
                    pageSize: 10,
                    page: 0
                },
            }
        }}
        sx= {{
            border: 'none',
            '& .MuiDataGrid-cell': {
                border: 'none',
            },
            bgcolor: '#000',
            ' & .MuiDataGrid-columnHeader': {
                 backgroundColor: "rgb(0, 179, 255)",
                 color: "#fff",
                 fontWeight: "bold",
                 fontSize: "16px",
                 borderBottom: "none",
            },
            "& .MuiDataGrid-cell": {
      borderBottom: "0.5px solid #000000ff",
    },

    // Quitar borde al hacer click en celda
    "& .MuiDataGrid-cell:focus": {
      outline: "none",

    },

    "& .MuiDataGrid-cell:focus-within": {
      outline: "none",
    },

    // Quitar borde en header al hacer click
    "& .MuiDataGrid-columnHeader:focus": {
      outline: "none",
    },

    // Quitar borde del grid
    "& .MuiDataGrid-columnSeparator": {
      display: "none",
    },

    // Hover fila
    "& .MuiDataGrid-row:hover": {
      backgroundColor: "#0d0d0dff",
    },

    // Paginación
    "& .MuiTablePagination-root": {
      color: "#888",
    },

        }}
      />
    </Box>
    <DlgRenovacion
      open = {openDlg}
      user= {selectedUser}
      onClose={() => setOpenDlg(false)}
    />
    </>
  );
}