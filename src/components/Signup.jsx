
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
  password2: '',
};


function Signup(props) {


  const { auth, history } = props;

  const onSubmit = async (inputs) => {
    if (inputs.firstName.length === 0 || inputs.lastName.length === 0 ) {
      props.alert.error("Name field is empty!");
      return;
    }

    if ( !(inputs.password1 === inputs.password2) ) {
      props.alert.error("Password Don't Match!");
      return;
    }

    const signUpData = { 
      firstName: inputs.firstName,
      lastName: inputs.lastName, 
      email: inputs.email,
      password: inputs.password1 
    };
    
    try {
      await http.post(`${environment.resolveApi().rest}/user/register/`, signUpData);
      props.alert.success(`Account Created! Please login to complete social profile!`);
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

        <form className="outer-form">
            <span className="form-subheading">Please enter your email & password.</span>
            <input type="email" placeholder="Email" className="form-input" ></input>
            <input type="password" placeholder="Password" className="form-input"></input>
            <input type="password" placeholder="Confirm Password" className="form-input"></input>
            
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
