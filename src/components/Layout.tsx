import Button from '@mui/material/Button';
import { Outlet, useNavigate } from 'react-router-dom';
import './Layout.css';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <nav>
        <Button onClick={() => navigate('/login')} variant="contained">Login</Button>
        <Button onClick={() => navigate('/signup')} variant="contained">Signup</Button>
        <Button color='light' onClick={() => console.log('Suppose to logout')} variant="contained">Logout</Button>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
