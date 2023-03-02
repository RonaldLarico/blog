import { Category, prisma } from "../utils/prisma.server";

export class categoryService {
  static async getAll() {
    try {
      const result = await prisma.category.findMany({
        select: {
          id: true,
          name: true,
        }
      })
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async create(data: Category) {
    try {
      const {
        name
      } = data;
      const result = await prisma.category.create({
        data: {
          name
        }
      })
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async update(id: Category["id"], data: Category) {
    try {
      const {
        name
      } = data;
      const result = await prisma.category.update({
        where: { id },
        data: { name },
      })
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id: Category["id"]) {
    try {
      const result = await prisma.category.delete({
        where: { id },
      })
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default categoryService;