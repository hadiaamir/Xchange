
import React, { useState, useEffect, useCallback, useRef } from 'react';

import './Currency.scss';

import tinyLogo from './images/tinyLogo.svg';
import exchangeArrows from './images/xchangearrow.svg';
import logoutIcon from './images/logoutIcon.svg'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../actions/profileActions';



function Currency(props) {

  const { profile: profileState } = props;

  const { profile, loading } = profileState;

  useEffect(() => {
    
    if (profile) {
      console.log(profile)
    }
  }, [profile]);

if (loading) return <div>Loading...</div>;
  if (!profile) {
  return (
    <div className="Currency">
        <div className="navbar">
            <img src={tinyLogo} />
            <button className="logout-btn">
              <img src={logoutIcon} />
            </button>
        </div>


    <div className="currency-outer-form">


      <form className="currency-form">
          
         
        <div className="currency-inner-form currency-amt-form">
            <div className="currency-form-input-wrapper">
              <span className="currency-form-subheading">You Have</span>
              <input type="text" value="5000.00" className="currency-input currency-amt-input"></input>
            </div>

            <div className="currency-form-input-wrapper currency-type-wrapper">
              <small className="currency-form-smallheading">Canadian Dollar</small>
              <select value="CAD" className="currency-input currency-type-input">
                  <option value="CAD">CAD</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
              </select>
            </div>
        </div>

            <img className="exchangeArrowsIcon" src={exchangeArrows} />
        
        <div className="currency-inner-form currency-result-form">
            <div className="currency-form-input-wrapper">
              <span className="currency-form-subheading">You Get</span>
              <input type="text" value="6484.32" className="currency-input currency-amt-input"></input>
            </div>

            <div className="currency-form-input-wrapper currency-type-wrapper">
              <small className="currency-form-smallheading">United States Dollar</small>
              <select  value="USD" className="currency-input currency-type-input">
                  <option value="USD">USD</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
              </select>
            </div>
        </div>

        </form>
   


        {/* <div className="currency-extra-info-wrapper">
            <small className="rates-refresh-time">Rates will be refreshed in 30 seconds</small>
            <small className="rates-refresh-time">1CAD = 0.89USD</small>
        </div> */}
        

      </div>
       


    </div>
  );
  }
}

Currency.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Currency);
