export default class NotFoundError extends Error {
  readonly statusCode: number = 404;
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}