
import React, { useState, useEffect, useCallback, useRef } from 'react';
import http from '../utils/http';
import './Currency.scss';

import axios from 'axios';

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
import environment from '../utils/environment'

import config from '../config.json';



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


  const [exchange, setExchangeInfo] = useState("");


  const [exchangeLoading, setExchangeLoading] = useState(false);

  

  const onSubmit = async (inputs) => {
    try {
      setExchangeLoading(true);

      console.log(inputs)
      const exchangeInfo = { 
        amount: inputs.amount,
        origin: selectValue,
        exchanger: selectExchangeValue
      };
      
      const response = await http.post(`${environment.resolveApi().rest}/exchange/rate/`, exchangeInfo);

      setExchangeInfo(response.data);
      
      // setExchangeRateInfo(exchangeRateResponse)

      // console.log(exchangeRateResponse);

      // let groupedCurrencyCode = 'USD' + selectValue;
      // const convertedVal = getConvertedValue(inputs.amount, exchangeRateResponse.quotes[groupedCurrencyCode])
      // console.log(convertedVal)

    } catch (error) {
      console.log(error);
    }

    setExchangeLoading(false);
  }



  const { inputs, handleInputChange, handleSubmit } = useForm(onSubmit);
  

  const [exchangeBtnClass, setExchangeBtnClass] = useState("disabled");
  const [selectValue, setSelectValue] = useState("CAD");
  const [selectExchangeValue, setSelectExchangeValue] = useState("USD");
  const [originName, setOriginName] = useState("Canadian Dollar");
  const [exchangeName, setExchangeName] = useState("United States Dollar");
  

  const handleSelectOnChange = (event) => {
    event.persist();
    setSelectValue(event.target.value);
    setOriginName(CURRENCY_CODES[event.target.options.selectedIndex].Name)
  
  };


  const handleSelectOnExchange = (event) => {
    event.persist();
    setSelectExchangeValue(event.target.value);

    setExchangeName(CURRENCY_CODES[event.target.options.selectedIndex].Name)
  }


  const getConvertedValue = (amount, rate) => {
      let conversion =  amount * rate;
      return conversion;
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


      <form onSubmit={handleSubmit}>


          <div className="currency-form">

          
         
        <div className="currency-amt-form">
        <div className="currency-result-inner-form"> 
            <div className="currency-form-input-wrapper">
              <span className="currency-form-subheading">You Have</span>
              <input type="text" name="amount" value={inputs.amount} onChange={handleInputChange} className="currency-input currency-amt-input"></input>
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
            { exchange && selectValue !== 'USD' ?
              <span className="currency-form-smallheading-rate"><strong>Rate:</strong> {exchange.originRate} <small className="api-companyname">by {exchange.lowestRateApi}</small></span>
              :
              ''
            }

        </div>

            {/* <img className="exchangeArrowsIcon" src={exchangeArrows} /> */}
        
        <div className="currency-result-form">
            <div className="currency-result-inner-form">
              <div className="currency-form-input-wrapper">
                <span className="currency-form-subheading">You Get</span>
                <input type="text" value={exchange.roundedConversion} className="currency-input currency-amt-input" disabled></input>
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
            { exchange ?
              <span className="currency-form-smallheading-rate"><strong>Rate:</strong> {exchange.lowestExchangeRate} <small className="api-companyname">by {exchange.lowestRateApi}</small></span>
              :
              ''
            }
            
        </div>
        


        </div>

       { inputs.amount && inputs.amount.length > 0 ?
        <button type="submit" className="get-rate-btn">{exchangeLoading ? 'Calculating...' : 'Convert'}</button>
       :
        <button type="button" className="is-not-active" disabled>Convert</button>
       } 

            
            
            


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


