import { Constants } from './../constants';

const init = {
  eur: null,
  gbp: null
};

export default function reducer(state = init, action = {}) {
  switch(action.type) {
    case Constants.SET_CURRENCIES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
