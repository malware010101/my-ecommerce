import React from "react";
import { Box } from "@mui/material";

export default function EnergyCore() {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Núcleo */}
      <Box
        sx={{
          position: "absolute",
          width: {
            xs: 120,
            md: 180,
          },
          height: {
            xs: 120,
            md: 180,
          },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(120,210,255,.95) 0%, rgba(75,145,255,.75) 35%, rgba(20,90,255,.35) 65%, transparent 100%)",
          filter: "blur(12px)",
          animation: "energyCore 3.5s ease-in-out infinite",
        }}
      />

      {/* Halo medio */}
      <Box
        sx={{
          position: "absolute",
          width: {
            xs: 220,
            md: 340,
          },
          height: {
            xs: 220,
            md: 340,
          },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(94,166,255,.35), transparent 70%)",
          filter: "blur(35px)",
          animation: "energyHalo 5s ease-in-out infinite",
        }}
      />

      {/* Halo exterior */}
      <Box
        sx={{
          position: "absolute",
          width: {
            xs: 320,
            md: 500,
          },
          height: {
            xs: 320,
            md: 500,
          },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(70,145,255,.15), transparent 75%)",
          filter: "blur(80px)",
          animation: "energyHalo2 7s ease-in-out infinite",
        }}
      />

      {/* Destello central */}
      <Box
        sx={{
          position: "absolute",
          width: {
            xs: 26,
            md: 36,
          },
          height: {
            xs: 26,
            md: 36,
          },
          borderRadius: "50%",
          background: "#E8F7FF",
          boxShadow:
            "0 0 20px #AEE8FF, 0 0 40px #78C8FF, 0 0 80px #3F8CFF",
          animation: "coreFlash 2.2s ease-in-out infinite",
        }}
      />

      <style>
        {`
          @keyframes energyCore{

            0%{
              transform:scale(.95);
              opacity:.75;
            }

            50%{
              transform:scale(1.08);
              opacity:1;
            }

            100%{
              transform:scale(.95);
              opacity:.75;
            }

          }

          @keyframes energyHalo{

            0%{
              transform:scale(.9);
              opacity:.35;
            }

            50%{
              transform:scale(1.1);
              opacity:.7;
            }

            100%{
              transform:scale(.9);
              opacity:.35;
            }

          }

          @keyframes energyHalo2{

            0%{
              transform:scale(1);
              opacity:.2;
            }

            50%{
              transform:scale(1.15);
              opacity:.45;
            }

            100%{
              transform:scale(1);
              opacity:.2;
            }

          }

          @keyframes coreFlash{

            0%{
              transform:scale(.8);
              opacity:.8;
            }

            50%{
              transform:scale(1.25);
              opacity:1;
            }

            100%{
              transform:scale(.8);
              opacity:.8;
            }

          }
        `}
      </style>
    </Box>
  );
}