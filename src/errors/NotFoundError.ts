export default class NotFoundError extends Error {
  readonly statusCode: number = 400;
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}