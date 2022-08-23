import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SupportedLanguages from '../models/enums/SupportedLanguages';
import ErrorService from '../services/ErrorService';
import UserService from '../services/UserService';
import { useAppDispatch, useAppSelector } from '../store/Hooks';
import AlertUtils from '../utils/AlertUtils';
import TranslatorUtils from '../utils/TranslatorUtil';
import './Layout.css';
import Sidebar from './Sidebar';
import translator from '../theme/translator.json';
import Permissions from '../models/enums/Permissions';
import User from '../models/User';

const Layout: React.FC = () => {
  const firebaseUser = useAppSelector((state) => state.user.firebaseUser);
  const user = useAppSelector((state) => state.user.user) as User | any;
  const language = useAppSelector((state) => state.user.language) as SupportedLanguages | any;

  const dispatch = useAppDispatch();
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    try {
      if (!firebaseUser) setLoggedIn(false);
      else setLoggedIn(true);
    } catch (e: any) {
      ErrorService.handleError(e, language, dispatch);
    }
  }, [firebaseUser]);

  useEffect(() => {
    try {
      if (process.env.REACT_APP_REQUIRE_ADMIN
        && !location.pathname.startsWith('/login')
        && !location.pathname.startsWith('/signup')
      ) {
        if (user.permission !== Permissions.SUPER_ADMIN) {
          UserService.logout();
          AlertUtils.createErrorAlert(TranslatorUtils.getTranslation(language, translator.errorMessages.general.superAdminRequired), dispatch);
        }
      }
    } catch (e: any) {
      ErrorService.handleError(e, language, dispatch);
    }
  }, [location.pathname]);

  const toggleLanguage = async () => {
    try {
      if (language === SupportedLanguages.EN) user.language = SupportedLanguages.FR;
      else user.language = SupportedLanguages.EN;
      UserService.update(user);
    } catch (e: any) {
      ErrorService.handleError(e, language, dispatch);
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
