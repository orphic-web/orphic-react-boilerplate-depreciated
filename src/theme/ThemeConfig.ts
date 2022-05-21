import createTheme from '@mui/material/styles/createTheme';

const themeConfig = createTheme({
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
  },
});

export default themeConfig;
