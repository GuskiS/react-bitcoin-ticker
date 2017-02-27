import { BitcoinResponse } from './responses/bitcoin.response';
import { CurrencyResponse } from './responses/currency.response';

export class ResponseWrapper {
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
