const prisma = require("../prisma");

async function register(data) {
  return await prisma.user.create({
    data,
    select: { id: true, name: true, email: true,role: true },
  });
}

async function login(email) {
  return await prisma.user.findUnique({ where: { email } });
}

async function findById(id) {
  return await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true },
  });
}

module.exports = { register, login, findById };
