import { Request, Response, NextFunction } from "express";

export const verifyCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name } = req.body;

  if (typeof name !== "string" || name.length <= 0) {
    res.status(400).json({ error: `Value '${name}' is not set in name`})
  } else {
    next()
  }
}