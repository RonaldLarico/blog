import { Role } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, role, firstName, lastName, age, address } = req.body

  if (typeof email !== 'string' || email.length <= 0) {
    res.status(400).json({ error: `Value '${email}' is not set in email` })
  }
  else if (typeof role !== 'string' || role.length <= 0) {
    res.status(400).json({ error: `Value '${role}' is not set in role` })
  }
  else if (typeof firstName !== 'string' || firstName.length <= 0) {
    res.status(400).json({ error: `Value '${firstName}' is not set in firstName` })
  }
  else if (typeof lastName !== 'string' || lastName.length <= 0) {
    res.status(400).json({ error: `Value '${lastName}' is not set in lastName` })
  }
  else if (typeof age !== 'number') {
    res.status(400).json({ error: `Value '${age}' is not set age in age` })
  }
  else if (typeof address !== 'string' || address.length <= 0) {
    res.status(400).json({ error: `Value '${address}' is not set in address` })
  } else {
    next()
  }
}