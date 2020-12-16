
import React, { useState, useEffect, useCallback, useRef } from 'react';
import http from '../utils/http';
import './Currency.scss';

import tinyLogo from './images/tinyLogo.svg';
import exchangeArrows from './images/xchangearrow.svg';
import logoutIcon from './images/logoutIcon.svg'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../actions/profileActions';
import { logoutUser } from '../actions/authActions';

import CurrencyFlag from 'react-currency-flags';
import useForm from '../hooks/useForm';
import CURRENCY_CODES from './CurrencyCodes.json';




function Currency(props) {

  const { profile: profileState } = props;

  const { profile, loading } = profileState;

  useEffect(() => {
    
    if (profile) {
      console.log(profile)
    }
  }, [profile]);


  const logout = () => {
    props.logoutUser();
  };


  const getExchangeRate = async () => {
    // https://api.currencylayer.com/change?currencies=USD,EUR

    try {
      const response = await http.get(`https://api.currencylayer.com/change?currencies=USD,EUR?access_key=YOUR_ACCESS_KEY`);
      console.log(response);
    } catch (error) {
      console.log(error);
      // props.alert.error("Email or Password does not exist!");
    }
  }



  const onSubmit = async (inputs) => {
  }
  
  
  const [selectValue, setSelectValue] = useState("CAD");
  const [selectExchangeValue, setselectExchangeValue] = useState("USD");
  const [originName, setOriginName] = useState("Canadian Dollar");
  const [exchangeName, setExchangeName] = useState("United States Dollar");
  

  const handleSelectOnChange = (event) => {
    event.persist();
    setSelectValue(event.target.value);


    setOriginName(CURRENCY_CODES[event.target.options.selectedIndex].Name)
  
  };


  const handleSelectOnExchange = (event) => {
    event.persist();
    setselectExchangeValue(event.target.value);

    setExchangeName(CURRENCY_CODES[event.target.options.selectedIndex].Name)

  }
 


if (loading) return <div className="loading"><h1>Loading...</h1></div>;
  if (!profile) {
  return (
    <div className="Currency">
        <div className="navbar">
            <img src={tinyLogo} />
           
            <button className="logout-btn" onClick={logout}>
              <img src={logoutIcon} />
            </button>
        </div>


    <div className="currency-outer-form">


      <form >


          <div className="currency-form">

          
         
        <div className="currency-inner-form currency-amt-form">
            <div className="currency-form-input-wrapper">
              <span className="currency-form-subheading">You Have</span>
              <input type="text" value="0.00" className="currency-input currency-amt-input"></input>
            </div>

            <div className="currency-form-input-wrapper currency-type-wrapper">
            <small className="currency-form-smallheading">{originName}</small>
              <select value={selectValue} className="currency-input currency-type-input" onChange={handleSelectOnChange}>
                {CURRENCY_CODES.map((currency, index) => (
                    <option key={index} value={currency.Code}>
                      {currency.Code}
                    </option>  
                )
                )
                }
              </select>
              <CurrencyFlag currency={selectValue} width={38} />
            </div>
        </div>

            {/* <img className="exchangeArrowsIcon" src={exchangeArrows} /> */}
        
        <div className="currency-inner-form currency-result-form">
            <div className="currency-form-input-wrapper">
              <span className="currency-form-subheading">You Get</span>
              <input type="text" value="0.00" className="currency-input currency-amt-input"></input>
            </div>

            <div className="currency-form-input-wrapper currency-type-wrapper">
              <small className="currency-form-smallheading">{exchangeName}</small>
              <select value={selectExchangeValue} className="currency-input currency-type-input" onChange={handleSelectOnExchange}>
                {CURRENCY_CODES.map((currency, index) => (
                    <option key={index} value={currency.Code}>
                      {currency.Code}
                    </option>  
                )
                )
                }
              </select>
              <CurrencyFlag currency={selectExchangeValue} width={38} />
            </div>
        </div>


        </div>

            
            <button type="submit" className="get-rate-btn">Get Rate</button>


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
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile, logoutUser })(Currency);


