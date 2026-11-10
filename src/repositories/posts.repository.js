const prisma = require("../prisma");

async function create({
  title,
  content,
  category,
  authorId,
  image,
  description,
  tags = [],
}) {
  return await prisma.post.create({
    data: {
      title,
      content,
      category,
      authorId,
      image,
      description,
      tags: {
        create: tags.map((name) => ({
          tag: {
            connectOrCreate: {
              where: { name },
              create: { name },
            },
          },
        })),
      },
    },
  });
}

async function findAll() {
  return await prisma.post.findMany({
    include: {
      tags: { include: { tag: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

async function find(id) {
  return await prisma.post.findUnique({
    where: { id },
    include: {
      tags: { include: { tag: true } },
    },
  });
}

async function update(id, data) {
  return await prisma.post.update({ where: { id }, data });
}

async function remove(id) {
  return await prisma.post.delete({ where: { id } });
}
module.exports = { create, findAll, find, remove, update };
