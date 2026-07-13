import React from "react";
import { Box } from "@mui/material";

const lines = [
  {
    top: "18%",
    left: "-8%",
    width: "48%",
    rotate: "-12deg",
    delay: "0s",
  },
  {
    top: "34%",
    right: "-10%",
    width: "42%",
    rotate: "14deg",
    delay: ".8s",
  },
  {
    bottom: "22%",
    left: "-6%",
    width: "55%",
    rotate: "8deg",
    delay: "1.4s",
  },
  {
    bottom: "12%",
    right: "-8%",
    width: "46%",
    rotate: "-15deg",
    delay: "2s",
  },
];

export default function EnergyLines() {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {lines.map((line, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",

            ...line,

            height: "2px",

            borderRadius: "999px",

            background:
              "linear-gradient(90deg, transparent, rgba(94,166,255,.95), rgba(130,205,255,.95), transparent)",

            transform: `rotate(${line.rotate})`,

            transformOrigin: "center",

            animation: `energyPulse 4s infinite`,
            animationDelay: line.delay,

            boxShadow:
              "0 0 8px rgba(94,166,255,.8), 0 0 22px rgba(94,166,255,.45)",
          }}
        />
      ))}

      <style>
        {`
          @keyframes energyPulse{

            0%{
              opacity:.15;
              filter:blur(0px);
            }

            25%{
              opacity:.9;
              filter:blur(.3px);
            }

            50%{
              opacity:.35;
            }

            75%{
              opacity:1;
            }

            100%{
              opacity:.15;
            }

          }
        `}
      </style>
    </Box>
  );
}