import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Currency from './components/Currency.jsx';

function App() {
  return (
    <div className="App">

      <Router>

        
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/currency" component={Currency} />

        {/* <PrivateRoute path="/" component={Currency} /> */}



      </Router>
      
    </div>
  );
}

export default App;
