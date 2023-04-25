export default class NotFound extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = 'NotFoundError';
    this.stack = '404';
  }
}