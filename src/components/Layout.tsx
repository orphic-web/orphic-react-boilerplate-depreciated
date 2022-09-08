import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SupportedLanguages from '../models/enums/SupportedLanguages';
import ErrorService from '../services/ErrorService';
import UserService from '../services/UserService';
import { useAppDispatch, useAppSelector } from '../store/Hooks';
import AlertUtils from '../utils/AlertUtils';
import TranslatorUtils from '../utils/TranslatorUtil';
import './Layout.css';
import translator from '../theme/translator.json';
import Permissions from '../models/enums/Permissions';
import User from '../models/User';

const Layout: React.FC = () => {
  const user = useAppSelector((state) => state.user.user) as User | any;
  const language = useAppSelector((state) => state.user.language) as SupportedLanguages | any;

  const dispatch = useAppDispatch();
  const location = useLocation();

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

  return (
    <Outlet />
  );
};

export default Layout;
