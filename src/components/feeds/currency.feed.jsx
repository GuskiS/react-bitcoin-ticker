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

  response(res) {
    const data = super.response(res);
    const classes = {
      gbp: this.valueClassName('gbp', data),
      eur: this.valueClassName('eur', data),
    };

    this.dispatch(data);
    this.setState({ data, classes, fetched: true });
  }

  render() {
    const { url, type } = this.props;
    const { classes, data } = this.state;

    return (
      <div className='col-xs-12 col-sm-2 feed-component'>
        <div ref='content'>
          <a href={ url }>{ type }</a>

          <div>
            <span>USD/EUR: { data.gbp }</span>
            <span className={ classes.gbp }></span>
          </div>

          <div>
            <span>USD/GBP: { data.eur }</span>
            <span className={ classes.eur }></span>
          </div>
        </div>
      </div>
    );
  }
}

const globalState = (state) => ({
  currencies: state.currencies
});
export default connect(globalState)(CurrencyFeed);
