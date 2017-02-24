import React from 'react';
import './rxjs-extensions';
import BitcoinFeedComponent from './components/bitcoin_feed.component';

const bitcoinFeeds = [
  { type: 'blockchain', url: 'https://blockchain.info/ticker?&cors=true' }
];

export default class App extends React.Component {
  render() {
    return (
      <div>
        { bitcoinFeeds.map((item, index) =>
          <BitcoinFeedComponent key={ index } { ...item } />
        )}
      </div>
    )
  }
}
