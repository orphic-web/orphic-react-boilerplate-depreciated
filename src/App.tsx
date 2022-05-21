import './App.css';
import logo from './theme/assets/logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <img src={logo} className="App__logo" alt="logo" />
        <h1>
         React boilerplate
        </h1>
        <a
          className="App__link"
          href="https://github.com/orphic-web"
          target="_blank"
          rel="noopener noreferrer"
        >
          More open souce projects
        </a>
      </header>
    </div>
  );
}

export default App;
