
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import http from '../utils/http';
import useForm from '../hooks/useForm';
import { registerUser } from '../actions/authActions';
import './Signup.scss';
import bigLogo from './images/bigLogo.svg';
import environment from '../utils/environment';
import { withAlert } from "react-alert";


// TODO: errors
const initialState = {
  email: '',
  password1: '',
  confirmPassword: '',
};


function Signup(props) {
  
  
  const { auth, history } = props;
  
  const onSubmit = async (inputs) => {
    
    if ( !(inputs.password === inputs.confirmPassword) ) {
      props.alert.error("Password Don't Match!");
      return;
    }
    
    const signUpData = { 
      email: inputs.email,
      password: inputs.password 
    };
    
    try {
      await http.post(`${environment.resolveApi().rest}/user/register/`, signUpData);
      props.alert.success(`Account Created! Please login.`);
      props.history.push("/login");
    } catch (error) {
      console.log(error);
      if(error.emailExists) {
        props.alert.error(error.emailExists);
      }
      if(error.email) {
        props.alert.error(error.email);
      }
      if(error.password) {
        props.alert.error(error.password);
      }
      if(error.passwordNumber) {
        props.alert.error(error.passwordNumber);
      }
    }
  };
  
  const { inputs, handleInputChange, handleSubmit } = useForm(onSubmit, initialState);
  
  
  
  useEffect(() => {
    
    if (auth.isAuthenticated) {
      history.push('/');
    }
  }, [auth, history]);
  
  
  return (
    <div className="Signup">
    <img src={bigLogo} />
    <h1>Signup</h1>
    
    <form onSubmit={handleSubmit} className="outer-form">
    <span className="form-subheading">Please enter your email & password.</span>
    <input value={inputs.email}  onChange={handleInputChange} name="email" type="email" placeholder="Email" className="form-input"></input>
    <input value={inputs.password}  onChange={handleInputChange} name="password" type="password"   placeholder="Password" className="form-input"></input>
    <input value={inputs.confirmPassword}  onChange={handleInputChange} name="confirmPassword" type="password"   placeholder="Confirm Password" className="form-input"></input>
    
    <button type="submit" className="form-btn">Signup</button>
    <a href="/login" className="form-link">Already have an account? Click here.</a>
    </form>
    </div>
    );
  }
  
  
  Signup.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = state => ({ auth: state.auth, errors: state.errors });
  
  export default withAlert()(connect(mapStateToProps, { registerUser })(withRouter(Signup)));
