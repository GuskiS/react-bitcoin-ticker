import React from 'react';

import '../styles/index.scss';
import './rxjs-extensions';

import BitcoinComponent from './components/bitcoin.component';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <BitcoinComponent />
      </div>
    )
  }
}
