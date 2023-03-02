/* import { prisma, PostLike, User, Post } from "../utils/prisma.server";

export class postLikeService {
  static async create(data:PostLike ) {
    try {
      const {
        postId,
        authorId,
      } = data;
      const result = await prisma.postLike.create({
        data: {
          postId,
          authorId,
        }
      })
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async count(postId: Post["id"]) {
    try {
      const result = await prisma.postLike.count({
        where: {
          postId,
        }
      })
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id: PostLike["id"]) {
    try {
      const result = await prisma.postLike.delete({
        where: { id }
      })
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default postLikeService; */