import React from 'react';
import FeedComponent from './feed.component';

const feeds = [
  { type: 'hitbtc', url: 'https://api.hitbtc.com//api/1/public/BTCUSD/ticker' },
  { type: 'poloniex', url: 'https://poloniex.com/public?command=returnTicker' },
  { type: 'blockchain', url: 'https://blockchain.info/ticker?&cors=true' },
  { type: 'bitcoinaverage', url: 'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD' },
];

export default class BitcoinComponent extends React.Component {
  render() {
    return (
      <div className='row bitcoin-component'>
        { feeds.map((item, index) =>
          <FeedComponent key={ index } { ...item } />
        )}
      </div>
    )
  }
}
