import React from 'react';
import { Observable } from 'rxjs/Observable';
import { DOM } from 'rx-dom';
import ResponseWrapper from './../wrappers/response.wrapper';

const REFETCH_AFTER = 5;

export default class BitcoinFeedComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { observable: this.observable(), data: {} };
  }

  observable() {
    const settings = { url: this.props.url, responseType: 'json' };
    return DOM.ajax(settings).repeatWhen((notifications) => notifications.delay(REFETCH_AFTER * 1000));
  }

  componentDidMount() {
    const subscription = this.state.observable.subscribe((res) => {
      const wrapper = new ResponseWrapper(this.props.type, res.response);
      this.setState({ data: wrapper.data() });
    });

    this.setState({ subscription });
  }

  componentWillUnmount() {
    this.state.subscription.unsubscribe();
  }

  render() {
    const { buy, sell } = this.state.data;
    console.error(buy, sell);

    return (
      <div>
        <div>{ buy }</div>
        <div>{ sell }</div>
      </div>
    )
  }
}
