import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    brand: {
      50: "#f0efff",
      100: "#d3d0ff",
      200: "#b6b1ff",
      300: "#9892ff",
      400: "#7b73ff",
      500: "#6c63ff",
      600: "#564fcc",
      700: "#413b99",
      800: "#2b2866",
      900: "#161433",
    },
  },
  components: {
    Popover: {
      baseStyle: {
        popper: {
          width: "fit-content",
          maxWidth: "fit-content",
        },
      },
    },
  },
});
