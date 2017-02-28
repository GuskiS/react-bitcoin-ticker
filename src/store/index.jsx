import { createStore, compose } from 'redux';
import reducers                 from './reducers';

export default function configureStore() {
  return createStore(reducers, {}, compose());
}
