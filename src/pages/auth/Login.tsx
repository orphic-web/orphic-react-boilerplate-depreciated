import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="login">
      <header className="login__header">
        <h1>Login</h1>
        <Button onClick={() => navigate('/')} variant="contained">Dashboard</Button>
      </header>
    </div>
  );
};

export default Login;
