import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SupportedLanguages from '../models/enums/SupportedLanguages';
import ErrorService from '../services/ErrorService';
import UserService from '../services/UserService';
import { useAppDispatch, useAppSelector } from '../store/Hooks';
import { updateLanguage } from '../store/slices/UserSlice';
import './Layout.css';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  const firebaseUser = useAppSelector((state) => state.user.firebaseUser);
  const language = useAppSelector((state) => state.user.language);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    try {
      if (!firebaseUser) setLoggedIn(false);
      else setLoggedIn(true);
    } catch (e: any) {
      console.log(e);
    }
  }, [firebaseUser]);

  useEffect(() => {
    try {
      if (process.env.REACT_APP_REQUIRE_ADMIN
        && !location.pathname.startsWith('/login')
        && !location.pathname.startsWith('/signup')
      ) {
        UserService.checkIfSuperAdmin().then(async (isAdmin: any) => {
          if (!isAdmin) {
            await UserService.logout();
          }
        }).catch((e: any) => {
          ErrorService.handleError(e, language, dispatch);
        });
      }
    } catch (e: any) {
      ErrorService.handleError(e, language, dispatch);
    }
  }, [location.pathname]);

  const toggleLanguage = () => {
    try {
      if (language === SupportedLanguages.EN) dispatch(updateLanguage(SupportedLanguages.FR));
      else dispatch(updateLanguage(SupportedLanguages.EN));
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <>
      {
        loggedIn
          ? <Sidebar />
          : <nav className="layout__absolute-nav">
            <Button
              onClick={() => toggleLanguage()}
              variant="outlined"
              color='light'
            >
              {language}
            </Button>
          </nav>
      }
      <div className={`content ${loggedIn ? 'with-sidebar' : ''}`}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
