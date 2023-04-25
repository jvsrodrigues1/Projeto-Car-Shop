export default class InvalidIdError extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = 'InvalidIdError';
    this.stack = '422';
  }
}