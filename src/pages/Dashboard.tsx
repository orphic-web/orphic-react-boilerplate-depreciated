import './Dashboard.css';
import logo from '../theme/assets/logo.svg';

const Dashboard: React.FC = () => (
  <div className="dashboard">
    <img src={logo} className="dashboard__logo" alt="logo" />
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

export default Dashboard;
