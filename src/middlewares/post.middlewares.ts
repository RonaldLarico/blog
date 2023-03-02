import { Request, Response, NextFunction } from "express"
import { createCategoryPick } from "../utils/format.server";

export const verifyPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { description } = req.body

  if (typeof description !== 'string' || description.length <= 0) {
      res.status(400).json({ error: `Value '${description}' is not set in description` })
  } else {
    next()
  }
}
