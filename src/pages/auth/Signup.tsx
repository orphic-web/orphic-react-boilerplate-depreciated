import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="login">
      <header className="login__header">
        <h1>Signup</h1>
        <Button onClick={() => navigate('/login')} variant="contained">Login</Button>
      </header>
    </div>
  );
};

export default Signup;
