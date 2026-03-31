import { createTheme } from "@mui/material/styles";

declare module '@mui/material/styles' {
    interface Palette {
        ochre: Palette['primary'];
    }

    interface PaletteOptions {
        ochre?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        ochre: true;
    }
}

export const theme = createTheme({
    typography: {
        fontFamily: "Poppins, sans-serif",
    },
    palette: {
        primary: {
            main: "#EFFDFF",
            light: "#0C7D8F",
            dark: "#1F3A58",
        },
    },
})