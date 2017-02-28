export class ErrorWrapper {
  constructor(error) {
    this.error = error;
  }

  get data() {
    if(this.error.xhr) {
      return this.error.xhr.statusText;
    }
    else {
      return this.error.message ? this.error.message : this.error.toString();
    }
  }
}
