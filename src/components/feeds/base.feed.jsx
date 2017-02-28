import React from 'react';
import { Observable } from 'rxjs/Observable';
import { ErrorWrapper } from './../../wrappers/error.wrapper';
import { SuccessWrapper } from './../../wrappers/success.wrapper';

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
    const subscription = this.state.observable
      .subscribe(
        this.success.bind(this),
        this.error.bind(this)
      );

    this.setState({ subscription });
  }

  componentWillUpdate(props, state) {
    const change = this.state !== state;

    if(change && state.fetched) {
      this.refs.content.classList.add('blink');
    }

    return change;
  }

  componentDidUpdate() {
    setTimeout(() => this.refs.content && this.refs.content.classList.remove('blink'), 500);
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

  success(res) {
    const wrapper = new SuccessWrapper(this.state.name, this.props.type, res.response);
    const data = wrapper.data;
    const classes = this.classes(data);
    this.setState({ data, classes, fetched: true, error: null });
  }

  error(error) {
    const wrapper = new ErrorWrapper(error);
    this.setState({ error: wrapper.data });
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
      .catch((error) => Observable.throw(error))
      .repeat();
  }

  renderRemove() {
    if(!this.props.remove) return;
    return (<span className='glyphicon glyphicon-remove' onClick={ this.props.remove }></span>)
  }
}
