import { responsiveFontSizes } from '@mui/material';
import createTheme from '@mui/material/styles/createTheme';

// eslint-disable-next-line import/no-mutable-exports
let themeConfig = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFBD00',
      light: 'rgb(255, 202, 51)',
      dark: 'rgb(178, 132, 0)',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    secondary: {
      main: '#390099',
      light: 'rgb(96, 51, 173)',
      dark: 'rgb(39, 0, 107)',
      contrastText: '#fff',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    error: {
      main: '#e70e02',
      light: 'rgb(235, 62, 52)',
      dark: 'rgb(161, 9, 1)',
      contrastText: '#071209',
    },
    warning: {
      main: '#FFBD00',
      light: 'rgb(255, 202, 51)',
      dark: 'rgb(178, 132, 0)',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    success: {
      main: '#afffba',
      light: 'rgb(191, 255, 199)',
      dark: 'rgb(122, 178, 130)',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    info: {
      main: '#FF0054',
      light: 'rgb(255, 51, 118)',
      dark: 'rgb(178, 0, 58)',
      contrastText: '#fff',
    },
    background: {
      default: '#424242',
      paper: '#202020',
    },
  },
  shape: {
    borderRadius: 3,
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Poppins',
      'Arial',
      '"Segoe UI"',
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

export default themeConfig;
