import React from 'react';
import '../styles/index.scss';
import './rxjs-extensions';
import { BitcoinComponent } from './components/bitcoin.component';
import { CustomComponent } from './components/custom.component';

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
};

export class App extends React.Component {
  render() {
    return (
      <div>
        <BitcoinComponent feeds={ feeds } />
        <CustomComponent feeds={ feeds } />
      </div>
    )
  }
}
