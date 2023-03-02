import { createPostPick, updatePostPick } from "../utils/format.server";
import { prisma, Post, Comment, User, Category, PostToCategory } from "../utils/prisma.server";

export class postService {
  static async getAll(take: number, skip: number, authorId: User["id"]) {
    try {
      const result = await prisma.post.findMany({
        where: { authorId },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          _count: { select: { likes: true, dislikes: true } },
          id: true,
          description: true,
          createdAt: true,
          author: {
            select: {
              profile: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  image: true,
                }
              }
            }
          },
          comments: {
            select: {
              id: true,
              description: true,
              createdAt: true,
              author: {
                select: {
                  profile: {
                    select: {
                      id: true,
                      firstName: true,
                      lastName: true,
                      image: true,
                    }
                  }
                }
              }
            }
          },
          categories: {
            select: {
              category: {
                select: {
                  id: true,
                  name: true,
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

  static async get(id: Post["id"]) {
    try {
      const result = await prisma.post.findMany({
        where: { id },
        select: {
          _count: { select: { likes: true, dislikes: true } },
          id: true,
          description: true,
          createdAt: true,
          author: {
            select: {
              profile: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  image: true,
                }
              }
            }
          },
          comments: {
            select: {
              id: true,
              description: true,
              createdAt: true,
              author: {
                select: {
                  profile: {
                    select: {
                      id: true,
                      firstName: true,
                      lastName: true,
                      image: true,
                    }
                  }
                }
              }
            }
          },
          categories: {
            select: {
              category: {
                select: {
                  id: true,
                  name: true,
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
        }
      })
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async create({ description, authorId, categories }: createPostPick) {
    try {
      const create = categories.map((category) => ({ categoryId: category.id }));
      const result = await prisma.post.create({
        data: {
          description,
          author: { connect: { id: authorId } },
          categories: {
            create
          }
        },
        select: {
          id: true,
          description: true,
          authorId: true,
          categories: {
            select: {
              category: {
                select: {
                  id: true,
                  name: true,
                }
              }
            }
          }
        }
      })
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async update(id: Post["id"],
    { description }: updatePostPick
  ) {
    try {
      const result = await prisma.post.update({
        where: { id },
        data: {
          description,
        },
        select: {
          id: true,
          description: true,
          authorId: true,
          categories: {
            select: {
              category: {
                select: {
                  id: true,
                  name: true,
                }
              }
            }
          }
        }
      })
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id: Post["id"]) {
    try {
      const result = await prisma.post.delete({
        where: { id }
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default postService;