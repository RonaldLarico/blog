import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import profileService from "../services/profile.services";
import { pagination } from "../utils/format.server";

export const showAllProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { limit, offset } = res.locals as pagination
    const result = await profileService.getAll(limit, offset)
    res.status(200).json(result);
  } catch (error: Prisma.PrismaClientKnownRequestError | any) {
    res.status(400).json(error);
  }
};

export const showProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const convertId = parseInt(id)
    if (typeof convertId === "number" && convertId >= 0) {
      const result = await profileService.get(convertId)
      if (result == false) {
        next({
          status: 400,
          message: 'Error: Id not exist',
        })
      } else {
        res.status(200).json(result);
      }
    } else {
      next({
        status: 400,
        message: 'Error: Id invalid',
      })
    }
  } catch (error: Prisma.PrismaClientKnownRequestError | any) {
    console.log(error);
    next({
      status: 400,
      message: 'Error: Id incorrect',
      errorContent: error.clientVersion
    })
  }
}
export const searchProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let { search } = req.query
    if (typeof search === "string") {
      const result = await profileService.search(search)
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: search })
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const convertId = parseInt(id)
    const data = req.body
    if (typeof convertId === 'number' && convertId >= 0) {
      const result = await profileService.update(convertId, data)
      res.status(200).json(result);
    } else {
      next({
        status: 400,
        message: 'Error: invalid Id'
      })
    }
  } catch (error: any) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code == 'P2025') {
        next({
          status: 400,
          message: 'Error: insert valid Id',
          errorContent: error.meta?.cause
        })
      } else if (error.code == 'P2009') {
        next({
          status: 400,
          message: 'Error: Id inexistent',
          errorContent: error.meta?.query_validation_error
        })
      } else {
        res.status(400).json(error);
      }
    } else {
      next({
        status: 400,
        message: 'Error: Id not exist',
        errorContent: error.clientVersion
      })
    }
  }
};