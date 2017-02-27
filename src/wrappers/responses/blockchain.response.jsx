export class BlockchainResponse {
  constructor(response) {
    this.response = response;
  }

  params() {
    const { buy, sell } = this.response.USD;
    return { buy, sell };
  }
}
