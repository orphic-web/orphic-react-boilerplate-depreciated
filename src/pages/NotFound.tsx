import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found_container">
      <h1>Not Found</h1>
      <Button onClick={() => navigate('/')} variant="contained">Dashboard</Button>
    </div>
  );
};

export default NotFound;
