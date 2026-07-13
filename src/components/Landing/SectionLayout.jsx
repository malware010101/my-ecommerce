import React from "react";
import {
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

export default function SectionLayout({
  chip,
  icon,
  title,
  description,
  checks = [],
  action = null,
  media = null,
  reverse = false,
}) {
  return (
    <Box
      component="section"
      sx={{
        py: {
          xs: 10,
          md: 18,
        },
      }}
    >
      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            lg: reverse ? "1fr 1.15fr" : "1.15fr 1fr",
          },

          alignItems: "center",

          gap: {
            xs: 8,
            md: 10,
            lg: 12,
          },
        }}
      >
        {/* ==========================
              COLUMNA TEXTO
        ========================== */}

        <Box
          sx={{
            order: {
              xs: 1,
              lg: reverse ? 2 : 1,
            },

            maxWidth: {
              lg: 560,
            },
          }}
        >
          <Chip
            icon={icon}
            label={chip}
            sx={{
              mb: 3,

              px: 1,

              height: 32,

              color: "#5CA4FF",

              fontWeight: 700,

              fontSize: ".68rem",

              letterSpacing: ".08em",

              background: "rgba(255,255,255,.06)",

              border: "1px solid rgba(255,255,255,.08)",

              "& .MuiChip-icon": {
                color: "#5CA4FF",
              },
            }}
          />

          <Typography
            sx={{
              color: "#fff",

              fontWeight: 700,

              lineHeight: 1,

              letterSpacing: "-.045em",

              mb: 3,

              fontSize: {
                xs: "2.2rem",
                md: "4rem",
              },
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,.65)",

              lineHeight: 1.8,

              mb: 5,

              fontSize: {
                xs: ".88rem",
                md: "1rem",
              },
            }}
          >
            {description}
          </Typography>

          {checks.length > 0 && (
            <Stack spacing={2.2}>
              {checks.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",

                    alignItems: "center",

                    gap: 1.5,
                  }}
                >
                  <CheckCircleRoundedIcon
                    sx={{
                      color: "#5CA4FF",

                      fontSize: 22,
                    }}
                  />

                  <Typography
                    sx={{
                      color: "#5CA4FF",

                      fontSize: {
                        xs: ".88rem",
                        md: "1rem",
                      },
                    }}
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
            </Stack>
          )}

          {action && (
            <Box
              sx={{
                mt: 5,
              }}
            >
              {action}
            </Box>
          )}
        </Box>

        {/* ==========================
              COLUMNA MOCKUPS
        ========================== */}

        <Box
          sx={{
            order: {
              xs: 2,
              lg: reverse ? 1 : 2,
            },

            display: "flex",

            justifyContent: "center",

            alignItems: "center",

            width: "100%",
          }}
        >
          {media}
        </Box>
      </Box>
    </Box>
  );
}