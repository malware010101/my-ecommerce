import { Box } from "@mui/material";

export default function ElectricBackground() {
  return (
    <>
      {/* Glow principal */}
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
        <Box
          sx={{
            width: {
              xs: 230,
              md: 420,
            },

            height: {
              xs: 230,
              md: 420,
            },

            borderRadius: "50%",

            background:
              "radial-gradient(circle, rgba(41,121,255,.30) 0%, rgba(41,121,255,.14) 35%, transparent 72%)",

            filter: "blur(65px)",

            animation: "electricPulse 5s ease-in-out infinite",
          }}
        />
      </Box>

      {/* Destello superior */}
      <Box
        sx={{
          position: "absolute",

          top: "18%",

          left: "50%",

          transform: "translateX(-50%)",

          width: {
            xs: 130,
            md: 220,
          },

          height: 2,

          background:
            "linear-gradient(90deg, transparent, #40B9FF, transparent)",

          filter: "blur(2px)",

          opacity: .65,

          animation: "electricFlash 4s infinite",
        }}
      />

      {/* Keyframes */}
      <Box
        sx={{
          "@keyframes electricPulse": {
            "0%": {
              transform: "scale(.9)",
              opacity: .45,
            },

            "50%": {
              transform: "scale(1.08)",
              opacity: .85,
            },

            "100%": {
              transform: "scale(.9)",
              opacity: .45,
            },
          },

          "@keyframes electricFlash": {
            "0%": {
              opacity: .15,
              width: 120,
            },

            "50%": {
              opacity: .9,
              width: 260,
            },

            "100%": {
              opacity: .15,
              width: 120,
            },
          },
        }}
      />
    </>
  );
}