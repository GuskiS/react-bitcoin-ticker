import React from 'react';
import { Observable } from 'rxjs/Observable';
import { ResponseWrapper } from './../../wrappers/response.wrapper';

const REFETCH = 5;

export class BaseFeed extends React.Component {
  constructor(props) {
    super(props);
    const refetch = this.props.refetch || REFETCH;
    const observable = this.observable(refetch);

    this.state = {
      data: {}, classes: {},
      refetch, observable
    };
  }

  componentDidMount() {
    const subscription = this.state.observable.subscribe(this.response.bind(this));
    this.setState({ subscription });
  }

  componentWillUnmount() {
    this.state.subscription.unsubscribe();
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
    return wrapper.data();
  }

  observable(refetch = this.state.refetch) {
    const settings = {
      url: this.props.url,
      responseType: 'json',
      crossDomain: true,
    };

    return Observable
      .timer(0, refetch * 1000)
      .concatMap(() => Observable.ajax(settings))
      .repeat();
  }
}
