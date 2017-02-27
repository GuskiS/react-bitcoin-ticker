import React from 'react';
import { BaseFeed } from './base.feed';

export class CurrencyFeed extends BaseFeed {
  constructor(props) {
    super(props);
  }

  response(res) {
    const data = super.response(res);
    const classes = {
      gbp: this.valueClassName('gbp', data),
      eur: this.valueClassName('eur', data),
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
            <span className='glyphicon glyphicon-gbp'>{ data.gbp }</span>
            <span className={ classes.gbp }></span>
          </div>

          <div>
            <span className='glyphicon glyphicon-eur'>{ data.eur }</span>
            <span className={ classes.eur }></span>
          </div>
        </div>
      </div>
    );
  }
}
