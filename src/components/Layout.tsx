import Button from '@mui/material/Button';
import { Outlet, useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';
import './Layout.css';

const Layout: React.FC = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await UserService.logout();
      navigate('/login');
    } catch (e: any) {
      console.log(e);
    }
  };
  return (
    <div>
      <nav>
        <Button onClick={() => navigate('/login')} variant="contained">Login</Button>
        <Button onClick={() => navigate('/signup')} variant="contained">Signup</Button>
        <Button color='light' onClick={() => logout()} variant="contained">Logout</Button>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
