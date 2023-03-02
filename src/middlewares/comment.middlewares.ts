import { Request, Response, NextFunction } from "express";

export const verifyComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { description, authorId } = req.body;

  if (typeof description !== 'string' || description.length <= 0) {
    res.status(400).json({ error: `Value '${description}' is not set in description` })
  }
  else if (typeof authorId !== 'number') {
    res.status(400).json({ error: `Value '${authorId}' is not set in authorId` })
  } else {
    next()
  }
}