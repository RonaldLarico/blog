import { updateCommentPick } from "../utils/format.server";
import { prisma, Comment, User, Post } from "../utils/prisma.server";

export class commentService {
  static async getAll(take: number, skip: number, postId: Post["id"]) {
    try {
      const result = await prisma.comment.findMany({
        where: { postId },
        select: {
          _count: { select: { likes: true, dislikes: true } },
          id: true,
          description: true,
          author: {
            select: {
              profile: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                }
              }
            }
          },
          likes: {
            select: {
              author: {
                select: {
                  profile: {
                    select: {
                      firstName: true,
                      lastName: true
                    }
                  }
                }
              }
            }
          },
          dislikes: {
            select: {
              author: {
                select: {
                  profile: {
                    select: {
                      firstName: true,
                      lastName: true
                    }
                  }
                }
              }
            }
          },
        },
        take,
        skip,
      })
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async get(id: Comment["id"]) {
    try {
      const result = await prisma.comment.findUnique({
        where: { id },
        select: {
          _count: { select: { likes: true, dislikes: true } },
          id: true,
          description: true,
          author: {
            select: {
              profile: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                }
              },
            }
          },
          likes: {
            select: {
              author: {
                select: {
                  profile: {
                    select: {
                      firstName: true,
                      lastName: true
                    }
                  }
                }
              }
            }
          },
          dislikes: {
            select: {
              author: {
                select: {
                  profile: {
                    select: {
                      firstName: true,
                      lastName: true
                    }
                  }
                }
              }
            }
          },
        }
      })
      if (!result) return false;
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async create(data: Comment & { authorId: User["id"]}) {
    try {
      const {
        description,
        authorId,
      } = data;
      const result = await prisma.comment.create({
        data: {
          description,
          author: { connect: { id:authorId } }
        },
        select: {
          id: true,
          description: true,
          author: {
            select: {
              profile: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                }
              }
            }
          },
        }
      })
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async update({ description }: updateCommentPick, id: Comment["id"]) {
    try {
      const result = await prisma.comment.update({
      where: { id },
      data: { description },
      select: {
        id: true,
        description: true,
        author: {
          select: {
            profile: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              }
            }
          }
        },
      }
      })
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id: Comment["id"]) {
    try {
      const result = await prisma.comment.delete({
        where: { id },
      })
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default commentService;