export default class BitcoinaverageResponse {
  constructor(response) {
    this.response = response;
  }

  params() {
    const { bid, ask } = this.response;
    return { buy: parseFloat(bid), sell: parseFloat(ask) };
  }
}
