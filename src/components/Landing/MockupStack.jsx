import React from "react";
import { Box } from "@mui/material";

export default function MockupStack({
  children,
  count = 1,
}) {
  const items = React.Children.toArray(children);

  const transforms = {
    1: [
      {
        zIndex: 3,
        transform: {
          xs: "translate(0px,0px) scale(.82)",
          md: "translate(0px,0px) scale(1)",
        },
      },
    ],

    2: [
      {
        zIndex: 1,
        transform: {
          xs: "translate(-45px,12px) scale(.74)",
          md: "translate(-90px,25px) scale(.88)",
        },
        opacity: .55,
      },
      {
        zIndex: 3,
        transform: {
          xs: "translate(30px,-8px) scale(.9)",
          md: "translate(35px,-18px) scale(1)",
        },
      },
    ],

    3: [
      {
        zIndex: 1,
        transform: {
          xs: "translate(-65px,10px) rotate(-6deg) scale(.68)",
          md: "translate(-120px,18px) rotate(-7deg) scale(.84)",
        },
        opacity: .45,
      },
      {
        zIndex: 3,
        transform: {
          xs: "translate(0,-10px) scale(.92)",
          md: "translate(0,-22px) scale(1)",
        },
      },
      {
        zIndex: 2,
        transform: {
          xs: "translate(65px,8px) rotate(6deg) scale(.68)",
          md: "translate(120px,18px) rotate(7deg) scale(.84)",
        },
        opacity: .45,
      },
    ],
  };

  const layout = transforms[count] || transforms[1];

  return (
    <Box
      sx={{
        position: "relative",

        width: {
          xs: 320,
          md: 620,
        },

        height: {
          xs: 430,
          md: 640,
        },

        mx: "auto",
      }}
    >
      {items.map((child, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            inset: 0,

            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            zIndex: layout[index]?.zIndex,

            opacity: layout[index]?.opacity ?? 1,

            transform: layout[index]?.transform,

            transition: ".45s",
          }}
        >
          {child}
        </Box>
      ))}
    </Box>
  );
}