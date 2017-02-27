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

  componentWillUpdate(props, state) {
    if(state.fetched) {
      this.refs.content.classList.add('blink');
    }
  }

  componentDidUpdate() {
    setTimeout(() => this.refs.content.classList.remove('blink'), 500);
  }

  componentWillUnmount() {
    this.state.subscription.unsubscribe();
  }

  valueClassName(key, data) {
    switch(true) {
      case !this.state.data[key] || data[key] == this.state.data[key]:
        return 'glyphicon glyphicon-minus';
      case data[key] > this.state.data[key]:
        return 'glyphicon glyphicon-arrow-up';
      default:
        return 'glyphicon glyphicon-arrow-down';
    }
  }

  response(res) {
    const wrapper = new ResponseWrapper(this.props.name, this.props.type, res.response);
    return wrapper.data;
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
