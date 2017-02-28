import { BaseResponse } from './base.response';
import { FixerResponse } from './currency';

export class CurrencyResponse extends BaseResponse {
  constructor(type, response) {
    super(type, response);
  }

  get data() {
    const object = this.validator({ fixer: FixerResponse });
    const { eur, gbp } = object.data;
    return { eur: eur.toFixed(2), gbp: gbp.toFixed(2) };
  }
}
