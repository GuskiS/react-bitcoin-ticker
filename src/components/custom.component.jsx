import React from 'react';
import BitcoinFeed from './feeds/bitcoin.feed';

export class CustomComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { custom: [] };
  }

  add(e) {
    e.preventDefault();

    const feedId = parseInt(this.refs.feed.value);
    const refetch = parseInt(this.refs.refetch.value);
    const feed = this.props.feeds.bitcoin[feedId];
    const { custom } = this.state;

    this.setState({ custom: [...custom, { ...feed, refetch }] });
  }

  remove(id) {
    const custom = this.state.custom.filter((item, index) => id !== index)
    this.setState({ custom });
  }

  render() {
    const { custom } = this.state;
    const { bitcoin } = this.props.feeds;
    const refetch = [5, 10, 15, 20];

    return (
      <div className='row custom-component'>
        <form className='form-inline' onSubmit={ this.add.bind(this) }>
          <div className='form-group'>
            <select className='form-control' ref='feed'>
              { bitcoin.map((feed, index) =>
                <option key={ index } value={ index }>{ feed.type }</option>
              )}
            </select>
          </div>

          <div className='form-group'>
            <select className='form-control' ref='refetch'>
              { refetch.map((number, index) =>
                <option key={ index } value={ number }>{ number }</option>
              )}
            </select>
          </div>

          <div className='form-group'>
            <input className='btn btn-info' type='submit' value='Add' />
          </div>
        </form>

        { custom.map((item, index) =>
          <BitcoinFeed key={ index } remove={ this.remove.bind(this, index) } { ...item } />
        )}
      </div>
    )
  }
}
