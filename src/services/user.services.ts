import { User, Profile } from "@prisma/client";
import { prisma } from "../utils/prisma.server";
import bcrypt from "bcrypt"
import { ProfilePick } from "../utils/format.server";

export class userService {
  static async getAll(take: number, skip: number) {
    try {
      const result = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          password: true,
          role: true,
          profile: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              age: true,
              address: true,
              image: true,
            }
          }
        },
        take,
        skip,
      })
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async get(id: User["id"]) {
    try {
      const result = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          password: true,
          profile: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              age: true,
              address: true,
              image: true,
            }
          }
        }
      })
      if (!result) return null;
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async search(name: string) {
    try {
      const result = await prisma.user.findMany({
        where: {
          AND: [
            {
              OR: [
                {
                  email: { startsWith: name },
                },
              ],
            },
            {
              OR: [
                {
                  role: "SUPER_ADMIN",
                },
                {
                  role: "ADMIN",
                },
                {
                  role: "USER",
                },
              ],
            }
          ]
        },
        select: {
          id: true,
          email: true,
          profile: true,
        }
      })
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async create(data: User & ProfilePick) {
    try {
      const {
        email, password, role, firstName, lastName, age, address, image
      } = data;

      const passwordHash = await bcrypt.hash(password, 10);
      const result = await prisma.user.create({
        data: {
          email,
          password: passwordHash,
          role,
        },
      })
      const authorId = result.id
      await prisma.profile.create({
        data: {
          firstName,
          lastName,
          age,
          address,
          image,
          authorId,
        },
      })
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id: User["id"]) {
    try {
      const result = await prisma.user.delete({
        where: { id },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default userService;