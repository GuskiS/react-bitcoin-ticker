export class BaseResponse {
  constructor(type, response) {
    this.type = type;
    this.response = response;
  }

  validator(parser) {
    const object = parser[this.type];

    if(object) {
      return new object(this.response);
    }
    else {
      console.error(`Unrecognized response - ${this.type}`);
      return { data: {} };
    }
  }
}
