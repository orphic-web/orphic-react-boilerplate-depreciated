import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';
import { useAppSelector } from '../store/Hooks';
import './Layout.css';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const firebaseUser = useAppSelector((state) => state.user.firebaseUser);
  const [show, setShow] = useState(true);

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
      setShow(true);
    } catch (e: any) {
      console.log(e);
    }
  }, [firebaseUser]);

  return (
    <>
      {
        show
        && <nav>
          <Button onClick={() => navigate('/login')} variant="contained">Login</Button>
          <Button onClick={() => navigate('/signup')} variant="contained">Signup</Button>
          <Button color='light' onClick={() => logout()} variant="contained">Logout</Button>
        </nav>
      }
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
