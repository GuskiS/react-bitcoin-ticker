import { BaseResponse } from './base.response';
import { HitbtcResponse, PoloniexResponse, BlockchainResponse, BitcoinaverageResponse } from './bitcoin';

export class BitcoinResponse extends BaseResponse {
  constructor(type, response) {
    super(type, response);
  }

  get data() {
    const object = this.validator({
      hitbtc: HitbtcResponse,
      poloniex: PoloniexResponse,
      blockchain: BlockchainResponse,
      bitcoinaverage: BitcoinaverageResponse,
      fixer: BitcoinaverageResponse,
    });

    const { buy, sell } = object.data;
    return { buy: buy.toFixed(2), sell: sell.toFixed(2) };
  }
}
