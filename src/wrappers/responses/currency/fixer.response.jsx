export class FixerResponse {
  constructor(response) {
    this.response = response;
  }

  get data() {
    const { EUR, GBP } = this.response.rates;
    return { eur: EUR, gbp: GBP };
  }
}
