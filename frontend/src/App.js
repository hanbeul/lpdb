import './App.css';
import Title from './components/Title'
import Nav from './components/Nav'
import RecentScans from './views/RecentScans'
import Dashboard from './views/Dashboard'
import Page2 from './views/Page2'
import Page3 from './views/Page3'
import Settings from './views/Settings'
import Footer from './components/Footer'
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <div>
      <Router>
        <Title />      
        <Nav />
          <Switch>
            <Route path="/" exact component={RecentScans} />
            <Route path="/Dashboard" exact component={Dashboard} /> 
            <Route path="/page2" component={Page2} /> 
            <Route path="/page3" component={Page3} /> 
            <Route path="/settings" component={Settings} /> 
          </Switch>
        {/* <Footer /> */}
      </Router>

    </div>
  );
}

export default App;
