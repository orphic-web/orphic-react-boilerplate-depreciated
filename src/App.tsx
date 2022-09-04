/* eslint-disable @typescript-eslint/no-empty-function */
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';

import './App.css';
import createTheme from '@mui/material/styles/createTheme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db, auth } from './FirebaseConfig';
import Layout from './components/Layout';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
import themeConfig from './theme/ThemeConfig';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import NotFound from './pages/NotFound';
import { useAppDispatch } from './store/Hooks';
import { updateFirebaseUser, updateLanguage, updateUser } from './store/slices/UserSlice';
import AlertsManager from './components/AlertsManager';
import SupportedLanguages from './models/enums/SupportedLanguages';
import User from './models/User';
import Hero from './pages/Hero';
import GameSettings from './pages/GameSettings';
import GamePlay from './pages/GamePlay';

// replace console.* for disable log on production
if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

function App() {
  const theme = createTheme(themeConfig);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      let unsubscribe = () => { };

      auth.onAuthStateChanged(async (firebaseUser: any) => {
        if (firebaseUser) {
          unsubscribe = onSnapshot(doc(db, 'Users', firebaseUser.uid), (response) => {
            const userDoc = response.data() as User;
            dispatch(updateUser(userDoc));
            dispatch(updateFirebaseUser(firebaseUser));
            dispatch(updateLanguage(userDoc.language));
          });
        } else {
          dispatch(updateFirebaseUser(null));
          dispatch(updateUser(null));
          dispatch(updateLanguage(SupportedLanguages.EN));
        }
      });
      return unsubscribe;
    } catch (e: any) {
      console.error(e);
      return e;
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />} >
              <Route index element={<Dashboard />}/>
              <Route path='login' element={<Login />}/>
              <Route path='hero' element={<Hero />}/>
              <Route path='game/:id/settings' element={<GameSettings/>}/>
              <Route path='game/:id/play' element={<GamePlay />}/>
              <Route path='signup' element={<Signup />}/>
              <Route path='forgot-password' element={<ForgotPassword />}/>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <AlertsManager/>
      </div>
    </ThemeProvider>
  );
}

export default App;
