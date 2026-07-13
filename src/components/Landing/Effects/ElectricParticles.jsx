import { Box } from "@mui/material";

const particles = [
  { top: "12%", left: "18%", size: 3, delay: "0s" },
  { top: "24%", left: "76%", size: 4, delay: ".8s" },
  { top: "42%", left: "12%", size: 2, delay: "1.4s" },
  { top: "60%", left: "84%", size: 3, delay: "2s" },
  { top: "72%", left: "28%", size: 4, delay: "2.7s" },
  { top: "18%", left: "55%", size: 2, delay: "3.1s" },
  { top: "82%", left: "66%", size: 3, delay: "1.7s" },
  { top: "52%", left: "48%", size: 2, delay: ".5s" },
];

export default function ElectricParticles() {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      {particles.map((particle, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",

            top: particle.top,
            left: particle.left,

            width: particle.size,
            height: particle.size,

            borderRadius: "50%",

            background: "#4DB8FF",

            boxShadow: `
                0 0 8px rgba(70,180,255,.9),
                0 0 18px rgba(70,180,255,.55)
            `,

            animation: `particleFloat 6s ease-in-out infinite`,
            animationDelay: particle.delay,
          }}
        />
      ))}

      <Box
        sx={{
          "@keyframes particleFloat": {
            "0%": {
              opacity: 0,
              transform: "translateY(10px) scale(.8)",
            },

            "20%": {
              opacity: .9,
            },

            "50%": {
              transform: "translateY(-12px) scale(1.15)",
            },

            "80%": {
              opacity: .8,
            },

            "100%": {
              opacity: 0,
              transform: "translateY(-24px) scale(.8)",
            },
          },
        }}
      />
    </Box>
  );
}