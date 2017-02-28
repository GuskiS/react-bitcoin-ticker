import React from 'react';
import BitcoinFeed from './feeds/bitcoin.feed';
import CurrencyFeed from './feeds/currency.feed';

const feeds = {
  bitcoin: [
    { type: 'hitbtc', url: 'https://api.hitbtc.com//api/1/public/BTCUSD/ticker' },
    { type: 'poloniex', url: 'https://poloniex.com/public?command=returnTicker' },
    { type: 'blockchain', url: 'https://blockchain.info/ticker?&cors=true' },
    // { type: 'bitcoinaverage', url: 'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD' },
  ],
  currency: [
    { type: 'fixer', url: 'http://api.fixer.io/latest?base=USD&symbols=EUR,GBP', refetch: 60 }
  ]
}

export class BitcoinComponent extends React.Component {
  render() {
    return (
      <div className='row bitcoin-component'>
        { feeds.bitcoin.map((item, index) =>
          <BitcoinFeed key={ index } name='bitcoin' { ...item } />
        )}

        { feeds.currency.map((item, index) =>
          <CurrencyFeed key={ index } name='currency' { ...item } />
        )}
      </div>
    )
  }
}
