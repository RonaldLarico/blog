import { Request, Response, NextFunction } from "express";

type error = {
  status: number,
  message: string,
  errorContent: string
}
export const handlerError = (
  errors: error,
  req: Request,
  res: Response,
  next: NextFunction,
) =>{
  res.status(errors.status).json(
    {
    message: errors.message,
    errorContent: errors.errorContent
    }
  );
}