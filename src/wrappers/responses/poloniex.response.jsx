export default class PoloniexResponse {
  constructor(response) {
    this.response = response;
  }

  params() {
    const { highestBid, lowestAsk } = this.response.USDT_BTC;
    return { buy: parseFloat(highestBid), sell: parseFloat(lowestAsk) };
  }
}
