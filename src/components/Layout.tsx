import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AvailableLanguages from '../models/enums/AvailableLanguages';
import UserService from '../services/UserService';
import { useAppDispatch, useAppSelector } from '../store/Hooks';
import { updateLanguage } from '../store/slices/UserSlice';
import CustomAlert from './CustomAlert';
import './Layout.css';

const Layout: React.FC = () => {
  const firebaseUser = useAppSelector((state) => state.user.firebaseUser);
  const language = useAppSelector((state) => state.user.language);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [show, setShow] = useState(true);
  const [globalMsg, setGlobalMsg] = useState('');
  const [openAlert, setOpenAlert] = useState(false);

  const logout = async () => {
    try {
      await UserService.logout();
      navigate('/login');
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      if (!firebaseUser) setShow(false);
      else setShow(true);
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
      setOpenAlert(true);
      setGlobalMsg('We could change language, try again later.');
    }
  };

  return (
    <>
      {
        show
          ? <nav>
            <Button onClick={() => navigate('/login')} variant="contained">Login</Button>
            <Button onClick={() => navigate('/signup')} variant="contained">Signup</Button>
            <Button color='light' onClick={() => logout()} variant="contained">Logout</Button>
          </nav>
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
      <div className="content">
        <Outlet />
        <CustomAlert open={openAlert} severity='error' message={globalMsg} setOpen={setOpenAlert}/>
      </div>
    </>
  );
};

export default Layout;
