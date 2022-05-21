import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="login">
      <header className="login__header">
        <h1>ForgotPassword</h1>
        <Button onClick={() => navigate('/')} variant="contained">Dashboard</Button>
      </header>
    </div>
  );
};

export default ForgotPassword;
