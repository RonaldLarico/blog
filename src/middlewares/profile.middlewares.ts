import { Request, Response, NextFunction } from "express";

export const updateVerifyProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, age, address, authorId} = req.body;

  if (typeof firstName !== "string" || firstName.length <= 0) {
    res.status(400).json({ error: `Value '${firstName}' is not set in firstName`})
  }
  else if (typeof lastName !== "string" || lastName.length <= 0) {
    res.status(400).json({ error: `Value '${lastName}' is not set in lastName`})
  }
  else if (typeof age !== "number") {
    res.status(400).json({ error: `Value '${age}' is not set in age`})
  }
  else if (typeof address !== "string" || address.length <= 0) {
    res.status(400).json({ error: `Value '${address}' is not set in address`})
  } else {
    next()
  }
}