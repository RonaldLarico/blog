import { Profile, User } from "@prisma/client";
import { updateProfilePick } from "../utils/format.server";
import { prisma } from "../utils/prisma.server";

export class profileService {
  static async getAll(take: number, skip: number) {
    try {
      const result = await prisma.profile.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          age: true,
          address: true,
          image: true,
          authorId: true,
        },
        take,
        skip,
      })
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async get(id: Profile["id"]) {
    try {
      const result = await prisma.profile.findUnique({
        where: { id },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          age: true,
          address: true,
          image: true,
          authorId: true,
        }
      })
      if (!result) return false
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async search(name: string) {
    try {
      const result = await prisma.profile.findMany({
        where: {
          OR: [
            { firstName: { startsWith: name } },
            { lastName: { startsWith: name } },
          ],
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          age: true,
          address: true,
          image: true,
        }
      })
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async update(
    id: Profile["id"],
    { firstName, lastName, age, address, image }: updateProfilePick
  ) {
    try {
      const result = await prisma.profile.update({
        where: { id },
        data: {
          firstName,
          lastName,
          age,
          address,
          image,
        }
      })
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default profileService;