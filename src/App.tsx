import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import createTheme from '@mui/material/styles/createTheme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Layout from './components/Layout';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
import themeConfig from './theme/ThemeConfig';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import NotFound from './pages/NotFound';

function App() {
  const theme = createTheme(themeConfig);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />} >
              <Route index element={<Dashboard />}/>
              <Route path='login' element={<Login />}/>
              <Route path='signup' element={<Signup />}/>
              <Route path='forgot-password' element={<ForgotPassword />}/>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>

  );
}

export default App;
