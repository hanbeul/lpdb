import logo from './logo.svg';
import './App.css';
import Title from './components/Title'
import Nav from './components/Nav'
import RecentScans from './views/RecentScans'
import Dashboard from './views/Dashboard'
import Page2 from './views/Page2'
import Page3 from './views/Page3'
import Visits from './views/Visits'
import Footer from './components/Footer'
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { io } from "socket.io-client";

const socket = io("http://localhost:9000", {
  transports: ['websocket'],
  upgrade: false,
});

socket.on("connect", () => {
  console.log("Connected!");
  socket.emit("hello", "world");
});

socket.on("hello", msg => {
  console.log(msg);
});

socket.on("reload", msg => {
  window.location.reload();
});

socket.on("disconnect", () => {
  console.log("Disconnected!");
})

function App() {
  return (
    <div className="mainDiv">
      <Router>
        <Title />      
        <Nav />
          <Switch>
            <Route path="/" exact component={RecentScans} />
            <Route path="/Dashboard" exact component={Dashboard} /> 
            <Route path="/page2" component={Page2} /> 
            <Route path="/page3" component={Page3} /> 
            <Route path="/visits" component={Visits} /> 
          </Switch>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
