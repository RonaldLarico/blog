import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import categoryService from "../services/category.services";

export const showAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await categoryService.getAll()
    res.status(200).json(result);
  } catch (error: Prisma.PrismaClientKnownRequestError | any) {
    res.status(400).json(error);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { body } = req
    const result = await categoryService.create(body)
    res.status(200).json(result);
  } catch (error: Prisma.PrismaClientKnownRequestError | any) {
    console.log(error);
    next({
      status: 400,
      message: 'Error: Name type string',
      errorContent: error.clientVersion
    })
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const convertId = parseInt(id)
    const data = req.body
    if (typeof convertId === 'number' && convertId >= 0) {
      const result = await categoryService.update(convertId, data)
      res.status(200).json(result);
    } else {
      next({
        status: 400,
        message: 'Error: Invalid Id',
      })
    }
  } catch (error: any) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code == 'P2025') {
        next({
          status: 400,
          message: 'Error: Id not exist',
          errorContent: error.meta?.cause
        })
      } else if (error.code == 'P2009') {
        next({
          status: 400,
          message: 'Error: Id inexistent',
          errorContent: error.meta?.query_validation_error
        })
      } else {
        res.status(400).json(error)
      }
    } else {
      next({
        status: 400,
        message: 'Error: Incorrect Id',
        errorContent: error.clientVersion
      })
    }
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const convertId = parseInt(id)
    if (typeof convertId === 'number' && convertId >= 0) {
      const result = await categoryService.delete(convertId)
      res.status(200).json(result);
    } else {
      next({
        status: 400,
        message: 'Error: Invalid Id',
      })
    }
  } catch (error: any) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code == 'P2025') {
        next({
          status: 400,
          message: 'Error: Id not exist',
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
        message: 'Error: Incorrect Id',
        errorContent: error.clientVersion
      })
    }
  }
};