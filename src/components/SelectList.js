import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './SelectList.css';
import Select from 'react-select';

class SelectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      name: '',
      value: '',
      error: [],
      info: '',
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

 
  multiSelect() {
    
    return (
      <div>
        <span className="lw-portal-select-list-title">{this.props.title}</span>
        <Select 
        isMulti
        name={this.props.name}
        options={this.props.options} 
        value={this.props.value}
        onChange={this.props.onChange}
        className={`basic-multi-select ` + this.props.className}
        classNamePrefix="select"
      />
    </div>
    );
  }


  lawPortalSelectList() {
    const { error, info } = this.props;

    const selectOptions = this.props.options.map(option => (
      <option className="select-list-options" key={option.label} value={option.value}>
        {option.label}
      </option>
    ));

    return (
      <div className="lw-portal-select-list-container">
        <span className="lw-portal-select-list-title">{this.props.title}</span>
        <select
          className={classnames(this.props.className, { 'is-invalid': error })}
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
        >
          {selectOptions}
        </select>
        {info && <small className="select-list-input-small">{info}</small>}
        {/* {error && <div className="text-field-input-small-error">{error}</div>} */}
      </div>
    );
  }

  disableSelect() {
    const { error, info } = this.props;

    const selectOptions = this.props.options.map(option => (
      <option className="select-list-options" key={option.label} value={option.value}>
        {option.label}
      </option>
    ));

    return (
      <div className="lw-portal-select-list-container">
        <span className="lw-portal-select-list-title">{this.props.title}</span>
        <select
          className={this.props.className + ' disabled'}
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
          disabled
        >
          {selectOptions}
        </select>
        {info && <small className="select-list-input-small">{info}</small>}
        {/* {error && <div className="text-field-input-small-error">{error}</div>} */}
      </div>
    );
   
  }


  render() {
    if (this.props.lawPortal) {
      return this.lawPortalSelectList();
    } 
    if (this.props.multiSelect){
      return this.multiSelect();
    }

    if (this.props.disableSelect){
      return this.disableSelect();
    }

    const { error, info } = this.props;

    const selectOptions = this.props.options.map(option => (
      <option key={option.label} value={option.value}>
        {option.label}
      </option>
    ));


    return (
      <div className="lw-portal-select-list-container">
        <select
          className={classnames('default-select-list-input', {
            'text-field-input-error': error,
          })}
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
        >
          {selectOptions}
        </select>
        {info && <small className="select-list-input-small">{info}</small>}
        {error && <div className="text-field-input-small-error">{error}</div>}
      </div>
    );
  }
}

SelectList.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default SelectList;
