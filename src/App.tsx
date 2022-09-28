/* eslint-disable @typescript-eslint/no-empty-function */
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import {
  User as FirebaseUser,
} from 'firebase/auth';
import { db, auth } from './FirebaseConfig';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
import themeConfig from './theme/ThemeConfig';
import Signup from './pages/auth/Signup';
import NotFound from './pages/NotFound';
import { useAppDispatch } from './store/Hooks';
import { updateLanguage, updateUser } from './store/slices/UserSlice';
import AlertsContainer from './components/AlertsContainer';
import User from './models/User';
import Spinner from './components/Spinner';
import PrivateRoutes from './routing/PrivateRoutes';
import ForgotPassword from './pages/auth/ForgotPassword';
import SupportedLanguages from './models/enums/SupportedLanguages';
import AdminRoutes from './routing/AdminRoutes';
import Logs from './pages/admin/Logs';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import ErrorService from './services/ErrorService';

// replace console.* for disable log on production
if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};

  Sentry.init({
    dsn: 'https://0a01f04480ec42ca98fe66faaedf1606@o1428207.ingest.sentry.io/6778257',
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

function App() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      let unsubscribe = () => {};
      auth.onAuthStateChanged((response) => {
        const firebaseUser = response as FirebaseUser;
        if (firebaseUser) {
          unsubscribe = onSnapshot(doc(db, 'Users', firebaseUser.uid), (result) => {
            const userDoc = result.data() as User;
            dispatch(updateUser(userDoc));
            dispatch(updateLanguage(userDoc?.language));
          });
        } else {
          dispatch(updateUser(null));
          dispatch(updateLanguage(SupportedLanguages.DEFAULT));
        }
        setLoading(false);
      });
      return unsubscribe;
    } catch (e: any) {
      ErrorService.handleError(e, dispatch);
      setLoading(false);
    }
  }, []);

  return (
    <ThemeProvider theme={themeConfig}>
      <CssBaseline/>
      <div className="app">
        {
          !loading
          && <BrowserRouter>
            <Routes>
              <Route element={<PrivateRoutes />} >
                <Route path="/" element={<Dashboard />}/>
                <Route path="/settings" element={<Settings />}/>
                <Route path="/notifications" element={<Notifications />}/>
                <Route element={<AdminRoutes />}>
                  <Route path="/logs" element={<Logs />}/>
                </Route>
                {
                  // Allow us to hide the signup and forgot-password pages in dev env
                  process.env.NODE_ENV === 'development' && !process.env.REACT_APP_LOCALHOST_STATE
                  && <>
                    <Route path='/signup' element={<Signup />}/>
                    <Route path='/forgot-password' element={<ForgotPassword />}/>
                  </>
                }
              </Route>à
              {
                // Allow us to show signup and forgot-password in prod and localhost env
                (process.env.NODE_ENV === 'production' || process.env.REACT_APP_LOCALHOST_STATE)
                && <>
                  <Route path='/signup' element={<Signup />}/>
                  <Route path='/forgot-password' element={<ForgotPassword />}/>
                </>
              }
              <Route path='/login' element={<Login />}/>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        }
        <AlertsContainer/>
        <Spinner show={loading}></Spinner>
      </div>
    </ThemeProvider>
  );
}

export default App;
