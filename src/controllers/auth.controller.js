const authService = require("../services/auth.service");
const {
  validateLogin,
  validateRegister,
} = require("../validators/auth.validator");

async function registerController(req, res, next) {
  try {
    const { name, email, password } = req.body || {};
    const error = validateRegister({ name, email, password });
    if (error) return res.status(400).json({ error });
    const user = await authService.registerUser({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

async function loginController(req, res, next) {
  try {
    const { email, password } = req.body || {};

    const error = validateLogin({ email, password });
    if (error) return res.status(400).json({ error });
    res.status(200).json(await authService.loginUser({ email, password }));
  } catch (error) {
    next(error);
  }
}

async function meController(req, res, next) {
  try {
    const user = await authService.getMe(req.user.id);
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
}

module.exports = { registerController, loginController,meController };
