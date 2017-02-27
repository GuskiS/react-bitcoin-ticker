import React from 'react';
import { Observable } from 'rxjs/Observable';
import ResponseWrapper from './../wrappers/response.wrapper';

const REFETCH_AFTER = 5;

export default class BitcoinComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {}, classes: {},
      refetchAfter: REFETCH_AFTER,
      observable: this.observable(REFETCH_AFTER),
    };
  }

  valueClassName(key, data) {
    if(!this.state.data[key] || data[key] == this.state.data[key]) {
      return 'glyphicon glyphicon-minus';
    }
    else if(data[key] > this.state.data[key]) {
      return 'glyphicon glyphicon-arrow-up';
    }
    else {
      return 'glyphicon glyphicon-arrow-down';
    }
  }

  response(res) {
    const wrapper = new ResponseWrapper(this.props.type, res.response);
    const data = wrapper.data();
    const classes = {
      sell: this.valueClassName('sell', data),
      buy: this.valueClassName('buy', data),
    };

    this.setState({ data, classes });
  }

  observable(refetchAfter = this.state.refetchAfter) {
    const settings = {
      url: this.props.url,
      responseType: 'json',
      crossDomain: true,
    };

    return Observable
      .timer(0, refetchAfter * 1000)
      .concatMap(() => Observable.ajax(settings))
      .repeat();
  }

  componentWillUpdate(props, state) {
    if(state.data.sell) {
      this.refs.content.classList.add('blink');
    }
  }

  componentDidUpdate() {
    setTimeout(() => this.refs.content.classList.remove('blink'), 500);
  }

  componentDidMount() {
    const subscription = this.state.observable.subscribe(this.response.bind(this));
    this.setState({ subscription });
  }

  componentWillUnmount() {
    this.state.subscription.unsubscribe();
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
    )
  }
}
