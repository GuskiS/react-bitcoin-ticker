import HitbtcResponse         from './responses/hitbtc.response';
import PoloniexResponse       from './responses/poloniex.response';
import BlockchainResponse     from './responses/blockchain.response';
import BitcoinaverageResponse from './responses/bitcoinaverage.response';

export default class ResponseWrapper {
  constructor(type, response) {
    this.type = type;
    this.response = this.object(response);
  }

  object(response) {
    const object = {
      hitbtc: HitbtcResponse,
      poloniex: PoloniexResponse,
      blockchain: BlockchainResponse,
      bitcoinaverage: BitcoinaverageResponse,
    }[this.type];

    return new object(response);
  }

  data() {
    const { buy, sell } = this.response.params();
    return { buy: buy.toFixed(2), sell: sell.toFixed(2) };
  }
}
