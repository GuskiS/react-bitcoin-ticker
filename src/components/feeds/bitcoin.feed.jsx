import React from 'react';
import { BaseFeed } from './base.feed';

export class BitcoinFeed extends BaseFeed {
  constructor(props) {
    super(props);
  }

  response(res) {
    const data = super.response(res);
    const classes = {
      sell: this.valueClassName('sell', data),
      buy: this.valueClassName('buy', data),
    };

    this.setState({ data, classes });
  }

  componentWillUpdate(props, state) {
    if(state.data.sell) {
      this.refs.content.classList.add('blink');
    }
  }

  componentDidUpdate() {
    setTimeout(() => this.refs.content.classList.remove('blink'), 500);
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
