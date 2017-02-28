export class BlockchainResponse {
  constructor(response) {
    this.response = response;
  }

  get data() {
    const { buy, sell } = this.response.USD;
    return { buy, sell };
  }
}
