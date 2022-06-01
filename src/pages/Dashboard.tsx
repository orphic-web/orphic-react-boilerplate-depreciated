import './Dashboard.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/Hooks';
import ErrorService from '../services/ErrorService';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const firebaseUser = useAppSelector((state) => state.user.firebaseUser);
  const language = useAppSelector((state) => state.user.language);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    try {
      const timer = setTimeout(() => {
        if (!firebaseUser) navigate('/login');
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    } catch (e: any) {
      ErrorService.handleHTTPError(e, language, dispatch);
    }
  }, [firebaseUser]);

  return (
    <div className="dashboard">
      <h1>React boilerplate</h1>
      <a
        className="dashboard__link"
        href="https://github.com/orphic-web"
        target="_blank"
      >
          More open souce projects
      </a>
    </div>
  );
};

export default Dashboard;
