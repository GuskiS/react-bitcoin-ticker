import BlockchainResponse from './responses/blockchain.response';

export default class ResponseWrapper {
  constructor(type, response) {
    this.type = type;
    this.response = this.object(response);
  }

  object(response) {
    const object = {
      blockchain: BlockchainResponse
    }[this.type];

    return new object(response);
  }

  data() {
    return this.response.params();
  }
}
