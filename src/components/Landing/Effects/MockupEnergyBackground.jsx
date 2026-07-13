import React from "react";
import { Box } from "@mui/material";

import EnergyCore from "./EnergyCore";
import EnergyLines from "./EnergyLines";
import ElectricArcs from "./ElectricArcs";
import ElectricParticles from "./ElectricParticles";
import ElectricBackground from "./ElectricBackground";

export default function MockupEnergyBackground({ children }) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* ===== BACKGROUND EFFECTS ===== */}

      <Box sx={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <EnergyCore />
        <ElectricBackground />
        <EnergyLines />
        <ElectricArcs />
        <ElectricParticles />
      </Box>

      {/* ===== MOCKUPS ===== */}

      <Box sx={{ position: "relative", zIndex: 2 }}>
        {children}
      </Box>
    </Box>
  );
}