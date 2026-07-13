import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

export default function CardPlan({
  nombre,
  dias,
  precio,
  color,
  selected = false,
  onClick,
}) {
  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: "pointer",
        borderRadius: "14px",
        border: `1px solid ${selected ? color : "#1f1f1f"}`,
        bgcolor: selected ? "rgba(255,255,255,.03)" : "#0a0a0a",
        px: 2,
        py: 1.5,
        mb: 1.5,

        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        transition: ".25s",

        "&:hover": {
          borderColor: color,
          transform: "translateY(-2px)",
          boxShadow: `0 0 14px ${color}30`,
        },
      }}
    >
      {/* Indicador */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          minWidth: 170,
        }}
      >
        {selected ? (
          <CheckCircleIcon
            sx={{
              color,
              fontSize: 22,
            }}
          />
        ) : (
          <RadioButtonUncheckedIcon
            sx={{
              color: "#666",
              fontSize: 22,
            }}
          />
        )}

        <Typography
          sx={{
            color: "#fff",
            fontWeight: 700,
            fontSize: ".95rem",
          }}
        >
          {nombre}
        </Typography>
      </Box>

      {/* Duración */}
      <Typography
        sx={{
          color: "#9E9E9E",
          fontWeight: 500,
          fontSize: ".9rem",
        }}
      >
        {dias} días
      </Typography>

      {/* Precio */}
      <Typography
        sx={{
          color,
          fontWeight: 800,
          fontSize: "1rem",
          minWidth: 95,
          textAlign: "right",
        }}
      >
        ${precio}
      </Typography>
    </Box>
  );
}