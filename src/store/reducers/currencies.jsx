import { SET_CURRENCIES } from './../constants';

const init = {
  usd: '1.0',
  eur: '0.0',
  gbp: '0.0'
};

export default function reducer(state = init, action = {}) {
  switch(action.type) {
    case SET_CURRENCIES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
