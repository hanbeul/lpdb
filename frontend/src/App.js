import './App.css';
import Title from './components/Title'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './views/Home'
import Page2 from './views/Page2'
import Page3 from './views/Page3'
import Settings from './views/Settings'
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
<<<<<<< HEAD
    <div>
      <Router>
        <Title />      
        <Nav />
          <Switch>
            <Route path="/" exact component={Home} /> 
            <Route path="/page2" component={Page2} /> 
            <Route path="/page3" component={Page3} /> 
            <Route path="/settings" component={Settings} /> 
          </Switch>
        <Footer />
      </Router>
=======
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          BIG POOP
        </a>
      </header>
>>>>>>> develop
    </div>
  );
}

export default App;
