import React  from "react";
import { useState } from "react";
import { Container, Typography, Tabs, Tab,Box, Divider, TextField,  } from "@mui/material";
import FormRegistro from "./formRegistro";
import UsersTable from "./UsersTable";

export default function Usuarios() {

const [ value, setValue ] = useState(0);

const hndlChange = (event, newValue) => {
    setValue(newValue);
}
    return (
        <Container maxWidth="lg">
            <Box sx={{  width: '100%', typography: 'body1' , mb: 2 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2, borderRadius: '10px' }}>
                <Tabs 
                value={value}
                 onChange={hndlChange} 
                 textColor="secondary" 
                 indicatorColor="secondary" 
                 aria-label="secondary tabs example"
                 sx= {{
                    '& .MuiTab-root': {
                        color: '#888',
                        fontWeight: 'bold',
                    },
                    '& .Mui-selected': {
                        color: '#000',
                        fontWeight: 'bold',
                        border: '1px solid rgb(0, 179, 255)',
                        bgcolor: 'rgb(0, 179, 255)'
                    },
                    '&:hover': {
                        color: '#fff'
                    }
                 }}
                 >
                    <Tab 
                    label="Usuarios" 
                    value={0}
                    sx= {{
                        '& .MuiTab-root': {
                        color: '#888',
                        fontWeight: 'bold',
                    },
                    '& .Mui-selected': {
                        color: '#fff',
                        fontWeight: 'bold',
                        border: '1px solid rgb(0, 179, 255)',
                        textShadow: '2px 2px 4px rgba(0, 204, 255, 0.7)',
                        bgcolor: 'rgb(0, 179, 255)'
                    },
                    '&:hover': {
                        color: '#fff'
                    }
                    }}
                     />
                      <Tab 
                    label="Inscripcion" 
                    value ={1}
                    
                    />
                </Tabs>
              </Box>
            {value === 0 &&  <UsersTable />}
            {value === 1 &&  <FormRegistro />}
            </Box>
        </Container>
    )
}