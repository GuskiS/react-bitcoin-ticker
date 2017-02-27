export class BitcoinaverageResponse {
  constructor(response) {
    this.response = response;
  }

  get data() {
    const { bid, ask } = this.response;
    return { buy: parseFloat(bid), sell: parseFloat(ask) };
  }
}
