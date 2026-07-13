import React from "react";
import { Box } from "@mui/material";

export default function ElectricArcs() {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 2,
      }}
    >
      {[...Array(8)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",

            width: {
              xs: 90,
              md: 180,
            },

            height: 2,

            borderRadius: 5,

            background:
              "linear-gradient(90deg, transparent, #6FB5FF, #9DD4FF, transparent)",

            filter: "blur(.6px)",

            opacity: 0,

            left: `${10 + i * 11}%`,
            top: `${15 + (i % 4) * 18}%`,

            transform: `rotate(${i % 2 === 0 ? -25 : 25}deg)`,

            animation: `electricFlash ${
              2 + i * 0.35
            }s infinite ease-in-out`,
          }}
        />
      ))}

      <style>
        {`
        @keyframes electricFlash{

            0%{
                opacity:0;
                transform:scaleX(.2);
            }

            10%{
                opacity:.95;
                transform:scaleX(1);
            }

            18%{
                opacity:.35;
            }

            25%{
                opacity:.9;
            }

            40%{
                opacity:0;
                transform:scaleX(.3);
            }

            100%{
                opacity:0;
            }

        }
        `}
      </style>
    </Box>
  );
}