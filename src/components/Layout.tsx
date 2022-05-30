import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AvailableLanguages from '../models/enums/AvailableLanguages';
import { useAppDispatch, useAppSelector } from '../store/Hooks';
import { updateLanguage } from '../store/slices/UserSlice';
import './Layout.css';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  const firebaseUser = useAppSelector((state) => state.user.firebaseUser);
  const language = useAppSelector((state) => state.user.language);
  const dispatch = useAppDispatch();

  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    try {
      if (!firebaseUser) setLoggedIn(false);
      else setLoggedIn(true);
    } catch (e: any) {
      console.log(e);
    }
  }, [firebaseUser]);

  const toggleLanguage = () => {
    try {
      if (language === AvailableLanguages.EN) dispatch(updateLanguage(AvailableLanguages.FR));
      else dispatch(updateLanguage(AvailableLanguages.EN));
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
