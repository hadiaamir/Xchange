import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../actions/profileActions';
import Currency from './Currency.jsx';
import PrivateRoute from './PrivateRoute.jsx';

const Main = (props) => {
  // runs once on mount
  useEffect(() => {
    props.getCurrentProfile();
  }, [props]);

  return (
    <div className="Main">
      <Switch>
        <PrivateRoute exact path="/" component={Currency} />
      </Switch>
    </div>
  );
};

Main.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
};

export default connect(null, { getCurrentProfile })(Main);
