/* eslint-disable @typescript-eslint/no-empty-function */
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import * as Sentry from '@sentry/react';
import {
  User as FirebaseUser,
} from 'firebase/auth';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { db, auth } from './FirebaseConfig';

import Login from '@/pages/auth/Login';
import Dashboard from '@/pages/dashboard/Dashboard';
import Signup from '@/pages/auth/Signup';
import NotFound from '@/pages/notFound/NotFound';
import Settings from '@/pages/settings/Settings';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import PrivateRoutes from '@/routing/PrivateRoutes';

import { useAppDispatch } from '@/store/Hooks';
import { updateUser } from './store/slices/UserSlice';
import User from '@/models/User';
import themeConfig from './theme/ThemeConfig';
import Spinner from '@/common/spinner/Spinner';

if (import.meta.env.NODE_ENV === 'production') {
  // Disable react dev tools
  disableReactDevTools();

  // Initiate sentry session in the production environment
  if (import.meta.env.VITE_APP_SENTRY_DNS) {
    Sentry.init({
      dsn: import.meta.env.VITE_APP_SENTRY_DNS,
      integrations: [
        new Sentry.Integrations.Breadcrumbs({
          console: false,
        }),
      ],
      tracesSampler: () => (import.meta.env.NODE_ENV === 'production' ? 0.2 : 1),
      debug: false,
    });
  }

}

function App() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      let unsubscribe = () => { };
      auth.onAuthStateChanged((response) => {
        const firebaseUser = response as FirebaseUser;
        if (firebaseUser) {
          unsubscribe = onSnapshot(doc(db, 'Users', firebaseUser.uid), (result) => {
            const userDoc = result.data() as User;
            dispatch(updateUser(userDoc));

            if (import.meta.env.NODE_ENV === 'production') {
              // Sets the user for sentry issue filters
              Sentry.setUser({
                id: userDoc?.id, username: userDoc?.name, email: userDoc?.email
              });
            }
          });
        } else {
          dispatch(updateUser(null));
          Sentry.setUser(null);
        }
        setLoading(false);
      });
      return unsubscribe;
    } catch (e: any) {
      setLoading(false);
    }
  }, []);

  return (
    <ThemeProvider theme={themeConfig}>
      <CssBaseline />
      <div className="app">
        {
          !loading
          && <BrowserRouter>
            <Routes>
              <Route element={<PrivateRoutes />} >
                <Route path="/" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
              <Route path='/signup' element={<Signup />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/login' element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        }
        <Spinner show={loading}></Spinner>
      </div>
    </ThemeProvider>
  );
}

export default App;