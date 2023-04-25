export default class InvalidId extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = 'InvalidIdError';
    this.stack = '422';
  }
}