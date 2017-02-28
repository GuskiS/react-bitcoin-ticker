import { SET_CURRENCIES } from './../constants';

const init = {
  usd: '1.0',
  eur: null,
  gbp: null
};

export default function reducer(state = init, action = {}) {
  switch(action.type) {
    case SET_CURRENCIES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
