import { NextFunction, Request, Response } from 'express';

export default class ErrorHandler {
  public static handle(
    err: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (err instanceof Error && err.stack) {
      return res.status(parseInt(err.stack, 10)).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
    next();
  }
}
