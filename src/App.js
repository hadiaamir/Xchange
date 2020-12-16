import React, { useState, useEffect, useCallback } from 'react';
import { checkLogin } from './actions/authActions';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';


import Main from './components/Main.jsx';

import PrivateRoute from './components/PrivateRoute.jsx'

import store from './utils/store';


import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// optional cofiguration
const options = {
  position: positions.TOP_RIGHT,
  timeout: 4000,
  offset: "50px",
  transition: 'fade',
  containerStyle: {
      zIndex: 9999
  }
};


function App() {
  const [isChecking, setChecking] = useState(true);

  // check if the server is up
  useEffect(() => {
    (async function () {
      try {
        
        await store.dispatch(checkLogin());
      } catch (err) {
        console.log(err.message)
      }

      setChecking(false);
    })
    ()
  }, []);


  if (isChecking) return <div></div>;

  return (
    <div className="App">
      <AlertProvider template={AlertTemplate} {...options}>
      <Provider store={store}>
      <Router>
      <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            

            <PrivateRoute path="/" component={Main} />
            </Switch>
        </Router>
      </Provider>   
      </AlertProvider> 
    </div>
  );
}

export default App;
