import React from 'react';
import { connect } from 'react-redux';
import { BaseFeed } from './base.feed';

class BitcoinFeed extends BaseFeed {
  constructor(props) {
    super(props);
  }

  response(res) {
    const data = super.response(res);
    const classes = {
      sell: this.valueClassName('sell', data),
      buy: this.valueClassName('buy', data),
    };

    this.setState({ data, classes, fetched: true });
  }

  converPrice(price, currency) {
    return (price * parseFloat(this.props.currencies[currency])).toFixed(2);
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
    const { classes, data } = this.state;

    return (
      <div className='col-xs-12 col-sm-2 feed-component'>
        <div className='row' ref='content'>
          <div className='col-xs-12'>
            <a href={ url }>{ type }</a>
          </div>

          <div className='col-xs-6'>
            <span className={ classes.buy }>buy:</span>
            { this.renderCurrencies(parseFloat(data.buy)) }
          </div>

          <div className='col-xs-6'>
            <span className={ classes.sell }>sell:</span>
            { this.renderCurrencies(parseFloat(data.sell)) }
          </div>
        </div>
      </div>
    );
  }
}

const globalState = (state) => ({
  currencies: state.currencies
});

export default connect(globalState)(BitcoinFeed);
