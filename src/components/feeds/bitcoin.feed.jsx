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

  render() {
    const { url, type } = this.props;
    const { classes, data } = this.state;

    return (
      <div className='col-xs-12 col-sm-2 feed-component'>
        <div ref='content'>
          <a href={ url }>{ type }</a>

          <div>
            Buy:
            <span className='glyphicon glyphicon-usd'>{ data.buy }</span>
            <span className={ classes.buy }></span>
          </div>

          <div>
            Sell:
            <span className='glyphicon glyphicon-usd'>{ data.sell }</span>
            <span className={ classes.sell }></span>
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
