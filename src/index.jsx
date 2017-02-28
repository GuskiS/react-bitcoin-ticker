import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { App } from './app.jsx';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import { Provider } from 'react-redux';
import store from './store';

const components = <Provider store={ store() }>
  <AppContainer><App/></AppContainer>
</Provider>

render(components, document.querySelector("#app"));

if (module && module.hot) {
  module.hot.accept('./app.jsx', () => {
    const App = require('./app.jsx').default;
    render(components, document.querySelector("#app"));
  });
}
