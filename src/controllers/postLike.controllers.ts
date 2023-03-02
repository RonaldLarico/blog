/* import { NextFunction, Request, Response } from "express";
import postLikeService from "../services/postLikes.services";

export const createLike = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { body } = req
    console.log(body);
    const result = await postLikeService.create(body)
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error)
  }
};

export const deleteLike = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const convertId = parseInt(id, 10);
    if (typeof convertId === "number" && convertId >= 0) {
      const result = await postLikeService.delete(convertId);
      res.status(200).json(result);
    } else {
      res.status(400).json
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}; */