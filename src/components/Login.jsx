

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import http from '../utils/http';
import useForm from '../hooks/useForm';

import './Login.scss';
import bigLogo from './images/bigLogo.svg';

import environment from '../utils/environment';
import { withAlert } from "react-alert";




function Login(props) {


  const { auth, history } = props;


  const onSubmit = async (inputs) => {
    
 
    if (!inputs.email || inputs.email.length === 0 || !inputs.password || inputs.password.length === 0) {
      props.alert.error("Please enter your email and password.");
      return console.error('missing message');
    }

    const userData = { 
      email: inputs.email,
      password: inputs.password 
    };
    
    try {
      await http.post(`${environment.resolveApi().rest}/user/login`, userData);
      props.history.push("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
      props.alert.error("Email or Password does not exist!");
    }
  };


  const { inputs, handleInputChange, handleSubmit } = useForm(onSubmit);
  
  
  
  useEffect(() => {
    
    if (auth.isAuthenticated) {
      history.push('/');
    }
  }, [auth, history]);



  return (
    <div className="Login">
        <img src={bigLogo} />
        <h1>Calculate live currency fast & easy </h1>

        <form onSubmit={handleSubmit}  className="outer-form">
            <span className="form-subheading">Please enter your email & password.</span>
            <input value={inputs.email}  onChange={handleInputChange} name="email" type="email" placeholder="Email" className="form-input"></input>
            <input value={inputs.password}  onChange={handleInputChange} name="password" type="password"   placeholder="Password" className="form-input"></input>
            
            <button type="submit" className="form-btn">Login</button>
            <a href="/signup" className="form-link">Don’t have an account? Click here.</a>
        </form>
    </div>
  );
}


Login.propTypes = {
 
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps)(withAlert()(Login));

