import React from 'react';
import { connect } from 'react-redux';
import { BaseFeed } from './base.feed';

class BitcoinFeed extends BaseFeed {
  constructor(props) {
    super(props);
    this.state.name = 'bitcoin';
  }

  classes(data) {
    return {
      sell: this.valueClassName('sell', data),
      buy: this.valueClassName('buy', data),
    };
  }

  converPrice(price, currency) {
    return ((price || 0.0) * parseFloat(this.props.currencies[currency])).toFixed(2);
  }

  renderContent() {
    const { classes, data, error } = this.state;

    if(error) {
      return (<div className='col-xs-12 text-error'>{ error }</div>)
    }
    else {
      return (
        <div>
          <div className='col-xs-6'>
            <div className={ classes.buy }>buy:</div>
            { this.renderCurrencies(parseFloat(data.buy)) }
          </div>

          <div className='col-xs-6'>
            <div className={ classes.sell }>sell:</div>
            { this.renderCurrencies(parseFloat(data.sell)) }
          </div>
        </div>
      )
    }
  }

  renderCurrencies(price) {
    const currencies = ['usd', 'eur', 'gbp'];

    return currencies.map((currency, index) =>
      <div className={ 'glyphicon glyphicon-' + currency } key={ index }>
        { this.converPrice(price, currency) }
      </div>
    );
  }

  render() {
    const { url, type } = this.props;

    return (
      <div className='col-xs-12 col-sm-3 feed-component'>
        <div className='row feed-container' ref='content'>
          <div className='col-xs-12'>
            <a href={ url }>{ type }</a>
            { this.renderRemove() }
          </div>

          { this.renderContent() }
        </div>
      </div>
    );
  }
}

const globalState = (state) => ({
  currencies: state.currencies
});

export default connect(globalState)(BitcoinFeed);
