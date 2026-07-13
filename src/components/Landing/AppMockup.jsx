import React from "react";
import { Box } from "@mui/material";

export default function AppMockup({
  image,
  alt = "App Screenshot",
}) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* Glow */}
      <Box
        sx={{
          position: "absolute",
          width: {xs: 220, md: 300,},
          height: {xs: 220,md: 300,},
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(70,145,255,.28), transparent 72%)",
          filter: "blur(55px)",
          zIndex: 0,
        }}
      />

      {/* Marco */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          p: {xs: 1, md: 1.2, },
          borderRadius: 6,
          background: "rgba(255,255,255,.04)",
          border: "1px solid rgba(255,255,255,.08)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow:
            "0 40px 90px rgba(0,0,0,.45)",
          transition: ".35s ease",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow:
              "0 55px 120px rgba(0,0,0,.55)",
          },
        }}
      >

        {/* Barra superior */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            px: 1.4,
            py: 1,
            borderBottom:
              "1px solid rgba(255,255,255,.06)",
          }}
        >
          <Box
            sx={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              bgcolor: "#ff5f57",
            }}
          />

          <Box
            sx={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              bgcolor: "#febc2e",
            }}
          />

          <Box
            sx={{
              width: 9,
              height: 9,
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
          sx={{
            display: "block",
            width: "100%",
            maxWidth: {
              xs: 200,
              sm: 220,
              md: 220,
              lg: 220,
            },
            borderRadius: 3,
            mt: 1,
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
      </Box>
    </Box>
  );
}