export default class IdInvalid extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = 'InvalidIdError';
    this.stack = '422';
  }
}