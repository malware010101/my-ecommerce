import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function TabsClothes({ value, onChange, tabLabels }) {
    
    return (
        <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: '#fff', color: '#000', borderRadius: 2, px: 2 }}>
      <Tabs
        value={value}
        onChange={onChange}
        variant="scrollable"
        scrollButtons={false}
        allowScrollButtonsMobile
        aria-label="scrollable prevent tabs example"
        textColor="inherit" 
        sx={{
          "& .MuiTab-root": {
            fontSize: "1rem",
            fontWeight: "600",
            position: "relative",
            "&:not(:last-of-type)::after": {
              content: '""',
              position: "absolute",
              right: 0,
              top: "25%",
              height: "50%",   // altura del divisor
              width: "1px",
              backgroundColor: "#ccc", // color de la línea
            },
          },
          "& .Mui-selected": { color: "red" },
        }}
      >
        {tabLabels.map((label, index) => (
                    <Tab key={index} label={label} />
                ))}
      </Tabs>
    </Box>
    )
}