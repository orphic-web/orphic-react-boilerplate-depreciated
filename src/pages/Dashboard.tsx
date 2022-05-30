import './Dashboard.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../store/Hooks';
import AlertUtil from '../utils/AlertUtil';
import AlertSeverity from '../models/enums/AlertSeverity';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const firebaseUser = useAppSelector((state) => state.user.firebaseUser);
  const dispatch = useDispatch();

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
      console.log(e);
      AlertUtil.createAlert(AlertSeverity.ERROR, 'An error occured, try again later.', dispatch);
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
