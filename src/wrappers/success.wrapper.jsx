import { BitcoinResponse } from './success/bitcoin.response';
import { CurrencyResponse } from './success/currency.response';

export class SuccessWrapper {
  constructor(name, type, response) {
    this.name = name;
    this.type = type;
    this.response = response;
  }

  get data() {
    const parser = {
      bitcoin: BitcoinResponse,
      currency: CurrencyResponse,
    }[this.name];
    const object = new parser(this.type, this.response);

    return object.data;
  }
}
