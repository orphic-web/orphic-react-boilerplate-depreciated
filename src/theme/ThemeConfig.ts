import { responsiveFontSizes } from '@mui/material';
import createTheme from '@mui/material/styles/createTheme';

// eslint-disable-next-line import/no-mutable-exports
let themeConfig = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff8a50',
      light: 'rgb(255, 161, 115)',
      dark: 'rgb(178, 96, 56)',
      contrastText: 'rgba(255,255,255,0.87)',
    },
    secondary: {
      main: '#312F31',
      light: 'rgb(90, 88, 90)',
      dark: 'rgb(34, 32, 34)',
      contrastText: '#fff',
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    error: {
      main: '#d32f2f',
      light: 'rgb(219, 88, 88)',
      dark: 'rgb(147, 32, 32)',
      contrastText: '#fff',
    },
    warning: {
      main: '#f9cf75',
      light: 'rgb(250, 216, 144)',
      dark: 'rgb(174, 144, 81)',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    success: {
      main: '#afffba',
      light: 'rgb(191, 255, 199)',
      dark: 'rgb(122, 178, 130)',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    info: {
      main: '#ffffff',
      light: 'rgb(255, 255, 255)',
      dark: 'rgb(178, 178, 178)',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    background: {
      default: '#312F31',
      paper: '#424242',
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
