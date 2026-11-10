const userRepo = require("../repositories/auth.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser({ name, email, password }) {
  try {
    const passHash = await bcrypt.hash(password, 10);
    return await userRepo.register({ name, email, passHash });
  } catch (e) {
    if (e.code === "P2002") {
      const err = new Error("Email déjà utilisé");
      err.status = 409;
      throw err;
    }
    throw e;
  }
}

async function loginUser({ email, password }) {
  const user = await userRepo.login(email);
  const okay = user && (await bcrypt.compare(password, user.passHash));

  if (!okay) {
    const err = new Error("email ou mdp incorrect");
    err.status = 401;
    throw err;
  }
  const token = jwt.sign({ id: user.id,role:user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token };
}

async function getMe(id) {
  const user = await userRepo.findById(id);
  if(!user)
  {
    const err = new Error("user introuvable");
    err.status=404;
    throw err;
  }
  return user;
}

module.exports = { loginUser, registerUser ,getMe};
