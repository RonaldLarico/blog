import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import commentService from "../services/comment.services";
import { pagination } from "../utils/format.server";

export const showAllComments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { postId } = req.params
    const convertId = parseInt(postId)
    const { limit, offset } = res.locals as pagination
    if (typeof convertId === "number" && convertId >= 0) {
    const result = await commentService.getAll(limit, offset, convertId)
    res.status(200).json(result);
    } else {
      res.status(400).json('Error: Invalid Id')
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

export const showComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const convertId = parseInt(id)
    if(typeof convertId === 'number' && convertId >= 0) {
      const result = await commentService.get(convertId)
      if (result == false) {
        res.status(400).json('Error: Id not exist')
      } else {
        res.status(200).json(result);
      }
    } else {
      res.status(404).json('Error: Invalid Id')
    }
  } catch (error: Prisma.PrismaClientKnownRequestError | any) {
    console.log(error);
    res.status(400).json('Error: Id inexistent');
  }
};

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { body } = req
    const result = await commentService.create(body)
    res.status(200).json(result);
  } catch (error: Prisma.PrismaClientKnownRequestError | any) {
    console.log(error);
    if (error.code == 'P2025') {
      res.status(400).json('Error: AuthorId not exist');
    } else {
      res.status(400).json('Error: Description type string');
    }
  }
};

export const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const convertId = parseInt(id)
    const data = req.body
    if(typeof convertId === 'number' && convertId >= 0) {
      const result = await commentService.update(data, convertId)
      res.status(200).json(result);
    }
  } catch (error: Prisma.PrismaClientKnownRequestError | any) {
    console.log(error);
    res.status(400).json('Error: Description type string');
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const convertId = parseInt(id)
    if(typeof convertId === 'number' && convertId >= 0) {
      const result = await commentService.delete(convertId)
      res.status(200).json(result);
    } else {
      res.status(400).json('Error: Invalid Id')
    }
  } catch (error: Prisma.PrismaClientKnownRequestError | any) {
    console.log(error);
    if (error.code == 'P2025') {
      res.status(400).json('Error: Id not exist');
    }
    else if (error.code == 'P2009') {
      res.status(400).json('Error: Id inexistent')
    } else {
      res.status(400).json('Error: Insert valid Id');
    }
  }
};