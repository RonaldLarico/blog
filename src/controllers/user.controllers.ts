import { NextFunction, Request, Response } from "express";
import userService from "../services/user.services";
import { pagination } from "../utils/format.server";
import { Prisma } from "@prisma/client";

export const showAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { limit, offset } = res.locals as pagination
    const result = await userService.getAll(limit, offset)
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const showUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const newId = parseInt(id)
    if (typeof newId === 'number' && newId >= 0) {
      const result = await userService.get(newId)
      if (result == null) {
        next({
          status: 400,
          message: 'Error: Id not existent'
        })
      } else {
        res.status(200).json(result);
      }
    } else {
      next({
        status: 400,
        message: 'Error: invalid Id'
      })
    }
  } catch (error: any) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code == 'P2009') {
        next({
          status: 400,
          message: 'Error: Insert valid Id',
          errorContent: error.meta?.query_validation_error
        })
      } else {
        res.status(400).json(error);
      }
    } else {
      res.status(400).json(error);
    }
  }
};

export const searchUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let { search } = req.query
    if (typeof search === 'string') {
      const result = await userService.search(search)
      res.status(200).json(result);
    } else {
      res.status(400).json({ error: search });
    }
  } catch (error: Prisma.PrismaClientKnownRequestError | any) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req
    const result = await userService.create(body)
    res.status(201).json(result);
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error);
      if (error.code == 'P2002') {
        next({
          status: 400,
          message: 'Error: Email duplicate',
          errorContent: error.meta?.target
        })
      } else {
        res.status(400).json(error);
      }
    } else {
      res.status(400).json(error);
    }
  }
}

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const convertId = parseInt(id)
    if (typeof convertId === 'number' && convertId >= 0) {
      const result = await userService.delete(convertId)
      res.status(200).json({ id: result.id })
    } else {
      next({
        status: 400,
        message: 'Error: Id invalid',
      })
    }
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error);
      if (error.code == 'P2025') {
        next({
          status: 400,
          message: 'Error: Id not exist',
          errorContent: error.meta?.cause
        })
      } else {
        res.status(400).json(error);
      }
    } else {
      next({
        status: 400,
        message: 'Error: Id inexistent',
        errorContent: error.clientVersion
      })
    }
  }
};

