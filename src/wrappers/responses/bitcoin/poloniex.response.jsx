export class PoloniexResponse {
  constructor(response) {
    this.response = response;
  }

  get data() {
    const { highestBid, lowestAsk } = this.response.USDT_BTC;
    return { buy: parseFloat(highestBid), sell: parseFloat(lowestAsk) };
  }
}
