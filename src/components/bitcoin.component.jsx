import React from 'react';
import BitcoinFeed from './feeds/bitcoin.feed';
import CurrencyFeed from './feeds/currency.feed';

export class BitcoinComponent extends React.Component {
  render() {
    const { feeds } = this.props;

    return (
      <div className='row bitcoin-component'>
        { feeds.bitcoin.map((item, index) =>
          <BitcoinFeed key={ index } { ...item } />
        )}

        { feeds.currency.map((item, index) =>
          <CurrencyFeed key={ index } { ...item } />
        )}
      </div>
    )
  }
}
