import React from "react";
import { Box } from "@mui/material";

export default function MockupItem({
  image,
  alt = "App Screenshot",
}) {
  return (
    <Box
      sx={{
        position: "relative",

        width: {
          xs: 175,
          sm: 195,
          md: 235,
          lg: 255,
        },

        borderRadius: "26px",

        overflow: "hidden",

        background:
          "linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.03))",

        border: "1px solid rgba(255,255,255,.08)",

        backdropFilter: "blur(18px)",

        WebkitBackdropFilter: "blur(18px)",

        boxShadow:
          `
          0 40px 80px rgba(0,0,0,.45),
          0 0 0 1px rgba(255,255,255,.04),
          inset 0 1px rgba(255,255,255,.08)
          `,

        transition: ".35s ease",

        "&:hover": {
          transform: "translateY(-10px)",

          boxShadow:
            `
            0 55px 120px rgba(0,0,0,.55),
            0 0 45px rgba(61,146,255,.18),
            inset 0 1px rgba(255,255,255,.1)
            `,
        },
      }}
    >
      {/* Glow */}

      <Box
        sx={{
          position: "absolute",

          inset: -70,

          background:
            "radial-gradient(circle, rgba(70,145,255,.22), transparent 72%)",

          filter: "blur(45px)",

          zIndex: 0,
        }}
      />

      {/* Barra superior */}

      <Box
        sx={{
          position: "relative",

          zIndex: 2,

          display: "flex",

          alignItems: "center",

          gap: .8,

          px: 2,

          py: 1.2,

          borderBottom:
            "1px solid rgba(255,255,255,.05)",

          background:
            "rgba(255,255,255,.03)",
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: "#ff5f57",
          }}
        />

        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: "#febc2e",
          }}
        />

        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: "#28c840",
          }}
        />
      </Box>

      {/* Imagen */}

      <Box
        component="img"
        src={image}
        alt={alt}
        draggable={false}
        sx={{
          position: "relative",

          zIndex: 2,

          display: "block",

          width: "100%",

          userSelect: "none",

          pointerEvents: "none",
        }}
      />
    </Box>
  );
}