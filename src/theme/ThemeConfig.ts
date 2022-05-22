import { responsiveFontSizes } from '@mui/material';
import createTheme from '@mui/material/styles/createTheme';

// eslint-disable-next-line import/no-mutable-exports
let themeConfig = createTheme({
  palette: {
    primary: {
      light: '#ff8a50',
      main: '#ff5722',
      dark: '#e03904',
      contrastText: '#fdfdfd',
    },
    secondary: {
      light: '#5a585a',
      main: '#312f31',
      dark: '#212021',
      contrastText: '#fdfdfd',
    },
    light: {
      light: '#fff',
      main: '#fdfdfd',
      dark: '#d9d9d9',
      contrastText: '#212021',
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': { // - The Input-root, inside the TextField-root
            '& fieldset': { // - The <fieldset> inside the Input-root
              borderColor: 'rgba(255,255,255,0.71)', // - Set the Input border
            },
          },

        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: [
      'Poppins',
      'Arial',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

themeConfig = responsiveFontSizes(themeConfig);

declare module '@mui/material/styles' {

  interface Palette {
    light: Palette['primary'];
  }
  interface PaletteOptions {
    light: PaletteOptions['primary'];
  }

  interface PaletteColor {
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    darker?: string;
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    light: true;
  }
}

// // Update the Button's color prop options
// declare module '@mui/material/TextField' {
//   interface TextFieldPropsColorOverrides {
//     light: true;
//   }
// }

export default themeConfig;
