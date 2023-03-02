import { userPick } from "../utils/format.server";
import { prisma } from "../utils/prisma.server";

const userValues: userPick[] = [
  {
    email: "user@gmail.com",
    password: "123456",
    role: "SUPER_ADMIN",
  },
  {
    email: "ron@gmail.com",
    password: "123456",
    role: "ADMIN",
  },
  {
    email: "emma@gmail.com",
    password: "123456",
    role: "USER",
  },
  {
    email: "javi@gmail.com",
    password: "123456",
    role: "USER",
  },
];

const profileValues = [
  {
    firstName: "User",
    lastName: "John",
    age: 16,
    address: "Av. Lima",
    authorId: 4
  },
  {
    firstName: "Ron",
    lastName: "Juarez",
    age: 20,
    address: "Av. Lima",
    authorId: 3
  },
  {
    firstName: "Emma",
    lastName: "Perez",
    age: 25,
    address: "Av. Lima",
    authorId: 2
  },
  {
    firstName: "Javi",
    lastName: "John",
    age: 30,
    address: "Av. Lima",
    authorId: 1
  },
];

const postValues = [
  {
    description: "No me gusta la publicacion",
    authorId: 4,
  },
  {
    description: "No me gusta la publicacion",
    authorId: 3,
  },
  {
    description: "No me gusta la publicacion",
    authorId: 2,
  },
  {
    description: "No me gusta la publicacion",
    authorId: 1,
  }
];

const commentValues = [
  {
    description: "Me gusta la publicacion",
    authorId: 3,
    postId: 1,
  },
  {
    description: "Me gusta la publicacion",
    authorId: 2,
    postId: 3,
  },
  {
    description: "Me gusta la publicacion",
    authorId: 1,
    postId: 4,
  },
  {
    description: "Me gusta la publicacion",
    authorId: 4,
    postId: 2,
  },
];

const categoryValues = [
  {
    name: "Cocina",
  },
  {
    name: "Deporte",
  },
  {
    name: "Entreteniemto",
  },
  {
    name: "Noticias",
  }
]

const seed = async () => {
  await prisma.user.createMany({
    data: userValues,
  });
  await prisma.profile.createMany({
    data: profileValues,
  });
  await prisma.post.createMany({
    data: postValues,
  });
  await prisma.comment.createMany({
    data: commentValues,
  });
  await prisma.category.createMany({
    data: categoryValues,
  });
};

seed()