import React from 'react';
import { connect } from 'react-redux';
import { BaseFeed } from './base.feed';
import { SET_CURRENCIES } from './../../store/constants';

class CurrencyFeed extends BaseFeed {
  constructor(props) {
    super(props);
    this.state.name = 'currency';
  }

  dispatch(newData) {
    const { data } = this.state;
    if(data.eur !== newData.eur || data.gbp !== newData.gbp) {
      this.props.dispatch({ type: SET_CURRENCIES, payload: newData });
    }
  }

  classes(data) {
    this.dispatch(data);

    return {
      gbp: this.valueClassName('gbp', data),
      eur: this.valueClassName('eur', data),
    };
  }

  renderContent() {
    const { classes, data, error } = this.state;

    if(error) {
      return (<div className='col-xs-12 text-error'>{ error }</div>)
    }
    else {
      return (
        <div>
          <div>
            <span>USD/EUR: { data.eur }</span>
            <span className={ classes.eur }></span>
          </div>

          <div>
            <span>USD/GBP: { data.gbp }</span>
            <span className={ classes.gbp }></span>
          </div>
        </div>
      )
    }
  }

  render() {
    const { url, type } = this.props;

    return (
      <div className='col-xs-12 col-sm-2 feed-component'>
        <div ref='content'>
          <a href={ url }>{ type }</a>

          { this.renderContent() }
        </div>
      </div>
    );
  }
}

const globalState = (state) => ({
  currencies: state.currencies
});
export default connect(globalState)(CurrencyFeed);
